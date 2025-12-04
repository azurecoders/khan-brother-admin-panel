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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Testimonials
            </strong>
            <p className="mt-2">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Client Testimonials
          </h1>
          <p className="text-xl text-gray-600">
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
          searchTerm={searchTerm}
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
