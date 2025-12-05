import { Eye, Trash2, Mail, MailOpen, Phone } from "lucide-react";
import { useState } from "react";

interface ContactTableProps {
  contacts: any[];
  loading: boolean;
  unreadCount: number;
  isRead: (id: string) => boolean;
  onView: (contact: any) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const ContactTable = ({
  contacts,
  loading,
  unreadCount,
  isRead,
  onView,
  onDelete,
  onToggleStatus,
}: ContactTableProps) => {
  const [expandedContactId, setExpandedContactId] = useState<string | null>(
    null
  );

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete message from "${name}"?`)) onDelete(id);
  };

  const toggleExpand = (id: string) => {
    setExpandedContactId(expandedContactId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header - Same as original */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Contact Inquiries</h2>
        <p className="text-sm text-gray-600">
          Total: <span className="font-semibold">{contacts.length}</span> |
          Unread:{" "}
          <span className="font-semibold text-orange-600">{unreadCount}</span>
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {contacts.length === 0 ? (
          <div className="p-8 md:p-12 text-center text-gray-500">
            <p className="text-lg">No messages yet</p>
          </div>
        ) : (
          contacts.map((contact) => {
            const contactIsRead = isRead(contact.id);
            const isExpanded = expandedContactId === contact.id;
            const dateTime = new Date(contact.createdAt || Date.now());
            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={contact.id}
                className={`p-4 md:p-5 hover:bg-gray-50 ${
                  !contactIsRead ? "bg-orange-50/50" : ""
                }`}
              >
                {/* Mobile View - Expandable Card */}
                <div className="lg:hidden">
                  <div
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpand(contact.id)}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${
                          !contactIsRead ? "bg-orange-500" : "bg-gray-200"
                        }`}
                      >
                        {!contactIsRead ? (
                          <Mail size={20} className="text-white" />
                        ) : (
                          <MailOpen size={20} className="text-gray-600" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-900 text-sm truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-gray-500 truncate hidden sm:inline">
                            {contact.email}
                          </span>
                        </div>
                        <p className="text-xs text-gray-700 line-clamp-2 sm:line-clamp-1">
                          {contact.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Phone size={12} className="text-orange-600" />
                            <span>{contact.phone}</span>
                          </div>
                          <span>•</span>
                          <span>{time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2 pl-2">
                      {!contactIsRead && (
                        <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      )}
                      <div
                        className={`transform transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Mobile Content */}
                  {isExpanded && (
                    <div className="mt-4 pl-13 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="space-y-3">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Email
                          </div>
                          <p className="text-gray-900 text-sm">
                            {contact.email}
                          </p>
                        </div>
                        <div>
                          <div className="text-xs text-gray-500 mb-1">
                            Full Message
                          </div>
                          <p className="text-gray-900 text-sm bg-gray-50 rounded p-3">
                            {contact.message}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <div className="text-xs text-gray-500">Date</div>
                            <p className="text-gray-900">
                              {date} at {time}
                            </p>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 text-right">
                              Status
                            </div>
                            <p
                              className={`font-medium ${
                                !contactIsRead
                                  ? "text-orange-600"
                                  : "text-gray-600"
                              }`}
                            >
                              {!contactIsRead ? "Unread" : "Read"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Action Buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => onToggleStatus(contact.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium ${
                            !contactIsRead
                              ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {!contactIsRead ? "Mark Read" : "Unread"}
                        </button>
                        <button
                          onClick={() => onView(contact)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-sm font-medium"
                        >
                          <Eye size={16} />
                          View
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id, contact.name)}
                          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg text-sm font-medium"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Desktop View - EXACTLY as original */}
                <div className="hidden lg:flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md flex-shrink-0 ${
                        !contactIsRead ? "bg-orange-500" : "bg-gray-200"
                      }`}
                    >
                      {!contactIsRead ? (
                        <Mail size={24} className="text-white" />
                      ) : (
                        <MailOpen size={24} className="text-gray-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          • {contact.email}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 line-clamp-2">
                        {contact.message}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Phone size={14} className="text-orange-600" />
                          {contact.phone}
                        </div>
                        <span>•</span>
                        <span>
                          {date} at {time}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => onToggleStatus(contact.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        !contactIsRead
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {!contactIsRead ? "Mark Read" : "Unread"}
                    </button>
                    <button
                      onClick={() => onView(contact)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id, contact.name)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ContactTable;
