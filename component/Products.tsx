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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Products
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
            Products Management
          </h1>
          <p className="text-xl text-gray-600">
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
