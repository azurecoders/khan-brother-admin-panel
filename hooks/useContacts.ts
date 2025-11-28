import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { FETCH_ALL_CONTACTS, DELETE_CONTACT } from "@/graphql/contacts";
import { Contact, ContactReadStatus } from "@/types/contact";

const READ_STATUS_KEY = "contact_read_status";

export const useContacts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "read" | "unread">(
    "all"
  );
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [readStatus, setReadStatus] = useState<ContactReadStatus>({});

  // Load read status from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(READ_STATUS_KEY);
    if (stored) {
      try {
        setReadStatus(JSON.parse(stored));
      } catch (e) {
        console.error("Error parsing read status:", e);
      }
    }
  }, []);

  // Save read status to localStorage
  const saveReadStatus = useCallback((newStatus: ContactReadStatus) => {
    setReadStatus(newStatus);
    localStorage.setItem(READ_STATUS_KEY, JSON.stringify(newStatus));
  }, []);

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_CONTACTS);

  const [deleteContact] = useMutation(DELETE_CONTACT, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting contact:", error);
      alert("Failed to delete contact. Please try again.");
    },
  });

  // Check if a contact is read
  const isRead = useCallback(
    (id: string) => readStatus[id] === true,
    [readStatus]
  );

  // Filtered contacts
  const filteredContacts = useMemo(() => {
    const contacts: Contact[] = data?.fetchAllContacts || [];

    return contacts.filter((contact) => {
      const matchesSearch =
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const contactIsRead = isRead(contact.id);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "read" && contactIsRead) ||
        (statusFilter === "unread" && !contactIsRead);

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter, isRead]);

  // Unread count
  const unreadCount = useMemo(() => {
    const contacts: Contact[] = data?.fetchAllContacts || [];
    return contacts.filter((contact) => !isRead(contact.id)).length;
  }, [data, isRead]);

  // Handlers
  const handleView = (contact: Contact) => {
    setViewingContact(contact);
    setIsViewModalOpen(true);

    // Mark as read when viewing
    if (!isRead(contact.id)) {
      const newStatus = { ...readStatus, [contact.id]: true };
      saveReadStatus(newStatus);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteContact({ variables: { id } });

    // Remove from read status
    const newStatus = { ...readStatus };
    delete newStatus[id];
    saveReadStatus(newStatus);
  };

  const toggleReadStatus = (id: string) => {
    const newStatus = { ...readStatus, [id]: !readStatus[id] };
    saveReadStatus(newStatus);

    // Update viewing contact if it's the same
    if (viewingContact?.id === id) {
      setViewingContact({ ...viewingContact });
    }
  };

  const markAllAsRead = () => {
    const contacts: Contact[] = data?.fetchAllContacts || [];
    const newStatus: ContactReadStatus = {};
    contacts.forEach((contact) => {
      newStatus[contact.id] = true;
    });
    saveReadStatus(newStatus);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setViewingContact(null);
  };

  return {
    // State
    searchTerm,
    statusFilter,
    viewingContact,
    isViewModalOpen,
    filteredContacts,
    loading,
    error,
    unreadCount,

    // Actions
    setSearchTerm,
    setStatusFilter,
    handleView,
    handleDelete,
    toggleReadStatus,
    markAllAsRead,
    closeViewModal,
    isRead,
  };
};
