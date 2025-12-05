import { ChangeEvent, useState } from "react";
import { Upload, X, Link } from "lucide-react";
import { Project, ProjectFormData } from "@/types/project";

interface Category {
  id: string;
  name: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  editingProject: Project | null;
  formData: ProjectFormData;
  loading: boolean;
  categories: Category[];
  categoriesLoading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onInputChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onImageUrlChange: (url: string) => void;
  onImageInputTypeChange: (type: "file" | "url") => void;
}

const ProjectModal = ({
  isOpen,
  editingProject,
  formData,
  loading,
  categories,
  categoriesLoading,
  onClose,
  onSubmit,
  onInputChange,
  onImageChange,
  onImageUrlChange,
  onImageInputTypeChange,
}: ProjectModalProps) => {
  const [urlInput, setUrlInput] = useState("");

  if (!isOpen) return null;

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      try {
        new URL(urlInput);
        onImageUrlChange(urlInput.trim());
        setUrlInput("");
      } catch {
        alert("Please enter a valid image URL");
      }
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleApplyUrl();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-900 px-6 py-4 rounded-t-xl text-white flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Title & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Karachi Industrial Complex"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Karachi, Pakistan"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
              disabled={categoriesLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 disabled:opacity-50"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={5}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
              placeholder="Describe the scope, technologies used, and impact..."
            />
          </div>

          {/* Project Image - FIXED: Removed redundant Upload File button */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Project Image{" "}
              {!editingProject && <span className="text-red-500">*</span>}
            </label>

            {/* Image Selection Tabs */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                type="button"
                onClick={() => onImageInputTypeChange("file")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.imageInputType === "file"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Upload Image
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange("url")}
                className={`px-4 py-2 font-medium text-sm transition-colors ${
                  formData.imageInputType === "url"
                    ? "border-b-2 border-orange-500 text-orange-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Enter URL
              </button>
            </div>

            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="mb-4">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full h-48 rounded-lg object-cover border border-gray-200"
                />
              </div>
            )}

            {/* File Upload Section */}
            {formData.imageInputType === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                  id="project-image-upload"
                />
                <label
                  htmlFor="project-image-upload"
                  className="cursor-pointer block"
                >
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="font-medium text-gray-700">
                    Drop image here or click to upload
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    High-resolution recommended • PNG, JPG, WebP
                  </p>
                </label>
              </div>
            )}

            {/* URL Input Section */}
            {formData.imageInputType === "url" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://example.com/project.jpg"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter image URL and click Apply
                </p>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : editingProject
                ? "Update Project"
                : "Create Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
