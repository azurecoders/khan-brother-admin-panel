"use client";
import { useState, ChangeEvent } from "react";
import { Plus, Edit, Trash2, Search, Tag, Layers } from "lucide-react";

interface Category {
  id: number;
  title: string;
  description: string;
  type: "service" | "product" | "project" | "general";
  itemCount: number;
  createdAt: string;
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      title: "Electrical Equipment",
      description:
        "Industrial and commercial electrical components, panels, and distribution systems",
      type: "product",
      itemCount: 24,
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Solar Energy",
      description:
        "Solar panels, inverters, batteries, and complete renewable energy solutions",
      type: "service",
      itemCount: 18,
      createdAt: "2025-01-14",
    },
    {
      id: 3,
      title: "IT & Networking",
      description:
        "Network infrastructure, servers, cabling, and IT hardware equipment",
      type: "service",
      itemCount: 15,
      createdAt: "2025-01-13",
    },
    {
      id: 4,
      title: "Construction",
      description:
        "Civil works, structural engineering, and building construction services",
      type: "project",
      itemCount: 12,
      createdAt: "2025-01-12",
    },
    {
      id: 5,
      title: "CCTV & Security",
      description:
        "Surveillance systems, access control, and security infrastructure",
      type: "service",
      itemCount: 20,
      createdAt: "2025-01-11",
    },
    {
      id: 6,
      title: "Plumbing Materials",
      description: "Pipes, fittings, pumps, and water management systems",
      type: "product",
      itemCount: 16,
      createdAt: "2025-01-10",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "general" as "service" | "product" | "project" | "general",
  });

  // Category types for filter
  const categoryTypes = ["service", "product", "project", "general"];

  // Filter categories based on search and type
  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || category.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const newCategory: Category = {
      id: Date.now(),
      ...formData,
      itemCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCategories((prev) => [...prev, newCategory]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      description: category.description,
      type: category.type,
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...formData }
            : category
        )
      );
      resetForm();
    }
  };

  const handleDeleteCategory = (id: number) => {
    const category = categories.find((c) => c.id === id);
    if (category && category.itemCount > 0) {
      if (
        !confirm(
          `This category has ${category.itemCount} items. Are you sure you want to delete it?`
        )
      ) {
        return;
      }
    } else if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "general",
    });
    setEditingCategory(null);
    setIsAddModalOpen(false);
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "service":
        return "bg-blue-100 text-blue-800";
      case "product":
        return "bg-green-100 text-green-800";
      case "project":
        return "bg-purple-100 text-purple-800";
      case "general":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Categories</h1>
        <p className="text-gray-600 text-lg">Manage your website content</p>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-none">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            >
              <option value="all">All Types</option>
              {categoryTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Add Category Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Categories: {filteredCategories.length} | Total Items:{" "}
              {categories.reduce((sum, cat) => sum + cat.itemCount, 0)}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredCategories.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No categories found.{" "}
                    {searchTerm || typeFilter !== "all"
                      ? "Try adjusting your filters."
                      : "Create your first category to get started."}
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Category Info Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-[#F97316] rounded-lg flex items-center justify-center text-white font-bold">
                          <Tag size={20} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-gray-900 font-semibold">
                            {category.title}
                          </span>
                          <span className="text-gray-500 text-xs">
                            Created: {category.createdAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Description Column */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-md line-clamp-2">
                        {category.description}
                      </p>
                    </td>

                    {/* Type Column */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBadgeColor(
                          category.type
                        )}`}
                      >
                        {category.type.charAt(0).toUpperCase() +
                          category.type.slice(1)}
                      </span>
                    </td>

                    {/* Item Count Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Layers size={16} className="text-gray-400" />
                        <span className="text-gray-900 font-semibold">
                          {category.itemCount}
                        </span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditCategory(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit category"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete category"
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

      {/* Add/Edit Category Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
            </div>

            <form
              onSubmit={
                editingCategory ? handleUpdateCategory : handleAddCategory
              }
              className="p-6 space-y-6"
            >
              {/* Category Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  placeholder="e.g., Electrical Equipment"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
                  placeholder="Brief description of this category"
                />
              </div>

              {/* Category Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category Type *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="service">Service</option>
                  <option value="product">Product</option>
                  <option value="project">Project</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Select the type to use this category in specific sections
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
