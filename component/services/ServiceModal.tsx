import { ChangeEvent } from "react";
import { Upload, X, Plus } from "lucide-react";
import { Service, ServiceFormData } from "@/types/service";

interface ServiceModalProps {
  isOpen: boolean;
  editingService: Service | null;
  formData: ServiceFormData;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onAddSubService: (value: string) => void;
  onRemoveSubService: (index: number) => void;
}

const ServiceModal = ({
  isOpen,
  editingService,
  formData,
  loading,
  onClose,
  onSubmit,
  onInputChange,
  onImageChange,
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
          {/* Service Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Service Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              placeholder="Enter service name"
            />
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

          {/* Image Upload */}
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
                id="service-icon"
              />
              <label htmlFor="service-icon" className="cursor-pointer block">
                {formData.iconPreview ? (
                  <div className="space-y-2">
                    <img
                      src={formData.iconPreview}
                      alt="Preview"
                      className="w-20 h-20 mx-auto rounded-lg object-cover"
                    />
                    <p className="text-sm text-gray-600">
                      {formData.icon
                        ? "New icon selected - Click to change"
                        : "Current icon - Click to change"}
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
