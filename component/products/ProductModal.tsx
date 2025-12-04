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

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      onImageUrlAdd(urlInput.trim());
      setUrlInput("");
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingProduct ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Product Title <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., ABB Circuit Breaker 100A"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Price (Optional)
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={onInputChange}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., PKR 45,000"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Category <span className="text-orange-600">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                required
                disabled={categoriesLoading}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all disabled:opacity-50"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={5}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all resize-none"
              placeholder="Detailed product description..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Product Images
            </label>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => onImageInputTypeChange("file")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.imageInputType === "file"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <ImageIcon className="inline mr-2" size={20} /> Upload Files
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange("url")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.imageInputType === "url"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Link className="inline mr-2" size={20} /> Enter URLs
              </button>
            </div>

            {formData.imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {formData.imagePreviews.map((preview, i) => (
                  <div key={i} className="relative group">
                    <img
                      src={preview}
                      alt=""
                      className="w-full h-32 rounded-2xl object-cover shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={() => onRemoveImage(i)}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {formData.imageInputType === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-orange-500 transition-all cursor-pointer">
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
                  className="cursor-pointer"
                >
                  <Upload size={56} className="mx-auto text-gray-400 mb-4" />
                  <p className="font-bold text-gray-700">
                    Drop images here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports multiple images • PNG, JPG, WebP
                  </p>
                </label>
              </div>
            )}

            {formData.imageInputType === "url" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleAddUrl}
                    className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all"
                  >
                    <Plus size={24} />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-70"
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
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-5 rounded-2xl transition-all"
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
