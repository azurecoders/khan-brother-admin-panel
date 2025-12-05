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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative w-full">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as "all" | "read" | "unread")
            }
            className="px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="read">Read</option>
          </select>
        </div>
        <button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MailOpen size={20} />
          Mark All Read
        </button>
      </div>
    </div>
  );
};

export default ContactFilters;
