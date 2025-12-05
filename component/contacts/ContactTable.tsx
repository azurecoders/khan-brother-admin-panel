import { Eye, Trash2, Mail, MailOpen, Phone } from "lucide-react";

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
  const handleDelete = (id: string) => {
    if (confirm("Delete this message?")) onDelete(id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">Contact Inquiries</h2>
        <p className="text-sm text-gray-600">
          Total: <span className="font-semibold">{contacts.length}</span> |
          Unread:{" "}
          <span className="font-semibold text-orange-600">{unreadCount}</span>
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {contacts.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">No messages yet</p>
          </div>
        ) : (
          contacts.map((contact) => {
            const contactIsRead = isRead(contact.id);
            const dateTime = new Date(contact.createdAt || Date.now());
            const date = dateTime.toLocaleDateString();
            const time = dateTime.toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }); // ← Now in 12-hour format with AM/PM

            return (
              <div key={contact.id} className="p-5 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-4">
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
                        </span>{" "}
                        {/* ← Now shows 08:47 PM */}
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
                      onClick={() => handleDelete(contact.id)}
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
