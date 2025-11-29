import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_ADMINS,
  REGISTER_ADMIN,
  UPDATE_ADMIN,
  DELETE_ADMIN,
} from "@/graphql/auth";
import { Admin, AdminFormData, initialAdminFormData } from "@/types/admin";

export const useAdmins = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [formData, setFormData] = useState<AdminFormData>(initialAdminFormData);

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_ADMINS);

  const [registerAdmin, { loading: creating }] = useMutation(REGISTER_ADMIN, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error creating admin:", error);
      alert(error.message || "Failed to create admin. Please try again.");
    },
  });

  const [updateAdmin, { loading: updating }] = useMutation(UPDATE_ADMIN, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error updating admin:", error);
      alert(error.message || "Failed to update admin. Please try again.");
    },
  });

  const [deleteAdmin] = useMutation(DELETE_ADMIN, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting admin:", error);
      alert(error.message || "Failed to delete admin. Please try again.");
    },
  });

  // Filtered admins
  const filteredAdmins = useMemo(() => {
    const admins: Admin[] = data?.fetchAllAdmins || [];

    if (!searchTerm) return admins;

    return admins.filter(
      (admin) =>
        admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (admin: Admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "", // Don't prefill password
      role: admin.role,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteAdmin({ variables: { id } });
  };

  const handleToggleActive = async (admin: Admin) => {
    await updateAdmin({
      variables: {
        id: admin.id,
        isActive: !admin.isActive,
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingAdmin) {
        const variables: Record<string, any> = {
          id: editingAdmin.id,
          name: formData.name,
          email: formData.email,
          role: formData.role,
        };

        // Only include password if it's been changed
        if (formData.password) {
          variables.password = formData.password;
        }

        await updateAdmin({ variables });
      } else {
        if (!formData.password) {
          alert("Password is required for new admin");
          return;
        }

        await registerAdmin({
          variables: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    setFormData(initialAdminFormData);
    setEditingAdmin(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return {
    // State
    searchTerm,
    isModalOpen,
    editingAdmin,
    formData,
    filteredAdmins,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleEdit,
    handleDelete,
    handleToggleActive,
    handleSubmit,
  };
};
