import { ChangeEvent, useState } from "react";
import { Upload, X, Trash2, Link } from "lucide-react";
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
  onImageInputTypeChange: (type: "file" | "url") => void;
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

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      try {
        new URL(urlInput);
        onImageUrlAdd(urlInput.trim());
        setUrlInput("");
      } catch {
        alert("Please enter a valid image URL");
      }
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-900 px-6 py-4 rounded-t-xl text-white flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Title & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., ABB Circuit Breaker 100A"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (Optional)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., PKR 45,000"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
              disabled={categoriesLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              placeholder="Detailed product description..."
            />
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Product Images
            </label>

            {/* Image Selection Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => onImageInputTypeChange("file")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.imageInputType === "file"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload Images
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange("url")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.imageInputType === "url"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Enter URLs
              </button>
            </div>

            {/* Image Previews */}
            {formData.imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                {formData.imagePreviews.map((preview, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={preview}
                      alt=""
                      className="w-full h-24 rounded-lg object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(i)}
                      className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* File Upload Section */}
            {formData.imageInputType === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onImagesChange}
                  className="hidden"
                  id="product-images-upload"
                />
                <label
                  htmlFor="product-images-upload"
                  className="cursor-pointer block"
                >
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="font-medium text-gray-700">
                    Drop images here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Supports multiple images • PNG, JPG, WebP
                  </p>
                </label>
              </div>
            )}

            {/* URL Input Section - FIXED: Changed Plus icon to "Apply" text button */}
            {formData.imageInputType === "url" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                    title="Apply URL"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter image URL and press Enter or click Apply to add
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Create Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
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
