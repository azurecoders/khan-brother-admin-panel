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
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">Error loading admins</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Administrators</h1>
        <p className="text-gray-600 text-lg">Manage admin accounts</p>
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
        searchTerm={searchTerm}
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
  );
};

export default AdminsContent;
