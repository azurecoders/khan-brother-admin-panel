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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Services
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
            Services Management
          </h1>
          <p className="text-xl text-gray-600">
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
