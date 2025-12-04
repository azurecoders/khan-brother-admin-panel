import { Edit, Trash2, Quote } from "lucide-react";
import { Testimonial } from "@/types/testimonial";
import StarRating from "./StarRating";

interface TestimonialTableProps {
  testimonials: Testimonial[];
  loading: boolean;
  searchTerm: string;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (id: string) => void;
}

const TestimonialTable = ({
  testimonials,
  loading,
  searchTerm,
  onEdit,
  onDelete,
}: TestimonialTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">
          Client Testimonials
        </h2>
        <p className="text-gray-600 mt-1">
          Total:{" "}
          <span className="font-bold text-orange-600">
            {testimonials.length}
          </span>{" "}
          reviews
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {testimonials.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">No testimonials yet</div>
            <p className="text-xl">Start building trust with client stories</p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-8 hover:bg-gradient-to-r hover:from-orange-50/30 hover:to-blue-50/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {testimonial.name}
                      </h3>
                      <p className="text-orange-600 font-medium">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-lg text-gray-700 italic leading-relaxed pl-6 border-l-4 border-orange-500">
                    "{testimonial.message}"
                  </blockquote>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onEdit(testimonial)}
                    className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                  >
                    <Edit
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all shadow-md hover:shadow-lg group"
                  >
                    <Trash2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestimonialTable;
