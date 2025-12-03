// components/services/ServiceModal.tsx
import { ChangeEvent } from "react";
import { Upload, X, Plus, Link, ImageIcon } from "lucide-react";
import { Service, ServiceFormData } from "@/types/service";

interface Category {
  id: string;
  name: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  editingService: Service | null;
  formData: ServiceFormData;
  loading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconUrlChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIconInputTypeChange: (type: 'file' | 'url') => void;
  onAddSubService: (value: string) => void;
  onRemoveSubService: (index: number) => void;
}

const ServiceModal = ({
  isOpen,
  editingService,
  formData,
  loading,
  categories,
  categoriesLoading,
  onClose,
  onSubmit,
  onInputChange,
  onImageChange,
  onIconUrlChange,
  onIconInputTypeChange,
  onAddSubService,
  onRemoveSubService,
}: ServiceModalProps) => {
  if (!isOpen) return null;

  const handleSubServiceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.currentTarget;
      if (input.value.trim()) {
        onAddSubService(input.value.trim());
        input.value = "";
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Service Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Title *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              placeholder="Enter service title"
            />
          </div>

          {/* Category */}
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
              placeholder="Enter service description"
            />
          </div>

          {/* Sub Services */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sub Services
              <span className="text-gray-500 font-normal"> (Optional)</span>
            </label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type sub-service and press Enter"
                  onKeyDown={handleSubServiceKeyDown}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.querySelector(
                      'input[placeholder="Type sub-service and press Enter"]'
                    ) as HTMLInputElement;
                    if (input?.value.trim()) {
                      onAddSubService(input.value.trim());
                      input.value = "";
                      input.focus();
                    }
                  }}
                  className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {formData.subServices.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.subServices.map((sub, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {sub}
                      <button
                        type="button"
                        onClick={() => onRemoveSubService(index)}
                        className="hover:text-blue-600"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Image Upload / URL Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Icon {!editingService && "*"}
              {editingService && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  (Leave empty to keep current)
                </span>
              )}
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => onIconInputTypeChange('file')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.iconInputType === 'file'
                    ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <ImageIcon size={18} />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => onIconInputTypeChange('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.iconInputType === 'url'
                    ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                    : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <Link size={18} />
                Enter URL
              </button>
            </div>

            {/* File Upload Section */}
            {formData.iconInputType === 'file' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                  id="service-icon"
                />
                <label htmlFor="service-icon" className="cursor-pointer block">
                  {formData.iconPreview && formData.icon ? (
                    <div className="space-y-2">
                      <img
                        src={formData.iconPreview}
                        alt="Preview"
                        className="w-20 h-20 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-600">
                        New icon selected - Click to change
                      </p>
                    </div>
                  ) : formData.iconPreview && !formData.icon && editingService ? (
                    <div className="space-y-2">
                      <img
                        src={formData.iconPreview}
                        alt="Preview"
                        className="w-20 h-20 mx-auto rounded-lg object-cover"
                      />
                      <p className="text-sm text-gray-600">
                        Current icon - Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Upload className="mx-auto text-gray-400" size={32} />
                      <p className="text-sm font-medium text-gray-700">
                        Upload service icon
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG, SVG</p>
                    </div>
                  )}
                </label>
              </div>
            )}

            {/* URL Input Section */}
            {formData.iconInputType === 'url' && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Link size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="url"
                    value={formData.iconUrl}
                    onChange={onIconUrlChange}
                    placeholder="https://example.com/icon.png"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  />
                </div>

                {/* URL Preview */}
                {formData.iconUrl && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="flex items-center gap-4">
                      <img
                        src={formData.iconUrl}
                        alt="Icon preview"
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                          const errorText = e.currentTarget.nextElementSibling;
                          if (errorText) {
                            errorText.classList.remove('hidden');
                          }
                        }}
                        onLoad={(e) => {
                          (e.target as HTMLImageElement).style.display = 'block';
                          const errorText = e.currentTarget.nextElementSibling;
                          if (errorText) {
                            errorText.classList.add('hidden');
                          }
                        }}
                      />
                      <p className="hidden text-sm text-red-500">
                        Unable to load image. Please check the URL.
                      </p>
                    </div>
                  </div>
                )}
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
                  {editingService ? "Updating..." : "Creating..."}
                </>
              ) : editingService ? (
                "Update Service"
              ) : (
                "Add Service"
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

export default ServiceModal;
