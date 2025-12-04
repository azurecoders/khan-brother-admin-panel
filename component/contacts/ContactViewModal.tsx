import { X, Phone, Mail, User, Calendar, Clock } from "lucide-react";
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
    if (confirm("Are you sure you want to delete this message permanently?")) {
      onDelete(contact.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Message from {contact.name}</h2>
            <p className="text-sm opacity-90">
              Received{" "}
              {new Date(contact.createdAt || Date.now()).toLocaleString()}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Sender Card */}
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 border border-white/50 shadow-inner">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-xl">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-orange-600 font-medium">{contact.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="text-orange-600" size={20} />
                  <span className="font-medium">{contact.phone}</span>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="text-blue-600" size={20} />
                  <span>
                    {new Date(
                      contact.createdAt || Date.now()
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="text-gray-600" size={20} />
                  <span>
                    {new Date(
                      contact.createdAt || Date.now()
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <div
                  className={`px-6 py-3 rounded-full text-lg font-bold ${
                    contactIsRead
                      ? "bg-gray-100 text-gray-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {contactIsRead ? "✓ Read" : "● Unread"}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Message</h3>
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200">
              <p className="text-lg text-gray-800 leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-8 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-orange-50">
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${contact.email}?subject=Re: Your Inquiry - Khan Brothers Engineering`}
              className="px-8 py-4 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#1E40AF] text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
            >
              Reply via Email
            </a>
            <button
              onClick={() => onToggleStatus(contact.id)}
              className="px-8 py-4 bg-orange-100 hover:bg-orange-200 text-orange-800 font-bold rounded-2xl transition-all shadow-md hover:shadow-xl"
            >
              Mark as {contactIsRead ? "Unread" : "Read"}
            </button>
            <button
              onClick={handleDelete}
              className="px-8 py-4 bg-red-100 hover:bg-red-200 text-red-700 font-bold rounded-2xl transition-all shadow-md hover:shadow-xl"
            >
              Delete Message
            </button>
            <button
              onClick={onClose}
              className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-2xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactViewModal;
