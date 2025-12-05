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
      `mutation CreateCategory($name: String!) {
        createCategory(name: $name) {
          id
          name
        }
      }`,
      { name }
    );
    return data.createCategory;
  },
  update: async (id: number, name: string): Promise<Category> => {
    const data = await graphqlRequest(
      `mutation UpdateCategory($id: ID!, $name: String) {
        updateCategory(id: $id, name: $name) {
          id
          name
        }
      }`,
      { id: id.toString(), name }
    );
    return data.updateCategory;
  },
  delete: async (id: number): Promise<number> => {
    const data = await graphqlRequest(
      `mutation DeleteCategory($id: ID!) {
        deleteCategory(id: $id)
      }`,
      { id: id.toString() }
    );
    return parseInt(data.deleteCategory);
  },
};

// Compact Search Bar
const SearchBar = ({
  searchTerm,
  onSearchChange,
}: {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}) => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm"
      />
    </div>
  );
};

// Compact Modal
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-6 py-4 text-white rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {category ? "Edit Category" : "Add New Category"}
          </h2>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name <span className="text-orange-600">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="e.g., Electrical Systems"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              {category ? "Update" : "Add"} Category
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Compact Row
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
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
          <Tag size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {category.name}
          </h3>
          {category.createdAt && (
            <p className="text-xs text-gray-500">
              {new Date(category.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit size={16} />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

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
      setError(err.message || "Failed to load categories");
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
    if (!confirm("Delete this category?")) return;
    try {
      await categoryAPI.delete(id);
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err: any) {
      alert("Failed to delete: " + err.message);
    }
  };

  const openEditModal = (cat: Category) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Categories Management
          </h1>
          <p className="text-gray-600">Organize your content categories</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Filters Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Plus size={20} />
              Add Category
            </button>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-bold text-gray-900">All Categories</h2>
            <p className="text-sm text-gray-600">
              Total:{" "}
              <span className="font-semibold text-orange-600">
                {filteredCategories.length}
              </span>
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {loading ? (
              <div className="p-12 text-center text-gray-500">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-orange-500 border-t-transparent"></div>
                <p className="mt-4">Loading categories...</p>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <p className="text-lg">No categories found</p>
              </div>
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
          </div>
        </div>

        {/* Modal */}
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
