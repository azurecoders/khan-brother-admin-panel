"use client";

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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    }
  );
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
    const data = await graphqlRequest(
      `
      mutation CreateCategory($name: String!) {
        createCategory(name: $name) {
          id
          name
        }
      }
    `,
      { name }
    );
    return data.createCategory;
  },
  update: async (id: number, name: string): Promise<Category> => {
    const data = await graphqlRequest(
      `
      mutation UpdateCategory($id: ID!, $name: String) {
        updateCategory(id: $id, name: $name) {
          id
          name
        }
      }
    `,
      { id: id.toString(), name }
    );
    return data.updateCategory;
  },
  delete: async (id: number): Promise<number> => {
    const data = await graphqlRequest(
      `
      mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }
    `,
      { id: id.toString() }
    );
    return parseInt(data.deleteCategory);
  },
};

// Premium Search Bar
const SearchBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-5 py-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400"
      />
    </div>
  );
};

// Premium Modal
const CategoryFormModal = ({
  isOpen,
  category,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  category: Category | null;
  onClose: () => void;
  onSubmit: (data: { name: string }) => void;
}) => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (category) setName(category.name);
    else setName("");
  }, [category, isOpen]);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit({ name });
    setName("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white">
          <h2 className="text-2xl font-bold">
            {category ? "Edit Category" : "Add New Category"}
          </h2>
        </div>
        <div className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category Title <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 text-gray-800"
              placeholder="e.g., Electrical Equipment"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {category ? "Update Category" : "Add Category"}
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-4 rounded-2xl transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Premium Table Row
const CategoryRow = ({
  category,
  onEdit,
  onDelete,
}: {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
}) => {
  return (
    <tr className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-blue-50/50 transition-all duration-300 border-b border-gray-100">
      <td className="px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Tag size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{category.name}</h3>
            {category.createdAt && (
              <p className="text-sm text-gray-500">
                Created: {new Date(category.createdAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
      </td>
      <td className="px-6 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(category)}
            className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            title="Edit"
          >
            <Edit
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg group"
            title="Delete"
          >
            <Trash2
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

// Main Component
const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCategory = async (data: { name: string }) => {
    try {
      const newCat = await categoryAPI.create(data.name);
      setCategories((prev) => [...prev, newCat]);
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
        prev.map((c) => (c.id === updated.id ? updated : c))
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
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert("Failed to delete category: " + err.message);
    }
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Categories Management
          </h1>
          <p className="text-xl text-gray-600">
            Organize and manage your content categories
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl shadow-md">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6 md:p-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center gap-3 whitespace-nowrap"
            >
              <Plus size={24} />
              Add New Category
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
            <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
            <p className="text-gray-600 mt-1">
              Total:{" "}
              <span className="font-bold text-orange-600">
                {filteredCategories.length}
              </span>{" "}
              categories
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#1E40AF]/10 to-orange-500/10">
                <tr>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <tr key={i}>
                        <td colSpan={2} className="px-8 py-10">
                          <div className="bg-gray-200 animate-pulse h-16 rounded-2xl"></div>
                        </td>
                      </tr>
                    ))
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="text-center py-20 text-gray-500">
                      <div className="text-6xl mb-4">📂</div>
                      <p className="text-xl">No categories found</p>
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
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
        />
      </div>
    </div>
  );
};

export default CategoryManagement;
