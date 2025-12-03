// components/projects/ProjectModal.tsx
import { ChangeEvent, useState } from "react";
import { Upload, X, Link, ImageIcon } from "lucide-react";
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
  onImageInputTypeChange: (type: 'file' | 'url') => void;
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

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      try {
        new URL(urlInput);
        onImageUrlChange(urlInput.trim());
        setUrlInput("");
      } catch {
        alert("Please enter a valid URL");
      }
    }
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUrlApply();
    }
  };

  const isExistingImage = (preview: string) => {
    return !preview.startsWith("blob:") && editingProject?.imageUrl === preview;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              placeholder="Enter project title"
            />
          </div>

          {/* Category and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onInputChange}
                required
                disabled={categoriesLoading}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Select Category</option>
                {categoriesLoading ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  categories?.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                placeholder="Enter project location"
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
              onChange={onInputChange}
              required
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
              placeholder="Enter project description"
            />
          </div>

          {/* Image Section */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Project Image {!editingProject && "*"}
              {editingProject && (
                <span className="text-gray-500 font-normal">
                  {" "}
                  (Leave empty to keep current)
                </span>
              )}
            </label>

            {/* Toggle Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => onImageInputTypeChange('file')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.imageInputType === 'file'
                  ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <ImageIcon size={18} />
                Upload File
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange('url')}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-colors ${formData.imageInputType === 'url'
                  ? 'border-[#1E40AF] bg-blue-50 text-[#1E40AF]'
                  : 'border-gray-300 hover:border-gray-400 text-gray-600'
                  }`}
              >
                <Link size={18} />
                Enter URL
              </button>
            </div>

            {/* Image Preview */}
            {formData.imagePreview && (
              <div className="mb-4 relative">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full max-w-xs mx-auto h-40 object-cover rounded-lg border border-gray-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Error';
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  {isExistingImage(formData.imagePreview) && (
                    <span className="bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded">
                      Current
                    </span>
                  )}
                  {formData.imagePreview.startsWith("blob:") && (
                    <span className="bg-purple-500 text-white text-xs px-1.5 py-0.5 rounded">
                      New
                    </span>
                  )}
                  {formData.imageUrl && !formData.imagePreview.startsWith("blob:") && !isExistingImage(formData.imagePreview) && (
                    <span className="bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">
                      URL
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* File Upload Area */}
            {formData.imageInputType === 'file' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#1E40AF] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                  id="project-image"
                />
                <label htmlFor="project-image" className="cursor-pointer block">
                  <div className="space-y-2">
                    <Upload className="mx-auto text-gray-400" size={32} />
                    <p className="text-sm font-medium text-gray-700">
                      {formData.imagePreview ? "Click to change image" : "Upload project image"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, WebP</p>
                  </div>
                </label>
              </div>
            )}

            {/* URL Input Area */}
            {formData.imageInputType === 'url' && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Link size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      onKeyDown={handleUrlKeyDown}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleUrlApply}
                    className="px-4 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Enter image URL and click Apply or press Enter
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {editingProject ? "Updating..." : "Creating..."}
                </>
              ) : editingProject ? (
                "Update Project"
              ) : (
                "Add Project"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
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
