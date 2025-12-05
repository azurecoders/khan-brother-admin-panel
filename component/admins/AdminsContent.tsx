"use client";

import { useAdmins } from "@/hooks/useAdmins";
import AdminFilters from "./AdminFilters";
import AdminTable from "./AdminTable";
import AdminModal from "./AdminModal";

const AdminsContent = () => {
  const {
    searchTerm,
    isModalOpen,
    editingAdmin,
    formData,
    filteredAdmins,
    loading,
    error,
    mutationLoading,
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleToggleActive,
    handleSubmit,
  } = useAdmins();

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
            Administrators
          </h1>
          <p className="text-gray-600">
            Securely manage admin access and permissions
          </p>
        </div>

        {/* Filters */}
        <AdminFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={openAddModal}
        />

        {/* Table */}
        <AdminTable
          admins={filteredAdmins}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />

        {/* Modal */}
        <AdminModal
          isOpen={isModalOpen}
          editingAdmin={editingAdmin}
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

export default AdminsContent;
