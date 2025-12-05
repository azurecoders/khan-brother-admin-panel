import { ChangeEvent } from "react";
import { X } from "lucide-react";

interface TestimonialModalProps {
  isOpen: boolean;
  editingTestimonial: any;
  formData: any;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const TestimonialModal = ({
  isOpen,
  editingTestimonial,
  formData,
  loading,
  onClose,
  onSubmit,
  onInputChange,
}: TestimonialModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-4 sm:px-6 py-4 text-white rounded-t-2xl">
          <h2 className="text-lg sm:text-xl font-bold">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                placeholder="e.g., Ahmed Khan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company & Designation <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
                placeholder="e.g., Siemens Pakistan - Project Manager"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Testimonial Message <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all resize-none text-sm"
              placeholder="Share what the client loved..."
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? "Saving..." : editingTestimonial ? "Update" : "Create"}{" "}
              Testimonial
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestimonialModal;
