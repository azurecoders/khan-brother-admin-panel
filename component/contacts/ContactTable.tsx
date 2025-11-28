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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E40AF]"></div>
          <span className="ml-3 text-gray-600">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Contact Inquiries</h2>
        <p className="text-sm text-gray-600 mt-1">
          Total Messages: {contacts.length} | Unread: {unreadCount}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Sender Info
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {contacts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No messages found.{" "}
                  {searchTerm
                    ? "Try adjusting your search."
                    : "Contact form submissions will appear here."}
                </td>
              </tr>
            ) : (
              contacts.map((contact) => {
                const contactIsRead = isRead(contact.id);
                return (
                  <tr
                    key={contact.id}
                    className={`hover:bg-gray-50 transition-colors ${!contactIsRead ? "bg-blue-50/30" : ""
                      }`}
                  >
                    {/* Sender Info */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${!contactIsRead ? "bg-blue-100" : "bg-gray-100"
                            }`}
                        >
                          {!contactIsRead ? (
                            <Mail size={20} className="text-blue-600" />
                          ) : (
                            <MailOpen size={20} className="text-gray-600" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-semibold ${!contactIsRead ? "text-gray-900" : "text-gray-700"
                              }`}
                          >
                            {contact.name}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {contact.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Message */}
                    <td className="px-6 py-4">
                      <p
                        className={`text-sm max-w-md line-clamp-2 ${!contactIsRead ? "text-gray-900" : "text-gray-700"
                          }`}
                      >
                        {contact.message}
                      </p>
                    </td>

                    {/* Phone */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Phone size={14} />
                        {contact.phone}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onToggleStatus(contact.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${!contactIsRead
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                      >
                        {!contactIsRead ? (
                          <>
                            <span className="w-2 h-2 bg-blue-600 rounded-full mr-1.5"></span>
                            Unread
                          </>
                        ) : (
                          <>
                            <span className="text-green-600 mr-1">✓</span>
                            Read
                          </>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onView(contact)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View message"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(contact.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTable;
