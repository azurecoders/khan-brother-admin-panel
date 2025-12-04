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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
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
                Client Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., Ahmed Khan"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Company & Designation <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., Siemens Pakistan - Project Manager"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Testimonial Message <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={onInputChange}
              required
              rows={8}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all resize-none"
              placeholder="Share what the client loved about working with Khan Brothers..."
            />
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-70"
            >
              {loading
                ? "Saving..."
                : editingTestimonial
                ? "Update Testimonial"
                : "Create Testimonial"}
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

export default TestimonialModal;
