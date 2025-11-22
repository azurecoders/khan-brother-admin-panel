"use client";
import { useState, ChangeEvent } from "react";
import { Search, Eye, Trash2, Mail, MailOpen, X, Calendar } from "lucide-react";

interface Message {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: "unread" | "read";
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      name: "Ahmad Hassan",
      email: "ahmad.hassan@gmail.com",
      subject: "Electrical Installation Inquiry",
      message:
        "I need electrical installation services for my new office building in Karachi. We have a 5-story commercial building and require complete electrical wiring, distribution panels, and backup power systems. Please provide a detailed quote and timeline for the project.",
      date: "2025-01-20",
      status: "unread",
    },
    {
      id: 2,
      name: "Fatima Khan",
      email: "fatima.k@company.com",
      subject: "Solar Panel Quote Request",
      message:
        "Please provide a quote for 10kW solar system installation for residential property. I'm interested in on-grid system with net metering. The property is located in DHA Phase 6, Karachi. Would appreciate if you could also include maintenance packages.",
      date: "2025-01-19",
      status: "read",
    },
    {
      id: 3,
      name: "Ali Raza",
      email: "ali.raza@business.pk",
      subject: "CCTV Security System",
      message:
        "Need complete CCTV camera installation for warehouse facility. Looking for 20 IP cameras with night vision, 30-day recording storage, and remote monitoring capability. The warehouse is approximately 50,000 sq ft.",
      date: "2025-01-18",
      status: "read",
    },
    {
      id: 4,
      name: "Sarah Ahmed",
      email: "sarah.a@greenenergy.pk",
      subject: "Networking Infrastructure",
      message:
        "We need complete networking infrastructure setup for our new office. This includes structured cabling, switches, routers, wifi access points for 50+ users. Office is 3 floors, approximately 15,000 sq ft total.",
      date: "2025-01-17",
      status: "unread",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewingMessage, setViewingMessage] = useState<Message | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filter messages based on search and status
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewMessage = (message: Message) => {
    setViewingMessage(message);
    setIsViewModalOpen(true);

    // Mark as read when viewing
    if (message.status === "unread") {
      setMessages((prev) =>
        prev.map((m) => (m.id === message.id ? { ...m, status: "read" } : m))
      );
    }
  };

  const handleDeleteMessage = (id: number) => {
    if (confirm("Are you sure you want to delete this message?")) {
      setMessages((prev) => prev.filter((message) => message.id !== id));
    }
  };

  const handleMarkAllRead = () => {
    setMessages((prev) =>
      prev.map((message) => ({ ...message, status: "read" }))
    );
  };

  const toggleMessageStatus = (id: number) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? {
              ...message,
              status: message.status === "read" ? "unread" : "read",
            }
          : message
      )
    );
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingMessage(null);
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600 text-lg">Manage your website content</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
            </select>
          </div>

          {/* Mark All Read Button */}
          <button
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <MailOpen size={20} />
            Mark All Read
          </button>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Contact Inquiries
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Messages: {filteredMessages.length} | Unread: {unreadCount}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sender Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Subject & Message
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Date
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
              {filteredMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No messages found.{" "}
                    {searchTerm || statusFilter !== "all"
                      ? "Try adjusting your filters."
                      : "Contact form submissions will appear here."}
                  </td>
                </tr>
              ) : (
                filteredMessages.map((message) => (
                  <tr
                    key={message.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      message.status === "unread" ? "bg-blue-50/30" : ""
                    }`}
                  >
                    {/* Sender Info Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            message.status === "unread"
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          {message.status === "unread" ? (
                            <Mail size={20} className="text-blue-600" />
                          ) : (
                            <MailOpen size={20} className="text-gray-600" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span
                            className={`font-semibold ${
                              message.status === "unread"
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {message.name}
                          </span>
                          <span className="text-gray-600 text-sm">
                            {message.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Subject & Message Column */}
                    <td className="px-6 py-4">
                      <div className="max-w-md">
                        <p
                          className={`font-medium truncate ${
                            message.status === "unread"
                              ? "text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-gray-600 text-sm truncate">
                          {message.message}
                        </p>
                      </div>
                    </td>

                    {/* Date Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar size={14} />
                        {message.date}
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleMessageStatus(message.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          message.status === "unread"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {message.status === "unread" ? (
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

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewMessage(message)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View message"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteMessage(message.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Message Modal */}
      {isViewModalOpen && viewingMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Message Details
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Received on {viewingMessage.date}
                </p>
              </div>
              <button
                onClick={closeViewModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Sender Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Name
                    </label>
                    <p className="text-gray-900 font-medium">
                      {viewingMessage.name}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Email
                    </label>
                    <p className="text-gray-900 font-medium">
                      {viewingMessage.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Subject
                </label>
                <p className="text-gray-900 font-semibold text-lg">
                  {viewingMessage.subject}
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Message
                </label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {viewingMessage.message}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                  Status
                </label>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    viewingMessage.status === "unread"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {viewingMessage.status === "unread" ? "● Unread" : "✓ Read"}
                </span>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => toggleMessageStatus(viewingMessage.id)}
                className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Mark as {viewingMessage.status === "read" ? "Unread" : "Read"}
              </button>
              <button
                onClick={() => {
                  handleDeleteMessage(viewingMessage.id);
                  closeViewModal();
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Delete Message
              </button>
              <button
                onClick={closeViewModal}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
