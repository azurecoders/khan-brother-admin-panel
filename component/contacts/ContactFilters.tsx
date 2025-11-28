import { Search, MailOpen } from "lucide-react";

interface ContactFiltersProps {
  searchTerm: string;
  statusFilter: "all" | "read" | "unread";
  unreadCount: number;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: "all" | "read" | "unread") => void;
  onMarkAllRead: () => void;
}

const ContactFilters = ({
  searchTerm,
  statusFilter,
  unreadCount,
  onSearchChange,
  onStatusChange,
  onMarkAllRead,
}: ContactFiltersProps) => {
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
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as "all" | "read" | "unread")
            }
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        {/* Mark All Read Button */}
        <button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <MailOpen size={20} />
          Mark All Read
        </button>
      </div>
    </div>
  );
};

export default ContactFilters;
