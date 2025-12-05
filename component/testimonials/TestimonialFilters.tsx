import { Search, Plus } from "lucide-react";

interface TestimonialFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

const TestimonialFilters = ({
  searchTerm,
  onSearchChange,
  onAddClick,
}: TestimonialFiltersProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-base md:text-sm"
          />
        </div>
        <button
          onClick={onAddClick}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap text-base md:text-sm w-full sm:w-auto"
        >
          <Plus size={20} />
          Add Testimonial
        </button>
      </div>
    </div>
  );
};

export default TestimonialFilters;
