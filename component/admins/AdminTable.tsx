import {
  Edit,
  Trash2,
  UserCircle,
  Shield,
  ShieldOff,
  Mail,
  Calendar,
} from "lucide-react";
import { Admin } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

interface AdminTableProps {
  admins: Admin[];
  loading: boolean;
  searchTerm: string;
  onEdit: (admin: Admin) => void;
  onDelete: (id: string) => void;
  onToggleActive: (admin: Admin) => void;
}

const AdminTable = ({
  admins,
  loading,
  searchTerm,
  onEdit,
  onDelete,
  onToggleActive,
}: AdminTableProps) => {
  const { admin: currentAdmin } = useAuth();
  const [expandedAdminId, setExpandedAdminId] = useState<string | null>(null);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete administrator "${name}"?`)) {
      onDelete(id);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAdminId(expandedAdminId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-3 border-orange-500 border-t-transparent"></div>
          <div>
            <p className="text-gray-700 font-medium">
              Loading administrators...
            </p>
            <p className="text-sm text-gray-500 mt-1">Please wait</p>
          </div>
        </div>
      </div>
    );
  }

  if (admins.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="py-12">
          <div className="text-5xl mb-4">👤</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No administrators found
          </h3>
          <p className="text-gray-600">
            {searchTerm
              ? "Try a different search term"
              : "Start by adding your first administrator"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 md:px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-orange-50/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              All Administrators
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total:{" "}
              <span className="font-bold text-orange-600">{admins.length}</span>{" "}
              accounts
            </p>
          </div>
        </div>
      </div>

      {/* Admin Cards - Mobile Stack, Desktop Table */}
      <div className="divide-y divide-gray-100/50">
        {admins.map((admin) => {
          const isCurrentUser = currentAdmin?.id === admin.id;
          const isExpanded = expandedAdminId === admin.id;

          return (
            <div
              key={admin.id}
              className={`p-4 md:p-6 transition-all duration-300 ${
                isCurrentUser
                  ? "bg-gradient-to-r from-blue-50/30 to-transparent border-l-4 border-orange-500"
                  : "hover:bg-gray-50/50"
              }`}
            >
              {/* Mobile View - Card Layout */}
              <div className="lg:hidden">
                {/* Clickable Header */}
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleExpand(admin.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm ${
                        isCurrentUser
                          ? "bg-gradient-to-br from-orange-400 to-orange-600"
                          : "bg-gradient-to-br from-blue-500 to-blue-600"
                      }`}
                    >
                      <UserCircle size={24} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 text-base truncate max-w-[150px]">
                          {admin.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs font-bold rounded-full whitespace-nowrap">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 truncate max-w-[180px]">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        admin.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.isActive ? "Active" : "Inactive"}
                    </span>
                    <div
                      className={`transform transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-4 pl-15 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail size={14} />
                          <span>Email</span>
                        </div>
                        <p className="text-gray-900 font-medium text-sm truncate">
                          {admin.email}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar size={14} />
                          <span>Created</span>
                        </div>
                        <p className="text-gray-900 font-medium text-sm">
                          {new Date(admin.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <button
                        onClick={() => onEdit(admin)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-all text-sm font-medium"
                      >
                        <Edit size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id, admin.name)}
                        disabled={isCurrentUser}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-all text-sm font-medium ${
                          isCurrentUser
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-50 hover:bg-red-100 text-red-700"
                        }`}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop View - Table Layout */}
              <div className="hidden lg:grid grid-cols-12 items-center gap-4">
                {/* Avatar & Name */}
                <div className="col-span-4 flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                      isCurrentUser
                        ? "bg-gradient-to-br from-orange-400 to-orange-600"
                        : "bg-gradient-to-br from-blue-500 to-blue-600"
                    }`}
                  >
                    <UserCircle size={28} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {admin.name}
                      </h3>
                      {isCurrentUser && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-sm font-bold rounded-full">
                          YOU
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 truncate">{admin.email}</p>
                  </div>
                </div>

                {/* Created Date */}
                <div className="col-span-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-sm">
                      {new Date(admin.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Status */}
                <div className="col-span-3">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
                      admin.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {admin.isActive ? (
                      <Shield size={16} className="text-green-600" />
                    ) : (
                      <ShieldOff size={16} className="text-red-600" />
                    )}
                    {admin.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(admin)}
                    className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl transition-all shadow-sm hover:shadow-md group"
                    title="Edit"
                  >
                    <Edit
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id, admin.name)}
                    disabled={isCurrentUser}
                    className={`p-2.5 rounded-xl transition-all shadow-sm hover:shadow-md group ${
                      isCurrentUser
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 hover:bg-red-100 text-red-700"
                    }`}
                    title={isCurrentUser ? "Cannot delete yourself" : "Delete"}
                  >
                    <Trash2
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State for Search */}
      {searchTerm && admins.length === 0 && (
        <div className="p-8 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            No results for "{searchTerm}"
          </h3>
          <p className="text-gray-600">Try adjusting your search term</p>
        </div>
      )}

      {/* Footer Stats */}
      <div className="px-4 md:px-6 py-4 border-t border-gray-100 bg-gray-50/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">
                Active:{" "}
                <span className="font-bold">
                  {admins.filter((a) => a.isActive).length}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-700">
                Inactive:{" "}
                <span className="font-bold">
                  {admins.filter((a) => !a.isActive).length}
                </span>
              </span>
            </div>
          </div>
          <div className="text-gray-600">
            Showing {admins.length} of {admins.length} administrators
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
