import { ChangeEvent, useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  editingAdmin: any;
  formData: any;
  loading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const AdminModal = ({
  isOpen,
  editingAdmin,
  formData,
  loading,
  onClose,
  onSubmit,
  onInputChange,
}: AdminModalProps) => {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-6 py-4 text-white rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {editingAdmin ? "Edit Administrator" : "Create New Administrator"}
          </h2>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="e.g., Muhammad Khan"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-orange-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="admin@khanbrothers.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password{" "}
              {!editingAdmin && <span className="text-orange-600">*</span>}
              {editingAdmin && (
                <span className="text-gray-500">
                  {" "}
                  (Leave blank to keep current)
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={onInputChange}
                required={!editingAdmin}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder={
                  editingAdmin ? "Enter new password" : "Minimum 6 characters"
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Saving..." : editingAdmin ? "Update" : "Create"}{" "}
              Administrator
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
