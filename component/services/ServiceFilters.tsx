import { Search, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ServiceFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  categories: Category[];
  categoriesLoading: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAddClick: () => void;
}

const ServiceFilters = ({
  searchTerm,
  categoryFilter,
  categories,
  categoriesLoading,
  onSearchChange,
  onCategoryChange,
  onAddClick,
}: ServiceFiltersProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          {/* Search */}
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={categoriesLoading}
            className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
          >
            <option value="all">All Categories</option>
            {categoriesLoading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories?.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        <button
          onClick={onAddClick}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 whitespace-nowrap"
        >
          <Plus size={24} />
          Add New Service
        </button>
      </div>
    </div>
  );
};

export default ServiceFilters;
