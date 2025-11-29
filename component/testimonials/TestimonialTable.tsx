import { Edit, Trash2, Quote } from "lucide-react";
import { Testimonial } from "@/types/testimonial";

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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E40AF]"></div>
          <span className="ml-3 text-gray-600">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Client Testimonials</h2>
        <p className="text-sm text-gray-600 mt-1">
          Total: {testimonials.length}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Client Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Testimonial
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                  No testimonials found.{" "}
                  {searchTerm
                    ? "Try adjusting your search."
                    : "Create your first testimonial to get started."}
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr
                  key={testimonial.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Client Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-[#EA580C] rounded-full flex items-center justify-center text-white">
                        <Quote size={16} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold">
                          {testimonial.name}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {testimonial.designation}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Testimonial */}
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-700 max-w-md line-clamp-2">
                      "{testimonial.message}"
                    </p>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(testimonial)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit testimonial"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete testimonial"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TestimonialTable;
