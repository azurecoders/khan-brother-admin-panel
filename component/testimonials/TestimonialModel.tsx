import { ChangeEvent } from "react";
import { X } from "lucide-react";
import { Testimonial, TestimonialFormData } from "@/types/testimonial";

interface TestimonialModalProps {
  isOpen: boolean;
  editingTestimonial: Testimonial | null;
  formData: TestimonialFormData;
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Client Name and Designation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                placeholder="Enter client name"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company - Designation *
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={onInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                placeholder="Enter company or designation"
              />
            </div>
          </div>

          {/* Testimonial Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Testimonial Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onInputChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
              placeholder="Enter client testimonial"
            />
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
                  {editingTestimonial ? "Updating..." : "Creating..."}
                </>
              ) : editingTestimonial ? (
                "Update Testimonial"
              ) : (
                "Add Testimonial"
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

export default TestimonialModal;
