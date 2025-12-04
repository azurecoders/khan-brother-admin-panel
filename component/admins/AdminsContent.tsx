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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Administrators
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
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Administrators
          </h1>
          <p className="text-xl text-gray-600">
            Securely manage admin access and permissions
          </p>
        </div>

        <AdminFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddClick={openAddModal}
        />

        <AdminTable
          admins={filteredAdmins}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleActive={handleToggleActive}
        />

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
