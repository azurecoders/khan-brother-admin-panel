import { X, Phone, Mail, User } from "lucide-react";
import { Contact } from "@/types/contact";

interface ContactViewModalProps {
  isOpen: boolean;
  contact: Contact | null;
  isRead: (id: string) => boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const ContactViewModal = ({
  isOpen,
  contact,
  isRead,
  onClose,
  onDelete,
  onToggleStatus,
}: ContactViewModalProps) => {
  if (!isOpen || !contact) return null;

  const contactIsRead = isRead(contact.id);

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this message?")) {
      onDelete(contact.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Message Details</h2>
            <p className="text-sm text-gray-600 mt-1">
              Contact inquiry from {contact.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Sender Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p className="text-gray-900 font-medium">{contact.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${contactIsRead ? "bg-gray-100" : "bg-blue-100"
                    }`}
                >
                  <span
                    className={`text-lg ${contactIsRead ? "text-gray-600" : "text-blue-600"
                      }`}
                  >
                    {contactIsRead ? "✓" : "●"}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <p
                    className={`font-medium ${contactIsRead ? "text-gray-600" : "text-blue-600"
                      }`}
                  >
                    {contactIsRead ? "Read" : "Unread"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Message
            </h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors text-center"
          >
            Reply via Email
          </a>
          <button
            onClick={() => onToggleStatus(contact.id)}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
          >
            Mark as {contactIsRead ? "Unread" : "Read"}
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactViewModal;
