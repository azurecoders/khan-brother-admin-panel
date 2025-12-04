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

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingService ? "Edit Service" : "Add New Service"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-8">
          {/* Title & Category */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Service Title <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300"
                placeholder="e.g., Electrical Installation"
              />
            </div>
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
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 disabled:opacity-50"
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
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={4}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 resize-none"
              placeholder="Describe your service in detail..."
            />
          </div>

          {/* Sub Services */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Sub Services (Optional)
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Type and press Enter"
                onKeyDown={handleSubServiceKeyDown}
                className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
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
                className="px-6 py-4 bg-orange-100 hover:bg-orange-200 rounded-2xl transition-all"
              >
                <Plus size={24} />
              </button>
            </div>
            {formData.subServices.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {formData.subServices.map((sub, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                  >
                    {sub}
                    <button
                      type="button"
                      onClick={() => onRemoveSubService(i)}
                      className="hover:text-orange-600"
                    >
                      <X size={16} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Icon Upload / URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Service Icon{" "}
              {!editingService && <span className="text-orange-600">*</span>}
            </label>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => onIconInputTypeChange("file")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.iconInputType === "file"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <ImageIcon className="inline mr-2" size={20} /> Upload File
              </button>
              <button
                type="button"
                onClick={() => onIconInputTypeChange("url")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.iconInputType === "url"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Link className="inline mr-2" size={20} /> Enter URL
              </button>
            </div>

            {formData.iconInputType === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-10 text-center hover:border-orange-500 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                  id="icon-upload"
                />
                <label htmlFor="icon-upload" className="cursor-pointer">
                  {formData.iconPreview ? (
                    <div>
                      <img
                        src={formData.iconPreview}
                        alt="Preview"
                        className="w-28 h-28 mx-auto rounded-2xl object-cover shadow-lg"
                      />
                      <p className="mt-4 text-sm text-gray-600">
                        Click to change icon
                      </p>
                    </div>
                  ) : (
                    <div>
                      <Upload
                        size={48}
                        className="mx-auto text-gray-400 mb-4"
                      />
                      <p className="font-semibold text-gray-700">
                        Drop icon here or click to upload
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, SVG up to 2MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            )}

            {formData.iconInputType === "url" && (
              <div className="space-y-4">
                <input
                  type="url"
                  value={formData.iconUrl}
                  onChange={onIconUrlChange}
                  placeholder="https://example.com/icon.svg"
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                />
                {formData.iconUrl && (
                  <img
                    src={formData.iconUrl}
                    alt="Preview"
                    className="w-24 h-24 rounded-2xl object-cover shadow-lg"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                )}
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-70"
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

export default ServiceModal;
