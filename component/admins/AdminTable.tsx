import { Edit, Trash2, UserCircle, Shield, ShieldOff } from "lucide-react";
import { Admin } from "@/types/admin";
import { useAuth } from "@/context/AuthContext";

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

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      onDelete(id);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E40AF]"></div>
          <span className="ml-3 text-gray-600">Loading admins...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">All Administrators</h2>
        <p className="text-sm text-gray-600 mt-1">Total: {admins.length}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Admin
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Created
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {admins.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No admins found.{" "}
                  {searchTerm
                    ? "Try adjusting your search."
                    : "Create your first admin to get started."}
                </td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr
                  key={admin.id}
                  className={`hover:bg-gray-50 transition-colors ${currentAdmin?.id === admin.id ? "bg-blue-50/50" : ""
                    }`}
                >
                  {/* Admin Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-[#EA580C] rounded-full flex items-center justify-center text-white">
                        <UserCircle size={20} />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold">
                          {admin.name}
                          {currentAdmin?.id === admin.id && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {admin.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                      {admin.role.replace("_", " ")}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleActive(admin)}
                      disabled={currentAdmin?.id === admin.id}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-colors ${admin.isActive
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                        } ${currentAdmin?.id === admin.id
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                        }`}
                    >
                      {admin.isActive ? (
                        <>
                          <Shield size={12} />
                          Active
                        </>
                      ) : (
                        <>
                          <ShieldOff size={12} />
                          Inactive
                        </>
                      )}
                    </button>
                  </td>

                  {/* Created Date */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {formatDate(admin.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(admin)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit admin"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={currentAdmin?.id === admin.id}
                        className={`p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors ${currentAdmin?.id === admin.id
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                          }`}
                        title={
                          currentAdmin?.id === admin.id
                            ? "Cannot delete yourself"
                            : "Delete admin"
                        }
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
  );
};

export default AdminTable;
