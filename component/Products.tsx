// components/Products.tsx
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
    handleImageUrlAdd,            // NEW
    handleImageInputTypeChange,   // NEW
    handleRemoveImage,
    handleEdit,
    handleDelete,
    handleSubmit,
  } = useProducts();

  if (error) {
    return (
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">Error loading products</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600 text-lg">Manage your product catalog</p>
      </div>

      <ProductFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        categories={categories}
        categoriesLoading={categoriesLoading}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onAddClick={openAddModal}
      />

      <ProductTable
        products={filteredProducts}
        loading={loading}
        searchTerm={searchTerm}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
        onImageUrlAdd={handleImageUrlAdd}               // NEW
        onImageInputTypeChange={handleImageInputTypeChange} // NEW
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};

export default Products;
