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
      <div className="p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <strong>Error:</strong> {error.message}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Messages & Inquiries
          </h1>
          <p className="text-gray-600">Stay connected with your clients</p>
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
