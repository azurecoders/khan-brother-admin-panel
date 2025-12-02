// hooks/useServices.ts
import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_SERVICES,
  CREATE_SERVICE,
  UPDATE_SERVICE,
  DELETE_SERVICE,
} from "@/graphql/services";
import { FETCH_ALL_CATEGORIES } from "@/graphql/category";
import { Service, ServiceFormData, initialFormData } from "@/types/service";

export const useServices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<ServiceFormData>(initialFormData);

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_SERVICES);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(FETCH_ALL_CATEGORIES);

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

  // Get categories from backend
  const categories = useMemo(() => {
    return categoriesData?.fetchAllCategories || [];
  }, [categoriesData]);

  // Get unique categories from services (fallback)
  const availableCategories = useMemo(() => {
    const services: Service[] = data?.fetchAllServices || [];
    const serviceCategories = new Set(
      services.map((s) => s.category).filter(Boolean)
    );
    return Array.from(serviceCategories).sort();
  }, [data]);

  // Filtered services
  const filteredServices = useMemo(() => {
    const services: Service[] = data?.fetchAllServices || [];

    return services.filter((service) => {
      // Search filter
      const matchesSearch =
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (service.category &&
          service.category.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || service.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, categoryFilter]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
      category: service.category || "",
      icon: null,
      iconPreview: service.icon,
      subServices: service.subServices.map((s) => s.name),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteService({ variables: { id } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.icon && !editingService) {
      alert("Please upload an icon");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    try {
      if (editingService) {
        const variables: Record<string, any> = {
          id: editingService.id,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          subServices: formData.subServices,
        };

        if (formData.icon) {
          variables.icon = formData.icon;
        }

        await updateService({ variables });
      } else {
        await createService({
          variables: {
            name: formData.name,
            description: formData.description,
            category: formData.category,
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
    // Clean up object URL if exists
    if (formData.iconPreview?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.iconPreview);
    }
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
    categoryFilter,
    isModalOpen,
    editingService,
    formData,
    filteredServices,
    availableCategories,
    categories,
    categoriesLoading,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    setCategoryFilter,
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
