import { Search, Plus } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

interface ProjectFiltersProps {
  searchTerm: string;
  categoryFilter: string;
  categories: Category[];
  categoriesLoading: boolean;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onAddClick: () => void;
}

const ProjectFilters = ({
  searchTerm,
  categoryFilter,
  categories,
  categoriesLoading,
  onSearchChange,
  onCategoryChange,
  onAddClick,
}: ProjectFiltersProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-800"
            />
          </div>

          {/* Category Filter */}
          <div className="flex-1 min-w-[200px]">
            <select
              value={categoryFilter}
              onChange={(e) => onCategoryChange(e.target.value)}
              disabled={categoriesLoading}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
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
        </div>

        <button
          onClick={onAddClick}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Add New Project
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters;
