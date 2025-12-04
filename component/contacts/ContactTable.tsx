import { Eye, Trash2, Mail, MailOpen, Phone } from "lucide-react";
import { Contact } from "@/types/contact";

interface ContactTableProps {
  contacts: Contact[];
  loading: boolean;
  searchTerm: string;
  unreadCount: number;
  isRead: (id: string) => boolean;
  onView: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const ContactTable = ({
  contacts,
  loading,
  searchTerm,
  unreadCount,
  isRead,
  onView,
  onDelete,
  onToggleStatus,
}: ContactTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">Contact Inquiries</h2>
        <p className="text-gray-600 mt-1">
          Total: <span className="font-bold">{contacts.length}</span> | Unread:{" "}
          <span className="font-bold text-orange-600">{unreadCount}</span>
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {contacts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl">No messages yet</p>
            <p className="text-gray-600">New inquiries will appear here</p>
          </div>
        ) : (
          contacts.map((contact) => {
            const contactIsRead = isRead(contact.id);
            return (
              <div
                key={contact.id}
                className={`p-8 hover:bg-gradient-to-r hover:from-orange-50/30 hover:to-blue-50/30 transition-all duration-300 ${
                  !contactIsRead
                    ? "bg-blue-50/20 border-l-4 border-orange-500"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between gap-8">
                  <div className="flex-1 flex items-start gap-5">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${
                        !contactIsRead
                          ? "bg-gradient-to-br from-orange-500 to-orange-600"
                          : "bg-gray-100"
                      }`}
                    >
                      {!contactIsRead ? (
                        <Mail size={28} className="text-white" />
                      ) : (
                        <MailOpen size={28} className="text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {contact.name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          • {contact.email}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        {contact.message}
                      </p>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} className="text-orange-600" />
                          <span>{contact.phone}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">
                          {new Date(
                            contact.createdAt || Date.now()
                          ).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleStatus(contact.id)}
                      className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                        !contactIsRead
                          ? "bg-orange-100 text-orange-800 hover:bg-orange-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {!contactIsRead ? "Mark as Read" : "Mark as Unread"}
                    </button>
                    <button
                      onClick={() => onView(contact)}
                      className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                    >
                      <Eye
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => handleDelete(contact.id)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all shadow-md hover:shadow-lg group"
                    >
                      <Trash2
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
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
