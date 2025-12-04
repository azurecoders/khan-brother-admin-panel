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
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-6 flex-1">
          <div className="relative w-full max-w-md">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              onStatusChange(e.target.value as "all" | "read" | "unread")
            }
            className="px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md min-w-[200px]"
          >
            <option value="all">All Messages</option>
            <option value="unread">Unread ({unreadCount})</option>
            <option value="read">Read</option>
          </select>
        </div>

        <button
          onClick={onMarkAllRead}
          disabled={unreadCount === 0}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <MailOpen size={24} />
          Mark All as Read
        </button>
      </div>
    </div>
  );
};

export default ContactFilters;
