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
      <div className="space-y-6 max-w-7xl">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h2 className="text-red-800 font-semibold">Error loading messages</h2>
          <p className="text-red-600 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600 text-lg">Manage contact form submissions</p>
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
  );
};

export default Messages;
