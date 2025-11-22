"use client";
import { useState, ChangeEvent } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Package,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  mainImage: string | null;
  additionalImages: string[];
  brand?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Solar Panel 550W",
      category: "Solar Equipment",
      description:
        "High-efficiency monocrystalline solar panel with 25-year performance warranty",
      price: "PKR 28,000",
      mainImage: null,
      additionalImages: [],
      brand: "JA Solar",
    },
    {
      id: 2,
      name: "3-Phase Distribution Board",
      category: "Electrical Equipment",
      description:
        "Complete MCB distribution panel for commercial and industrial applications",
      price: "PKR 45,000",
      mainImage: null,
      additionalImages: [],
      brand: "Schneider Electric",
    },
    {
      id: 3,
      name: "CAT6 Ethernet Cable (305m)",
      category: "Networking Equipment",
      description:
        "Professional grade network cable for high-speed LAN installation",
      price: "PKR 18,500",
      mainImage: null,
      additionalImages: [],
      brand: "D-Link",
    },
    {
      id: 4,
      name: "IP CCTV Camera 4MP",
      category: "Security Equipment",
      description:
        "Night vision IP camera with motion detection and weather resistance",
      price: "PKR 12,500",
      mainImage: null,
      additionalImages: [],
      brand: "Hikvision",
    },
    {
      id: 5,
      name: "Solar Inverter 5KW",
      category: "Solar Equipment",
      description:
        "Hybrid solar inverter with battery backup and grid-tie functionality",
      price: "PKR 85,000",
      mainImage: null,
      additionalImages: [],
      brand: "Growatt",
    },
    {
      id: 6,
      name: "Conduit Pipes (3/4 inch)",
      category: "Electrical Equipment",
      description:
        "UV resistant PVC conduit pipes for electrical wiring protection",
      price: "PKR 450",
      mainImage: null,
      additionalImages: [],
      brand: "Pak Pipe",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    mainImage: null as string | null,
    additionalImages: [] as string[],
    brand: "",
  });

  // Available categories
  const categories = [
    "Solar Equipment",
    "Electrical Equipment",
    "Networking Equipment",
    "Security Equipment",
    "Construction Materials",
    "Plumbing Equipment",
    "Other",
  ];

  // Filter products based on search and filters
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          mainImage: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];

      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);

            // When all images are loaded, update form data
            if (newImages.length === files.length) {
              setFormData((prev) => ({
                ...prev,
                additionalImages: [...prev.additionalImages, ...newImages],
              }));
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      additionalImages: prev.additionalImages.filter((_, i) => i !== index),
    }));
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      ...formData,
    };

    setProducts((prev) => [...prev, newProduct]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      mainImage: product.mainImage,
      additionalImages: product.additionalImages,
      brand: product.brand || "",
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...formData }
            : product
        )
      );
      resetForm();
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((product) => product.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      price: "",
      mainImage: null,
      additionalImages: [],
      brand: "",
    });
    setEditingProduct(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Products</h1>
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
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Add Product Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Material Supply Catalog
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total Products: {filteredProducts.length} | Categories:{" "}
              {new Set(filteredProducts.map((p) => p.category)).size}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No products found.{" "}
                    {searchTerm || categoryFilter !== "all"
                      ? "Try adjusting your filters."
                      : "Create your first product to get started."}
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {product.mainImage ? (
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#EA580C] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            <Package size={20} />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {product.name}
                          </div>
                          {product.brand && (
                            <div className="text-sm text-gray-500">
                              {product.brand}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-md line-clamp-2">
                        {product.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {product.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit product"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete product"
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

      {/* Add/Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
            </div>

            <form
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              className="p-6 space-y-6"
            >
              {/* Product Name and Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Brand and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Brand
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    placeholder="Enter brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    placeholder="e.g., PKR 25,000"
                  />
                </div>
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
                  placeholder="Enter product description"
                />
              </div>

              {/* Main Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Main Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMainImageUpload}
                    className="hidden"
                    id="main-image"
                  />
                  <label htmlFor="main-image" className="cursor-pointer block">
                    {formData.mainImage ? (
                      <div className="space-y-2">
                        <img
                          src={formData.mainImage}
                          alt="Preview"
                          className="w-32 h-32 mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-gray-600">
                          Click to change main image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto text-gray-400" size={32} />
                        <p className="text-sm font-medium text-gray-700">
                          Upload main product image
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG, WebP</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Additional Images Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Additional Images
                </label>

                {/* Additional Images Preview Grid */}
                {formData.additionalImages.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {formData.additionalImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Additional ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeAdditionalImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAdditionalImagesUpload}
                    multiple
                    className="hidden"
                    id="additional-images"
                  />
                  <label
                    htmlFor="additional-images"
                    className="cursor-pointer block"
                  >
                    <div className="space-y-2">
                      <Upload className="mx-auto text-gray-400" size={32} />
                      <p className="text-sm font-medium text-gray-700">
                        Upload additional product images
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, WebP (Multiple files allowed)
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {editingProduct ? "Update Product" : "Add Product"}
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

export default Products;
