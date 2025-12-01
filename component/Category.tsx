import { Edit, Plus, Search, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

// Types
interface Category {
  id: number;
  name: string;
  description?: string;
  itemCount?: number;
  createdAt?: string;
}

// GraphQL Client
const graphqlRequest = async (query: string, variables?: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  const result = await response.json();
  if (result.errors) throw new Error(result.errors[0].message);
  return result.data;
};

// API Service
const categoryAPI = {
  fetchAll: async (): Promise<Category[]> => {
    const data = await graphqlRequest(`
      query {
        fetchAllCategories {
          id
          name
        }
      }
    `);
    return data.fetchAllCategories;
  },

  create: async (name: string): Promise<Category> => {
    const data = await graphqlRequest(`
      mutation CreateCategory($name: String!) {
        createCategory(name: $name) {
          id
          name
        }
      }
    `, { name });
    return data.createCategory;
  },

  update: async (id: number, name: string): Promise<Category> => {
    const data = await graphqlRequest(`
      mutation UpdateCategory($id: ID!, $name: String) {
        updateCategory(id: $id, name: $name) {
          id
          name
        }
      }
    `, { id: id.toString(), name });
    return data.updateCategory;
  },

  delete: async (id: number): Promise<number> => {
    const data = await graphqlRequest(`
      mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }
    `, { id: id.toString() });
    return parseInt(data.deleteCategory);
  }
};

// Search Bar Component
const SearchBar = ({ searchTerm, onSearchChange }: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
      <div className="relative flex-1 sm:flex-none">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent w-full sm:w-64"
        />
      </div>
    </div>
  );
};

// Category Form Modal Component
const CategoryFormModal = ({ isOpen, category, onClose, onSubmit }: {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
}) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName("");
    }
  }, [category]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name });
    setName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            {category ? "Edit Category" : "Add New Category"}
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              placeholder="e.g., Electrical Equipment"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {category ? "Update Category" : "Add Category"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Category Table Row Component
const CategoryRow = ({ category, onEdit, onDelete }: {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-800 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
            <Tag size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-gray-900 font-semibold">{category.name}</span>
            {category.createdAt && (
              <span className="text-gray-500 text-xs">Created: {category.createdAt}</span>
            )}
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit category"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete category"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Category Component
const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryAPI.fetchAll();
      setCategories(data);
    } catch (err: any) {
      setError(err.message);
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddCategory = async (data: { name: string }) => {
    try {
      const newCategory = await categoryAPI.create(data.name);
      setCategories((prev) => [...prev, newCategory]);
      setIsModalOpen(false);
    } catch (err: any) {
      alert("Failed to create category: " + err.message);
    }
  };

  const handleUpdateCategory = async (data: { name: string }) => {
    if (!editingCategory) return;
    try {
      const updated = await categoryAPI.update(editingCategory.id, data.name);
      setCategories((prev) =>
        prev.map((cat) => (cat.id === updated.id ? updated : cat))
      );
      setIsModalOpen(false);
      setEditingCategory(null);
    } catch (err: any) {
      alert("Failed to update category: " + err.message);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await categoryAPI.delete(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err: any) {
      alert("Failed to delete category: " + err.message);
    }
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div className="space-y-6 max-w-7xl p-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600 text-lg">Manage your website content</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
          <p className="text-sm text-gray-600 mt-1">
            Total Categories: {filteredCategories.length}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Category Info</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {loading ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                    Loading categories...
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-8 text-center text-gray-500">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    onEdit={openEditModal}
                    onDelete={handleDeleteCategory}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        category={editingCategory}
        onClose={closeModal}
        onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
      />
    </div>
  );
};

export default CategoryManagement;
