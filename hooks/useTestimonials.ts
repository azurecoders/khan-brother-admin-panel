import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_TESTIMONIALS,
  CREATE_TESTIMONIAL,
  UPDATE_TESTIMONIAL,
  DELETE_TESTIMONIAL,
} from "@/graphql/testimonials";
import {
  Testimonial,
  TestimonialFormData,
  initialTestimonialFormData,
} from "@/types/testimonial";

export const useTestimonials = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [formData, setFormData] = useState<TestimonialFormData>(
    initialTestimonialFormData
  );

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_TESTIMONIALS);

  const [createTestimonial, { loading: creating }] = useMutation(
    CREATE_TESTIMONIAL,
    {
      onCompleted: () => {
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

    if (!searchTerm) return testimonials;

    return testimonials.filter(
      (testimonial) =>
        testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.designation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        testimonial.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      designation: testimonial.designation,
      message: testimonial.message,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteTestimonial({ variables: { id } });
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
    isModalOpen,
    editingTestimonial,
    formData,
    filteredTestimonials,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
