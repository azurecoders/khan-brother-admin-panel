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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] px-8 py-6 text-white flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {editingProject ? "Edit Project" : "Add New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Title <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., Karachi Industrial Complex"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Location <span className="text-orange-600">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                placeholder="e.g., Karachi, Pakistan"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Category <span className="text-orange-600">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={onInputChange}
              required
              disabled={categoriesLoading}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all disabled:opacity-50"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description <span className="text-orange-600">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onInputChange}
              required
              rows={6}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all resize-none"
              placeholder="Describe the scope, technologies used, and impact..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Project Image{" "}
              {!editingProject && <span className="text-orange-600">*</span>}
            </label>
            <div className="flex gap-4 mb-6">
              <button
                type="button"
                onClick={() => onImageInputTypeChange("file")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.imageInputType === "file"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <ImageIcon className="inline mr-2" size={20} /> Upload File
              </button>
              <button
                type="button"
                onClick={() => onImageInputTypeChange("url")}
                className={`flex-1 py-4 rounded-2xl border-2 font-medium transition-all ${
                  formData.imageInputType === "url"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <Link className="inline mr-2" size={20} /> Enter URL
              </button>
            </div>

            {formData.imagePreview && (
              <div className="mb-6">
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-full max-w-2xl mx-auto h-80 rounded-3xl object-cover shadow-2xl"
                />
              </div>
            )}

            {formData.imageInputType === "file" && (
              <div className="border-2 border-dashed border-gray-300 rounded-3xl p-12 text-center hover:border-orange-500 transition-all cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageChange}
                  className="hidden"
                  id="project-image-upload"
                />
                <label
                  htmlFor="project-image-upload"
                  className="cursor-pointer"
                >
                  <Upload size={56} className="mx-auto text-gray-400 mb-4" />
                  <p className="font-bold text-gray-700">
                    Drop image here or click to upload
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    High-resolution recommended • PNG, JPG, WebP
                  </p>
                </label>
              </div>
            )}

            {formData.imageInputType === "url" && (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    onKeyDown={handleUrlKeyDown}
                    placeholder="https://example.com/project.jpg"
                    className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-6 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:scale-105 disabled:opacity-70"
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
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-5 rounded-2xl transition-all"
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
