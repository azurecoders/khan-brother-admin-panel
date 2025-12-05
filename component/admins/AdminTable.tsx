import { Edit, Trash2, Shield, ShieldOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface AdminTableProps {
  admins: any[];
  loading: boolean;
  onEdit: (admin: any) => void;
  onDelete: (id: string) => void;
  onToggleActive: (admin: any) => void;
}

const AdminTable = ({
  admins,
  loading,
  onEdit,
  onDelete,
  onToggleActive,
}: AdminTableProps) => {
  const { admin: currentAdmin } = useAuth();

  const handleDelete = (id: string) => {
    if (confirm("Delete this administrator?")) onDelete(id);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading administrators...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-lg font-bold text-gray-900">All Administrators</h2>
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-semibold text-orange-600">{admins.length}</span>{" "}
          accounts
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {admins.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <p className="text-lg">No administrators found</p>
          </div>
        ) : (
          admins.map((admin) => {
            const isCurrentUser = currentAdmin?.id === admin.id;

            return (
              <div key={admin.id} className="p-5 hover:bg-gray-50">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                        isCurrentUser
                          ? "bg-gradient-to-br from-orange-400 to-orange-600"
                          : "bg-gradient-to-br from-[#1E40AF] to-blue-600"
                      }`}
                    >
                      <span className="text-white font-bold text-xl">
                        {admin.name.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-gray-900">
                          {admin.name}
                        </h3>
                        {isCurrentUser && (
                          <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                            You
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{admin.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Created {new Date(admin.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => onToggleActive(admin)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                        admin.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {admin.isActive ? (
                        <Shield size={16} />
                      ) : (
                        <ShieldOff size={16} />
                      )}
                      {admin.isActive ? "Active" : "Inactive"}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(admin)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(admin.id)}
                        disabled={isCurrentUser}
                        className={`p-2 rounded-lg ${
                          isCurrentUser
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-red-600 hover:bg-red-50"
                        }`}
                      >
                        <Trash2 size={16} />
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
