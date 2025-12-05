"use client";

import { useProjects } from "@/hooks/useProjects";
import ProjectFilters from "./projects/ProjectFilters";
import ProjectTable from "./projects/ProjectTable";
import ProjectModal from "./projects/ProjectModal";

const Projects = () => {
  const {
    searchTerm,
    categoryFilter,
    isModalOpen,
    editingProject,
    formData,
    filteredProjects,
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
    handleImageUrlChange,
    handleImageInputTypeChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useProjects();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <strong className="font-bold">Error Loading Projects</strong>
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
            Projects Management
          </h1>
          <p className="text-gray-600 mt-1">
            Showcase your engineering excellence
          </p>
        </div>

        {/* Filters */}
        <ProjectFilters
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
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
          categories={categories}
          categoriesLoading={categoriesLoading}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onImageChange={handleImageChange}
          onImageUrlChange={handleImageUrlChange}
          onImageInputTypeChange={handleImageInputTypeChange}
        />
      </div>
    </div>
  );
};

export default Projects;
