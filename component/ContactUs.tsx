import { useState } from "react";
import {
  Mail,
  Phone,
  User,
  MessageSquare,
  X,
  AlertCircle,
  Calendar,
  Clock,
} from "lucide-react";

interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  phone: string;
  createdAt?: string;
}

const ContactUs = () => {
  const [contacts] = useState<Contact[]>([
    {
      id: 1,
      name: "John Anderson",
      email: "john.anderson@email.com",
      message:
        "Interested in your construction services for a commercial project. Need a consultation.",
      phone: "+1 (555) 123-4567",
      createdAt: "2025-04-01T10:30:00Z",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      email: "sarah.m@company.com",
      message:
        "Looking for engineering consulting services. Would like to discuss project requirements.",
      phone: "+1 (555) 234-5678",
      createdAt: "2025-04-02T14:15:00Z",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@industrial.com",
      message:
        "Need information about your industrial equipment and maintenance services.",
      phone: "+1 (555) 345-6789",
      createdAt: "2025-04-03T09:45:00Z",
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Client Inquiries
          </h1>
          <p className="text-xl text-gray-600">
            Connect with your future partners
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-white/50">
            <div className="text-6xl font-bold text-orange-600 mb-3">
              {contacts.length}
            </div>
            <p className="text-xl text-gray-700 font-semibold">
              Total Inquiries
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-white/50">
            <div className="text-6xl font-bold text-blue-600 mb-3">
              {contacts.length}
            </div>
            <p className="text-xl text-gray-700 font-semibold">
              Pending Response
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 text-center border border-white/50">
            <div className="text-6xl font-bold text-green-600 mb-3">3</div>
            <p className="text-xl text-gray-700 font-semibold">This Week</p>
          </div>
        </div>

        {/* Contact Cards */}
        <div className="space-y-8">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden hover:shadow-3xl transition-all duration-500"
            >
              <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-10 py-8 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl">
                      <User size={40} />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold">{contact.name}</h3>
                      <p className="text-lg opacity-90">{contact.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-80">Received</p>
                    <p className="text-xl font-bold">
                      {contact.createdAt
                        ? new Date(contact.createdAt).toLocaleDateString()
                        : "Today"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-10 space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-5 bg-orange-50/50 rounded-3xl p-6 border border-orange-200">
                    <Phone className="text-orange-600" size={32} />
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Phone
                      </p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="text-2xl font-bold text-gray-900 hover:text-orange-600 transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 bg-blue-50/50 rounded-3xl p-6 border border-blue-200">
                    <Mail className="text-blue-600" size={32} />
                    <div>
                      <p className="text-sm text-gray-600 font-semibold">
                        Email
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50/80 rounded-3xl p-8 border border-gray-200">
                  <div className="flex items-start gap-5">
                    <MessageSquare className="text-[#1E40AF] mt-1" size={32} />
                    <blockquote className="text-xl text-gray-800 leading-relaxed italic">
                      "{contact.message}"
                    </blockquote>
                  </div>
                </div>

                <div className="flex justify-center gap-6">
                  <a
                    href={`mailto:${contact.email}?subject=Re: Your Inquiry`}
                    className="px-10 py-5 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    Reply Now
                  </a>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    Call Client
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
