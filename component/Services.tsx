"use client";

import { useServices } from "@/hooks/useServices";
import ServiceFilters from "./services/ServiceFilters";
import ServiceTable from "./services/ServiceTable";
import ServiceModal from "./services/ServiceModal";

const Services = () => {
  const {
    searchTerm,
    categoryFilter,
    isModalOpen,
    editingService,
    formData,
    filteredServices,
    categories,
    categoriesLoading,
    loading,
    error,
    mutationLoading,
    setSearchTerm,
    setCategoryFilter,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleIconUrlChange,
    handleIconInputTypeChange,
    handleAddSubService,
    handleRemoveSubService,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useServices();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <strong className="font-bold">Error Loading Services</strong>
            <p className="mt-1">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Services Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and showcase your professional services
          </p>
        </div>

        {/* Filters */}
        <ServiceFilters
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onAddClick={openAddModal}
        />

        {/* Table */}
        <ServiceTable
          services={filteredServices}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <ServiceModal
          isOpen={isModalOpen}
          editingService={editingService}
          formData={formData}
          loading={mutationLoading}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onIconUrlChange={handleIconUrlChange}
          onIconInputTypeChange={handleIconInputTypeChange}
          onAddSubService={handleAddSubService}
          onRemoveSubService={handleRemoveSubService}
        />
      </div>
    </div>
  );
};

export default Services;
