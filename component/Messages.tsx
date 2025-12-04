"use client";

import { useContacts } from "@/hooks/useContacts";
import ContactFilters from "./contacts/ContactFilters";
import ContactTable from "./contacts/ContactTable";
import ContactViewModal from "./contacts/ContactViewModal";

const Messages = () => {
  const {
    searchTerm,
    statusFilter,
    viewingContact,
    isViewModalOpen,
    filteredContacts,
    loading,
    error,
    unreadCount,
    setSearchTerm,
    setStatusFilter,
    handleView,
    handleDelete,
    toggleReadStatus,
    markAllAsRead,
    closeViewModal,
    isRead,
  } = useContacts();

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-8 py-6 rounded-3xl shadow-lg">
            <strong className="text-xl font-bold">
              Error Loading Messages
            </strong>
            <p className="mt-2">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Messages & Inquiries
          </h1>
          <p className="text-xl text-gray-600">
            Stay connected with your clients
          </p>
        </div>

        {/* Filters */}
        <ContactFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          unreadCount={unreadCount}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
          onMarkAllRead={markAllAsRead}
        />

        {/* Table */}
        <ContactTable
          contacts={filteredContacts}
          loading={loading}
          searchTerm={searchTerm}
          unreadCount={unreadCount}
          isRead={isRead}
          onView={handleView}
          onDelete={handleDelete}
          onToggleStatus={toggleReadStatus}
        />

        {/* View Modal */}
        <ContactViewModal
          isOpen={isViewModalOpen}
          contact={viewingContact}
          isRead={isRead}
          onClose={closeViewModal}
          onDelete={handleDelete}
          onToggleStatus={toggleReadStatus}
        />
      </div>
    </div>
  );
};

export default Messages;
