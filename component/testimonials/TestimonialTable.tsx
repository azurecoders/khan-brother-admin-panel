import { Edit, Trash2 } from "lucide-react";

interface TestimonialTableProps {
  testimonials: any[];
  loading: boolean;
  onEdit: (testimonial: any) => void;
  onDelete: (id: string) => void;
}

const TestimonialTable = ({
  testimonials,
  loading,
  onEdit,
  onDelete,
}: TestimonialTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this testimonial?"))
      onDelete(id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sm:p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-sm sm:text-base">
          Loading testimonials...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Client Testimonials</h2>
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-semibold text-orange-600">
            {testimonials.length} review{testimonials.length !== 1 ? "s" : ""}
          </span>
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {testimonials.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-gray-500">
            <p className="text-base sm:text-lg">No testimonials found</p>
            <p className="text-sm text-gray-400 mt-2">
              {searchTerm
                ? "Try a different search term"
                : "Add your first testimonial"}
            </p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-4 sm:p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-md flex-shrink-0">
                    {testimonial.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-orange-600 font-medium">
                        {testimonial.designation}
                      </p>
                    </div>
                    <blockquote className="mt-2 text-gray-700 italic text-xs sm:text-sm line-clamp-3">
                      "{testimonial.message}"
                    </blockquote>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 sm:gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 sm:border-none">
                  <button
                    onClick={() => onEdit(testimonial)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    aria-label="Edit testimonial"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Delete testimonial"
                  >
                    <Trash2 size={16} />
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
