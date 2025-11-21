import { AlertCircle, Eye, Plus, Trash2, Upload } from 'lucide-react';
import { useState, ChangeEvent, FormEvent } from 'react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string | null;
}

interface FormData {
  title: string;
  description: string;
  image: string | null;
}

interface Errors {
  title?: string;
  description?: string;
  image?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    image: null
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, image: event.target?.result as string }));
        if (errors.image) {
          setErrors(prev => ({ ...prev, image: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.title.trim()) newErrors.title = 'Project title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.image) newErrors.image = 'Project image is required';
    return newErrors;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProjects(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ title: '', description: '', image: null });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(project => project.id !== id));
    setSelectedProject(null);
  };

  const truncateText = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-3">
            Projects Portfolio
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Manage and showcase your completed and ongoing projects. Display your expertise and accomplishments to clients and stakeholders.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm sticky top-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Add New Project</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Project Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-semibold text-foreground mb-2">
                    Project Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Enterprise Platform Migration"
                    className={`w-full px-4 py-2.5 border rounded-lg font-sans text-sm transition-colors ${errors.title
                      ? 'border-destructive focus:ring-2 focus:ring-destructive/20 focus:outline-none'
                      : 'border-input focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none'
                      }`}
                  />
                  {errors.title && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.title}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-semibold text-foreground mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the project, achievements, and outcomes..."
                    rows={4}
                    className={`w-full px-4 py-2.5 border rounded-lg font-sans text-sm transition-colors resize-none ${errors.description
                      ? 'border-destructive focus:ring-2 focus:ring-destructive/20 focus:outline-none'
                      : 'border-input focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none'
                      }`}
                  />
                  {errors.description && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-semibold text-foreground mb-2">
                    Project Image
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${errors.image
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border hover:border-primary hover:bg-accent'
                    }`}>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="image" className="cursor-pointer block">
                      {formData.image ? (
                        <div className="space-y-2">
                          <img src={formData.image} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                          <p className="text-xs text-muted-foreground">Click to replace</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto text-secondary" size={36} />
                          <p className="text-sm font-medium text-foreground">Upload image</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, WebP up to 5MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.image && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.image}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-8 flex items-center justify-center gap-2"
                >
                  <Plus size={18} />
                  {isSubmitting ? 'Adding Project...' : 'Add Project'}
                </button>
              </form>
            </div>
          </div>

          {/* Projects Display */}
          <div className="lg:col-span-2">
            {projects.length === 0 ? (
              <div className="text-center py-24 bg-card border border-border rounded-lg">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-accent mb-4">
                  <Eye className="text-muted-foreground" size={32} />
                </div>
                <p className="text-muted-foreground text-lg font-medium">No projects yet</p>
                <p className="text-muted-foreground text-sm mt-1">Create your first project to showcase your work</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project.id)}
                    className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 sm:gap-6 p-4 sm:p-6">
                      {/* Image */}
                      <div className="relative w-full sm:w-32 h-32 bg-accent rounded-lg overflow-hidden flex-shrink-0">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent">
                            <Upload className="text-muted-foreground" size={24} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-primary mb-2 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {truncateText(project.description, 120)}
                        </p>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-secondary/10 text-secondary border border-secondary/20">
                            Active Project
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 mt-4 sm:mt-0 sm:flex-col w-full sm:w-auto">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(selectedProject === project.id ? null : project.id);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium text-sm hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Eye size={16} />
                          <span className="hidden sm:inline">View</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProject(project.id);
                          }}
                          className="flex-1 sm:flex-none px-4 py-2 bg-destructive/10 text-destructive rounded-lg font-medium text-sm hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2"
                        >
                          <Trash2 size={16} />
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedProject === project.id && (
                      <div className="border-t border-border bg-accent/50 p-4 sm:p-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wider">
                            Full Description
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                            Completed
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-chart-2/10 text-chart-2 border border-chart-2/20">
                            High Impact
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
