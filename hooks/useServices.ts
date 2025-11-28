import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_SERVICES,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "@/graphql/services";
import { Service, ServiceFormData, initialFormData } from "@/types/service";

export const useServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_SERVICES);

  const [createService, { loading: creating }] = useMutation(CREATE_SERVICE, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error creating service:", error);
      alert("Failed to create service. Please try again.");
    },
  });

  const [updateService, { loading: updating }] = useMutation(UPDATE_SERVICE, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error updating service:", error);
      alert("Failed to update service. Please try again.");
    },
  });

  const [deleteService] = useMutation(DELETE_SERVICE, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting service:", error);
      alert("Failed to delete service. Please try again.");
    },
  });

  // Filtered services
  const filteredServices = useMemo(() => {
    const services: Service[] = data?.fetchAllServices || [];
    if (!searchTerm) return services;

    return services.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        icon: file,
        iconPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleAddSubService = (value: string) => {
    if (value && !formData.subServices.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        subServices: [...prev.subServices, value],
      }));
    }
  };

  const handleRemoveSubService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index),
    }));
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      icon: null, // No file selected initially
      iconPreview: service.icon, // Show existing icon
      subServices: service.subServices.map((s) => s.name),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteService({ variables: { id } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // For create: icon is required
    // For update: icon is optional
    if (!formData.icon && !editingService) {
      alert("Please upload an icon");
      return;
    }

    try {
      if (editingService) {
        // Update: only include icon if a new one was selected
        const variables: Record<string, any> = {
          id: editingService.id,
          name: formData.name,
          description: formData.description,
          subServices: formData.subServices,
        };

        // Only include icon if user selected a new file
        if (formData.icon) {
          variables.icon = formData.icon;
        }

        await updateService({ variables });
      } else {
        // Create: icon is required
        await createService({
          variables: {
            name: formData.name,
            description: formData.description,
            icon: formData.icon,
            subServices: formData.subServices,
          },
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingService(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return {
    // State
    searchTerm,
    isModalOpen,
    editingService,
    formData,
    filteredServices,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleAddSubService,
    handleRemoveSubService,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
