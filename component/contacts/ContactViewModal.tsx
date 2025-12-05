import { X, Phone, Mail, Calendar, Clock } from "lucide-react";

interface ContactViewModalProps {
  isOpen: boolean;
  contact: any;
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

  const dateTime = new Date(contact.createdAt || Date.now());
  const date = dateTime.toLocaleDateString();
  const time = dateTime.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }); // ← 12-hour format

  const handleDelete = () => {
    if (confirm("Delete this message permanently?")) {
      onDelete(contact.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-6 py-4 text-white rounded-t-2xl">
          <h2 className="text-xl font-bold">Message from {contact.name}</h2>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
                {contact.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">
                  {contact.name}
                </h3>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-orange-600 hover:underline"
                >
                  {contact.email}
                </a>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-orange-600" />
                <a href={`tel:${contact.phone}`} className="font-medium">
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Calendar size={18} />
                {date}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <Clock size={18} />
                {time} {/* ← Now shows 8:47 PM */}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Message</h3>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
              <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {contact.message}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${contact.email}?subject=Re: Your Inquiry`}
              className="flex-1 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#1E40AF] text-white font-semibold py-3 rounded-lg text-center transition-all shadow-md hover:shadow-lg"
            >
              Reply via Email
            </a>
            <button
              onClick={() => onToggleStatus(contact.id)}
              className="flex-1 bg-orange-100 hover:bg-orange-200 text-orange-800 font-semibold py-3 rounded-lg transition-all"
            >
              Mark as {contactIsRead ? "Unread" : "Read"}
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-3 rounded-lg transition-all"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all"
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
