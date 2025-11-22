"use client";
import { useState, ChangeEvent } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  image: string | null;
  category: string;
  status: "active" | "inactive";
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Electrical Solutions",
      description:
        "Comprehensive industrial, commercial, and residential electrical installations and maintenance services.",
      image: null,
      category: "Electrical",
      status: "active",
    },
    {
      id: 2,
      title: "Solar Energy Systems",
      description:
        "Turnkey solar solutions including on-grid, off-grid, and hybrid systems with net metering.",
      image: null,
      category: "Solar",
      status: "active",
    },
    {
      id: 3,
      title: "IT & Networking",
      description:
        "Advanced networking, structured cabling, server setups, and IT infrastructure solutions.",
      image: null,
      category: "IT & Networking",
      status: "active",
    },
    {
      id: 4,
      title: "Construction Services",
      description:
        "Civil works, interior renovation, and structural engineering for residential and commercial projects.",
      image: null,
      category: "Construction",
      status: "active",
    },
    {
      id: 5,
      title: "CCTV & Security",
      description:
        "State-of-the-art surveillance and access control systems for enhanced security and monitoring.",
      image: null,
      category: "CCTV & Security",
      status: "active",
    },
    {
      id: 6,
      title: "Mechanical & Plumbing",
      description:
        "Expert mechanical installations and plumbing system designs for modern infrastructure.",
      image: null,
      category: "Mechanical & Plumbing",
      status: "active",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    status: "active" as "active" | "inactive",
    image: null as string | null,
  });

  // Available categories
  const categories = [
    "Electrical",
    "Solar",
    "IT & Networking",
    "Construction",
    "CCTV & Security",
    "Mechanical & Plumbing",
    "Other",
  ];

  // Filter services based on search and filters
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || service.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    const newService: Service = {
      id: Date.now(),
      ...formData,
    };

    setServices((prev) => [...prev, newService]);
    setFormData({
      title: "",
      description: "",
      category: "",
      status: "active",
      image: null,
    });
    setIsAddModalOpen(false);
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      status: service.status,
      image: service.image,
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices((prev) =>
        prev.map((service) =>
          service.id === editingService.id
            ? { ...service, ...formData }
            : service
        )
      );
      setEditingService(null);
      setFormData({
        title: "",
        description: "",
        category: "",
        status: "active",
        image: null,
      });
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteService = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  const toggleServiceStatus = (id: number) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "active" ? "inactive" : "active",
            }
          : service
      )
    );
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      status: "active",
      image: null,
    });
    setEditingService(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Services</h1>
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
                placeholder="Search services..."
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

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Add Service Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add Service
          </button>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">All Services</h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Service Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No services found.{" "}
                    {searchTerm ||
                    categoryFilter !== "all" ||
                    statusFilter !== "all"
                      ? "Try adjusting your filters."
                      : "Create your first service to get started."}
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-[#1E40AF] to-[#EA580C] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                            {service.title.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900">
                            {service.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {service.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-md line-clamp-2">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {service.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleServiceStatus(service.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          service.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                        }`}
                      >
                        {service.status === "active" ? (
                          <>
                            <Eye size={12} className="mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff size={12} className="mr-1" />
                            Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit service"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete service"
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

      {/* Add/Edit Service Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingService ? "Edit Service" : "Add New Service"}
              </h2>
            </div>

            <form
              onSubmit={editingService ? handleUpdateService : handleAddService}
              className="p-6 space-y-6"
            >
              {/* Service Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  placeholder="Enter service title"
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
                  placeholder="Enter service description"
                />
              </div>

              {/* Category and Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Service Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="service-image"
                  />
                  <label
                    htmlFor="service-image"
                    className="cursor-pointer block"
                  >
                    {formData.image ? (
                      <div className="space-y-2">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-20 h-20 mx-auto rounded-lg object-cover"
                        />
                        <p className="text-sm text-gray-600">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto text-gray-400" size={32} />
                        <p className="text-sm font-medium text-gray-700">
                          Upload service image
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, SVG (Optional)
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {editingService ? "Update Service" : "Add Service"}
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

export default Services;
