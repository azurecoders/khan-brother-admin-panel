"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductTable from "./products/ProductTable";
import ProductModal from "./products/ProductModal";
import ProductFilters from "./products/ProductFilters";

const Products = () => {
  const {
    searchTerm,
    categoryFilter,
    isModalOpen,
    editingProduct,
    formData,
    filteredProducts,
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
    handleImagesChange,
    handleImageUrlAdd,
    handleImageInputTypeChange,
    handleRemoveImage,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useProducts();

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            <strong className="font-bold">Error Loading Products</strong>
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
            Products Management
          </h1>
          <p className="text-gray-600 mt-1">
            Curate and showcase your premium product catalog
          </p>
        </div>

        {/* Filters */}
        <ProductFilters
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onAddClick={openAddModal}
        />

        {/* Table */}
        <ProductTable
          products={filteredProducts}
          loading={loading}
          searchTerm={searchTerm}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Modal */}
        <ProductModal
          isOpen={isModalOpen}
          editingProduct={editingProduct}
          formData={formData}
          loading={mutationLoading}
          categories={categories}
          categoriesLoading={categoriesLoading}
          onClose={resetForm}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onImagesChange={handleImagesChange}
          onImageUrlAdd={handleImageUrlAdd}
          onImageInputTypeChange={handleImageInputTypeChange}
          onRemoveImage={handleRemoveImage}
        />
      </div>
    </div>
  );
};

export default Products;
