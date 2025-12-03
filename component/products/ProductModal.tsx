// components/products/ProductModal.tsx
import { ChangeEvent, useState } from "react";
import { Upload, X, Trash2, Link, ImageIcon, Plus } from "lucide-react";
import { Product, ProductFormData } from "@/types/product";

interface Category {
  id: string;
  name: string;
}

interface ProductModalProps {
  isOpen: boolean;
  editingProduct: Product | null;
  formData: ProductFormData;
  loading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImagesChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageUrlAdd: (url: string) => void;
  onImageInputTypeChange: (type: 'file' | 'url') => void;
  onRemoveImage: (index: number) => void;
}

const ProductModal = ({
  isOpen,
  editingProduct,
  formData,
  loading,
  categories,
  categoriesLoading,
  onClose,
  onSubmit,
  onInputChange,
  onImagesChange,
  onImageUrlAdd,
  onImageInputTypeChange,
  onRemoveImage,
}: ProductModalProps) => {
  const [urlInput, setUrlInput] = useState("");

  if (!isOpen) return null;

  // Check if preview is from existing images or new upload
  const isExistingImage = (preview: string) => {
    return !preview.startsWith("blob:") && editingProduct?.images.some(img => img.imageUrl === preview);
  };

  const isNewUrl = (preview: string) => {
    return !preview.startsWith("blob:") && !isExistingImage(preview);
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onImageUrlAdd(urlInput.trim());
      setUrlInput("");
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Product Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              placeholder="Enter product title"
            />
          </div>

          {/* Category and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                required
                disabled={categoriesLoading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Category</option>
                {categoriesLoading ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories?.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                placeholder="e.g., PKR 25,000"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
              placeholder="Enter product description"
            />
          </div>

          {/* Images Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images
              {editingProduct && (
                <span className="text-gray-500 font-normal">
                  {" "}(Add new images to replace existing ones)
                </span>
              )}
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => onImageInputTypeChange('file')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.imageInputType === 'file'
                    ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <ImageIcon size={18} />
                Upload Files
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.imageInputType === 'url'
                    ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <Link size={18} />
                Enter URLs
              </button>
            </div>

            {/* Image Previews */}
            {formData.imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                {formData.imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                      }}
                    />
                    <div className="absolute top-1 right-1 flex gap-1">
                      {isExistingImage(preview) && (
                        <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                          Current
                        </span>
                      )}
                      {isNewUrl(preview) && (
                        <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                          URL
                        </span>
                      )}
                      {preview.startsWith("blob:") && (
                        <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                          New
                        </span>
                      )}
                      {!isExistingImage(preview) && (
                        <button
                          type="button"
                          onClick={() => onRemoveImage(index)}
                          className="bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* File Upload Area */}
            {formData.imageInputType === 'file' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImagesChange}
                  multiple
                  className="hidden"
                  id="product-images"
                />
                <label htmlFor="product-images" className="cursor-pointer block">
                  <div className="space-y-2">
                    <Upload className="mx-auto text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">
                      Upload product images
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, WebP (Multiple files allowed)
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* URL Input Area */}
            {formData.imageInputType === 'url' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={handleUrlKeyDown}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAddUrl}
                    className="px-4 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter image URL and click Add or press Enter. You can add multiple URLs.
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {editingProduct ? "Updating..." : "Creating..."}
                </>
              ) : editingProduct ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
