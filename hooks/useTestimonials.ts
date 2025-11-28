import { useState, useMemo, useEffect, useCallback, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";

import {
  Testimonial,
  TestimonialFormData,
  TestimonialLocalData,
  initialTestimonialFormData,
} from "@/types/testimonial";
import {
  FETCH_ALL_TESTIMONIALS,
  CREATE_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
  DELETE_TESTIMONIAL,
} from "@/graphql/testimonials";

const LOCAL_DATA_KEY = "testimonial_local_data";

export const useTestimonials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [approvalFilter, setApprovalFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(
    initialTestimonialFormData
  );
  const [localData, setLocalData] = useState<TestimonialLocalData>({});

  // Load local data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_DATA_KEY);
    if (stored) {
      try {
        setLocalData(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing local data:", e);
      }
    }
  }, []);

  // Save local data to localStorage
  const saveLocalData = useCallback((newData: TestimonialLocalData) => {
    setLocalData(newData);
    localStorage.setItem(LOCAL_DATA_KEY, JSON.stringify(newData));
  }, []);

  // Get local data for a testimonial
  const getLocalData = useCallback(
    (id: string) => {
      return localData[id] || { rating: 5, approved: true };
    },
    [localData]
  );

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_TESTIMONIALS);

  const [createTestimonial, { loading: creating }] = useMutation(
    CREATE_TESTIMONIAL,
    {
      onCompleted: (data) => {
        // Save local data for the new testimonial
        const newId = data.createTestimonial.id;
        const newLocalData = {
          ...localData,
          [newId]: {
            rating: formData.rating,
            approved: formData.approved,
          },
        };
        saveLocalData(newLocalData);
        resetForm();
        refetch();
      },
      onError: (error) => {
        console.error("Error creating testimonial:", error);
        alert("Failed to create testimonial. Please try again.");
      },
    }
  );

  const [updateTestimonial, { loading: updating }] = useMutation(
    UPDATE_TESTIMONIAL,
    {
      onCompleted: () => {
        // Update local data
        if (editingTestimonial) {
          const newLocalData = {
            ...localData,
            [editingTestimonial.id]: {
              rating: formData.rating,
              approved: formData.approved,
            },
          };
          saveLocalData(newLocalData);
        }
        resetForm();
        refetch();
      },
      onError: (error) => {
        console.error("Error updating testimonial:", error);
        alert("Failed to update testimonial. Please try again.");
      },
    }
  );

  const [deleteTestimonial] = useMutation(DELETE_TESTIMONIAL, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial. Please try again.");
    },
  });

  // Filtered testimonials
  const filteredTestimonials = useMemo(() => {
    const testimonials: Testimonial[] = data?.fetchAllTestimonials || [];

    return testimonials.filter((testimonial) => {
      const matchesSearch =
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.designation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        testimonial.message.toLowerCase().includes(searchTerm.toLowerCase());

      const testimonialLocalData = getLocalData(testimonial.id);
      const isApproved = testimonialLocalData.approved;
      const matchesApproval =
        approvalFilter === "all" ||
        (approvalFilter === "approved" && isApproved) ||
        (approvalFilter === "pending" && !isApproved);

      return matchesSearch && matchesApproval;
    });
  }, [data, searchTerm, approvalFilter, getLocalData]);

  // Stats
  const stats = useMemo(() => {
    const testimonials: Testimonial[] = data?.fetchAllTestimonials || [];
    const approved = testimonials.filter(
      (t) => getLocalData(t.id).approved
    ).length;
    return {
      total: testimonials.length,
      approved,
      pending: testimonials.length - approved,
    };
  }, [data, getLocalData]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "rating") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    const testimonialLocalData = getLocalData(testimonial.id);
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation,
      message: testimonial.message,
      rating: testimonialLocalData.rating,
      approved: testimonialLocalData.approved,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial({ variables: { id } });

    // Remove from local data
    const newLocalData = { ...localData };
    delete newLocalData[id];
    saveLocalData(newLocalData);
  };

  const toggleApprovalStatus = (id: string) => {
    const current = getLocalData(id);
    const newLocalData = {
      ...localData,
      [id]: {
        ...current,
        approved: !current.approved,
      },
    };
    saveLocalData(newLocalData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingTestimonial) {
        await updateTestimonial({
          variables: {
            id: editingTestimonial.id,
            name: formData.name,
            designation: formData.designation,
            message: formData.message,
          },
        });
      } else {
        await createTestimonial({
          variables: {
            name: formData.name,
            designation: formData.designation,
            message: formData.message,
          },
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialTestimonialFormData);
    setEditingTestimonial(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return {
    // State
    searchTerm,
    approvalFilter,
    isModalOpen,
    editingTestimonial,
    formData,
    filteredTestimonials,
    loading,
    error,
    mutationLoading: creating || updating,
    stats,

    // Actions
    setSearchTerm,
    setApprovalFilter,
    openAddModal,
    resetForm,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleSubmit,
    toggleApprovalStatus,
    getLocalData,
  };
};
