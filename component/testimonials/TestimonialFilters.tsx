import { Search, Plus } from "lucide-react";

interface TestimonialFiltersProps {
  searchTerm: string;
  approvalFilter: "all" | "approved" | "pending";
  onSearchChange: (value: string) => void;
  onApprovalFilterChange: (value: "all" | "approved" | "pending") => void;
  onAddClick: () => void;
}

const TestimonialFilters = ({
  searchTerm,
  approvalFilter,
  onSearchChange,
  onApprovalFilterChange,
  onAddClick,
}: TestimonialFiltersProps) => {
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
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
            />
          </div>

          {/* Approval Filter */}
          <select
            value={approvalFilter}
            onChange={(e) =>
              onApprovalFilterChange(
                e.target.value as "all" | "approved" | "pending"
              )
            }
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
          >
            <option value="all">All Testimonials</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* Add Testimonial Button */}
        <button
          onClick={onAddClick}
          className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Plus size={20} />
          Add New
        </button>
      </div>
    </div>
  );
};

export default TestimonialFilters;
