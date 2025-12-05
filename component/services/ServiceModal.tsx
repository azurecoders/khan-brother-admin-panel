import { ChangeEvent, useState } from "react";
import { Upload, X, Plus, Link } from "lucide-react";
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
  onIconInputTypeChange: (type: "file" | "url") => void;
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
  const [urlInput, setUrlInput] = useState("");

  if (!isOpen) return null;

  const handleSubServiceKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value) {
        onAddSubService(value);
        e.currentTarget.value = "";
      }
    }
  };

  // FIXED: Implemented URL validation logic from ProjectModal
  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      try {
        new URL(urlInput);
        // Update the form data with the validated URL
        onIconUrlChange({
          target: { value: urlInput.trim() },
        } as ChangeEvent<HTMLInputElement>);
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
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Title & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Electrical Installation"
              />
            </div>

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
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              placeholder="Describe your service in detail..."
            />
          </div>

          {/* Sub Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Services (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type and press Enter"
                onKeyDown={handleSubServiceKeyDown}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.querySelector(
                    'input[placeholder="Type and press Enter"]'
                  ) as HTMLInputElement;
                  if (input?.value.trim()) {
                    onAddSubService(input.value.trim());
                    input.value = "";
                  }
                }}
                className="px-4 py-3 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
            {formData.subServices.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {formData.subServices.map((sub, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm"
                  >
                    {sub}
                    <button
                      type="button"
                      onClick={() => onRemoveSubService(i)}
                      className="hover:text-orange-600 ml-1"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Icon Upload / URL - FIXED: Updated with URL validation */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Service Icon{" "}
              {!editingService && <span className="text-red-500">*</span>}
            </label>

            {/* Icon Selection Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => onIconInputTypeChange("file")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.iconInputType === "file"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => onIconInputTypeChange("url")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.iconInputType === "url"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Enter URL
              </button>
            </div>

            {formData.iconInputType === "file" && (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageChange}
                    className="hidden"
                    id="icon-upload"
                  />
                  <label htmlFor="icon-upload" className="cursor-pointer block">
                    {formData.iconPreview ? (
                      <div>
                        <img
                          src={formData.iconPreview}
                          alt="Preview"
                          className="w-20 h-20 mx-auto rounded-lg object-cover"
                        />
                        <p className="mt-2 text-sm text-gray-600">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload
                          size={32}
                          className="mx-auto text-gray-400 mb-2"
                        />
                        <p className="font-medium text-gray-700">
                          Drop here or click to upload
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG, SVG up to 2MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            )}

            {formData.iconInputType === "url" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Link size={18} className="text-gray-400 self-center" />
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://example.com/icon.svg"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>

                {/* Show current icon preview if exists */}
                {formData.iconUrl && (
                  <div className="flex items-center gap-3">
                    <img
                      src={formData.iconUrl}
                      alt="Preview"
                      className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        alert("Failed to load image from URL");
                      }}
                    />
                    <span className="text-sm text-gray-500">Current icon</span>
                  </div>
                )}
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
                : editingService
                ? "Update Service"
                : "Create Service"}
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

export default ServiceModal;
