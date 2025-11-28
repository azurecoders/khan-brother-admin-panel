"use client";

import { useProducts } from "@/hooks/useProducts";
import ProductTable from "./products/ProductTable";
import ProductModal from "./products/ProductModal";
import ProductFilters from "./products/ProductFilters";


const Products = () => {
  const {
    searchTerm,
    isModalOpen,
    editingProduct,
    formData,
    filteredProducts,
    loading,
    error,
    mutationLoading,
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImagesChange,
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
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600 text-lg">Manage your product catalog</p>
      </div>

      {/* Filters */}
      <ProductFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
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
        onClose={resetForm}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onImagesChange={handleImagesChange}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};

export default Products;
