// components/Services.tsx
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
    handleIconUrlChange,        // NEW
    handleIconInputTypeChange,  // NEW
    handleAddSubService,
    handleRemoveSubService,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useServices();

  if (error) {
    return (
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">Error loading services</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Services</h1>
        <p className="text-gray-600 text-lg">Manage your services</p>
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
        onIconUrlChange={handleIconUrlChange}           // NEW
        onIconInputTypeChange={handleIconInputTypeChange} // NEW
        onAddSubService={handleAddSubService}
        onRemoveSubService={handleRemoveSubService}
      />
    </div>
  );
};

export default Services;
