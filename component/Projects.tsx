"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectTable from "./projects/ProjectTable";
import ProjectModal from "./projects/ProjectModal";

const Projects = () => {
  const {
    searchTerm,
    isModalOpen,
    editingProject,
    formData,
    filteredProjects,
    loading,
    error,
    mutationLoading,
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useProjects();

  if (error) {
    return (
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">Error loading projects</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Projects</h1>
        <p className="text-gray-600 text-lg">Manage your project portfolio</p>
      </div>

      {/* Filters */}
      <ProjectFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddClick={openAddModal}
      />

      {/* Table */}
      <ProjectTable
        projects={filteredProjects}
        loading={loading}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        editingProject={editingProject}
        formData={formData}
        loading={mutationLoading}
        onClose={resetForm}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onImageChange={handleImageChange}
      />
    </div>
  );
};

export default Projects;
