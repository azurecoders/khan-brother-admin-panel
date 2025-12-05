"use client";

import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialFilters from "./testimonials/TestimonialFilters";
import TestimonialTable from "./testimonials/TestimonialTable";
import TestimonialModal from "./testimonials/TestimonialModel";

const Testimonials = () => {
  const {
    searchTerm,
    isModalOpen,
    editingTestimonial,
    formData,
    filteredTestimonials,
    loading,
    error,
    mutationLoading,
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useTestimonials();

  if (error) {
    return (
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Client Testimonials
          </h1>
          <p className="text-gray-600">
            Build trust with authentic client voices
          </p>
        </div>

        {/* Filters */}
        <TestimonialFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={openAddModal}
        />

        {/* Table */}
        <TestimonialTable
          testimonials={filteredTestimonials}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <TestimonialModal
          isOpen={isModalOpen}
          editingTestimonial={editingTestimonial}
          formData={formData}
          loading={mutationLoading}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Testimonials;
