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
    if (confirm("Are you sure you want to delete this administrator?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">
            Loading administrators...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">All Administrators</h2>
        <p className="text-gray-600 mt-1">
          Total:{" "}
          <span className="font-bold text-orange-600">{admins.length}</span>{" "}
          accounts
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {admins.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <div className="text-6xl mb-4">No administrators found</div>
            <p className="text-xl">Start by adding your first admin</p>
          </div>
        ) : (
          admins.map((admin) => {
            const isCurrentUser = currentAdmin?.id === admin.id;
            return (
              <div
                key={admin.id}
                className={`p-8 hover:bg-gradient-to-r hover:from-orange-50/30 hover:to-blue-50/30 transition-all duration-300 ${
                  isCurrentUser
                    ? "bg-blue-50/20 border-l-4 border-orange-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div
                      className={`w-20 h-20 rounded-full flex items-center justify-center shadow-xl ${
                        isCurrentUser
                          ? "bg-gradient-to-br from-orange-400 to-orange-600"
                          : "bg-gradient-to-br from-[#1E40AF] to-blue-600"
                      }`}
                    >
                      <UserCircle size={48} className="text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {admin.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-lg text-gray-600">{admin.email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Created {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-full text-lg font-bold ${
                          admin.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {admin.isActive ? (
                          <Shield size={22} />
                        ) : (
                          <ShieldOff size={22} />
                        )}
                        {admin.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onEdit(admin)}
                        className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                      >
                        <Edit
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={isCurrentUser}
                        className={`p-3 rounded-xl transition-all shadow-md hover:shadow-lg group ${
                          isCurrentUser
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-red-50 hover:bg-red-100 text-red-600"
                        }`}
                      >
                        <Trash2
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default AdminTable;
