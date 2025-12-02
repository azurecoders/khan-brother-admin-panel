// components/projects/ProjectFilters.tsx
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
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
            />
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => onCategoryChange(e.target.value)}
            disabled={categoriesLoading}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="all">All Categories</option>
            {categoriesLoading ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Add Project Button */}
        <button
          onClick={onAddClick}
          className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Add Project
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters;
