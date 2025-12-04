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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Projects
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
            Projects Management
          </h1>
          <p className="text-xl text-gray-600">
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
