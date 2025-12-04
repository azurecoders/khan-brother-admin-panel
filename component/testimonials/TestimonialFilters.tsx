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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400"
          />
        </div>

        <button
          onClick={onAddClick}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 whitespace-nowrap"
        >
          <Plus size={24} />
          Add Testimonial
        </button>
      </div>
    </div>
  );
};

export default TestimonialFilters;
