"use client";
import { useState, ChangeEvent } from "react";
import { Plus, Edit, Trash2, Search, Star } from "lucide-react";

interface Testimonial {
  id: number;
  clientName: string;
  companyName: string;
  testimonialText: string;
  rating: number;
  approved: boolean;
}

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: 1,
      clientName: "Muhammad Tariq",
      companyName: "ABC Textiles Ltd.",
      testimonialText:
        "Exceptional electrical work! Khan Brothers delivered our factory wiring project on time with outstanding quality. Their team demonstrated remarkable professionalism and technical expertise throughout the entire process.",
      rating: 5,
      approved: true,
    },
    {
      id: 2,
      clientName: "Sarah Ahmed",
      companyName: "Green Energy Solutions",
      testimonialText:
        "Professional solar installation service. Their team's technical expertise and dedication were impressive. The project was completed ahead of schedule with excellent attention to detail and safety protocols.",
      rating: 5,
      approved: true,
    },
    {
      id: 3,
      clientName: "Imran Malik",
      companyName: "Pak Construction Co.",
      testimonialText:
        "Reliable and innovative solutions. Their networking and CCTV installation exceeded our expectations. The after-sales support and maintenance services have been consistently excellent.",
      rating: 5,
      approved: true,
    },
    {
      id: 4,
      clientName: "Fatima Khan",
      companyName: "Metro Mall Karachi",
      testimonialText:
        "Outstanding construction services for our commercial complex. Khan Brothers handled all electrical and IT infrastructure with precision. Highly recommended for large-scale projects.",
      rating: 4,
      approved: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [approvalFilter, setApprovalFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);

  const [formData, setFormData] = useState({
    clientName: "",
    companyName: "",
    testimonialText: "",
    rating: 5,
    approved: true,
  });

  // Filter testimonials based on search and approval status
  const filteredTestimonials = testimonials.filter((testimonial) => {
    const matchesSearch =
      testimonial.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.companyName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      testimonial.testimonialText
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesApproval =
      approvalFilter === "all" ||
      (approvalFilter === "approved" && testimonial.approved) ||
      (approvalFilter === "pending" && !testimonial.approved);

    return matchesSearch && matchesApproval;
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "rating") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const newTestimonial: Testimonial = {
      id: Date.now(),
      ...formData,
    };

    setTestimonials((prev) => [...prev, newTestimonial]);
    resetForm();
    setIsAddModalOpen(false);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName,
      companyName: testimonial.companyName,
      testimonialText: testimonial.testimonialText,
      rating: testimonial.rating,
      approved: testimonial.approved,
    });
    setIsAddModalOpen(true);
  };

  const handleUpdateTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTestimonial) {
      setTestimonials((prev) =>
        prev.map((testimonial) =>
          testimonial.id === editingTestimonial.id
            ? { ...testimonial, ...formData }
            : testimonial
        )
      );
      resetForm();
    }
  };

  const handleDeleteTestimonial = (id: number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials((prev) =>
        prev.filter((testimonial) => testimonial.id !== id)
      );
    }
  };

  const toggleApprovalStatus = (id: number) => {
    setTestimonials((prev) =>
      prev.map((testimonial) =>
        testimonial.id === id
          ? { ...testimonial, approved: !testimonial.approved }
          : testimonial
      )
    );
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      companyName: "",
      testimonialText: "",
      rating: 5,
      approved: true,
    });
    setEditingTestimonial(null);
    setIsAddModalOpen(false);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating
                ? "fill-yellow-500 text-yellow-500"
                : "fill-gray-300 text-gray-300"
            }
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Testimonials</h1>
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
                placeholder="Search testimonials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent w-full sm:w-64"
              />
            </div>

            {/* Approval Filter */}
            <select
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
            >
              <option value="all">All Testimonials</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Add Testimonial Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <Plus size={20} />
            Add New
          </button>
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Client Testimonials
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Total: {filteredTestimonials.length} | Approved:{" "}
              {testimonials.filter((t) => t.approved).length}
            </p>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Client Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Testimonial
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Rating
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
              {filteredTestimonials.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No testimonials found.{" "}
                    {searchTerm || approvalFilter !== "all"
                      ? "Try adjusting your filters."
                      : "Create your first testimonial to get started."}
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr
                    key={testimonial.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    {/* Client Info Column */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900 font-semibold">
                          {testimonial.clientName}
                        </span>
                        <span className="text-gray-600 text-sm">
                          {testimonial.companyName}
                        </span>
                      </div>
                    </td>

                    {/* Testimonial Column */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-700 max-w-md line-clamp-2">
                        {testimonial.testimonialText}
                      </p>
                    </td>

                    {/* Rating Column */}
                    <td className="px-6 py-4">
                      {renderStars(testimonial.rating)}
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleApprovalStatus(testimonial.id)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          testimonial.approved
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        }`}
                      >
                        {testimonial.approved ? "✓ Approved" : "⏳ Pending"}
                      </button>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditTestimonial(testimonial)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit testimonial"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteTestimonial(testimonial.id)
                          }
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete testimonial"
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

      {/* Add/Edit Testimonial Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTestimonial
                  ? "Edit Testimonial"
                  : "Add New Testimonial"}
              </h2>
            </div>

            <form
              onSubmit={
                editingTestimonial
                  ? handleUpdateTestimonial
                  : handleAddTestimonial
              }
              className="p-6 space-y-6"
            >
              {/* Client Name and Company Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Client Name *
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    placeholder="Enter client name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              {/* Testimonial Text */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Testimonial Text *
                </label>
                <textarea
                  name="testimonialText"
                  value={formData.testimonialText}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
                  placeholder="Enter client testimonial"
                />
              </div>

              {/* Rating and Approval Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                  >
                    <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                    <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                    <option value={3}>⭐⭐⭐ (3 Stars)</option>
                    <option value={2}>⭐⭐ (2 Stars)</option>
                    <option value={1}>⭐ (1 Star)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Approval Status
                  </label>
                  <div className="flex items-center h-[42px]">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="approved"
                        checked={formData.approved}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-[#1E40AF] border-gray-300 rounded focus:ring-2 focus:ring-[#1E40AF]"
                      />
                      <span className="text-sm text-gray-700 font-medium">
                        Approve this testimonial
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {editingTestimonial
                    ? "Update Testimonial"
                    : "Add Testimonial"}
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

export default Testimonials;
