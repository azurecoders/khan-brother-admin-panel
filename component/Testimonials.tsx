"use client";

import { useTestimonials } from "@/hooks/useTestimonials";
import TestimonialFilters from "./testimonials/TestimonialFilters";
import TestimonialTable from "./testimonials/TestimonialTable";
import TestimonialModal from "./testimonials/TestimonialModel";

const Testimonials = () => {
  const {
    searchTerm,
    approvalFilter,
    isModalOpen,
    editingTestimonial,
    formData,
    filteredTestimonials,
    loading,
    error,
    mutationLoading,
    stats,
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
  } = useTestimonials();

  if (error) {
    return (
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">
            Error loading testimonials
          </h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Testimonials</h1>
        <p className="text-gray-600 text-lg">Manage client testimonials</p>
      </div>

      {/* Filters */}
      <TestimonialFilters
        searchTerm={searchTerm}
        approvalFilter={approvalFilter}
        onSearchChange={setSearchTerm}
        onApprovalFilterChange={setApprovalFilter}
        onAddClick={openAddModal}
      />

      {/* Table */}
      <TestimonialTable
        testimonials={filteredTestimonials}
        loading={loading}
        searchTerm={searchTerm}
        stats={stats}
        getLocalData={getLocalData}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleApproval={toggleApprovalStatus}
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
  );
};

export default Testimonials;
