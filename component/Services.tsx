import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { Plus, X, Upload, AlertCircle } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  description: string;
  icon: string | null;
  subServices: string[];
}

interface FormData {
  name: string;
  description: string;
  icon: string | null;
  subServices: string[];
}

interface Errors {
  name?: string;
  description?: string;
  icon?: string;
  subServices?: string;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    icon: null,
    subServices: []
  });
  const [subServiceInput, setSubServiceInput] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleIconUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({ ...prev, icon: event.target?.result as string }));
        if (errors.icon) {
          setErrors(prev => ({ ...prev, icon: '' }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubService = () => {
    if (subServiceInput.trim()) {
      setFormData(prev => ({
        ...prev,
        subServices: [...prev.subServices, subServiceInput.trim()]
      }));
      setSubServiceInput('');
    }
  };

  const handleRemoveSubService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index)
    }));
  };

  const validateForm = (): Errors => {
    const newErrors: Errors = {};
    if (!formData.name.trim()) newErrors.name = 'Service name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.icon) newErrors.icon = 'Service icon is required';
    if (formData.subServices.length === 0) newErrors.subServices = 'At least one sub-service is required';
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setServices(prev => [...prev, { ...formData, id: Date.now() }]);
      setFormData({ name: '', description: '', icon: null, subServices: [] });
      setErrors({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveService = (id: number) => {
    setServices(prev => prev.filter(service => service.id !== id));
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSubService();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-heading font-bold text-primary mb-3">
            Services Management
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Create and manage professional services with detailed descriptions and sub-services. Build a comprehensive service catalog for your business.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 shadow-sm sticky top-6">
              <h2 className="text-2xl font-heading font-bold text-primary mb-6">Add New Service</h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Service Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Service Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Consulting Services"
                    className={`w-full px-4 py-2.5 border rounded-lg font-sans text-sm transition-colors ${errors.name
                      ? 'border-destructive focus:ring-2 focus:ring-destructive/20 focus:outline-none'
                      : 'border-input focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none'
                      }`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.name}
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
                    placeholder="Describe your service..."
                    rows={3}
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

                {/* Icon Upload */}
                <div>
                  <label htmlFor="icon" className="block text-sm font-semibold text-foreground mb-2">
                    Service Icon
                  </label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${errors.icon
                    ? 'border-destructive bg-destructive/5'
                    : 'border-border hover:border-primary hover:bg-accent'
                    }`}>
                    <input
                      id="icon"
                      type="file"
                      accept="image/*"
                      onChange={handleIconUpload}
                      className="hidden"
                    />
                    <label htmlFor="icon" className="cursor-pointer block">
                      {formData.icon ? (
                        <div className="space-y-2">
                          <img src={formData.icon} alt="Preview" className="w-16 h-16 mx-auto rounded-lg object-cover" />
                          <p className="text-xs text-muted-foreground">Click to change</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Upload className="mx-auto text-secondary" size={32} />
                          <p className="text-sm font-medium text-foreground">Upload icon</p>
                          <p className="text-xs text-muted-foreground">PNG, JPG, SVG</p>
                        </div>
                      )}
                    </label>
                  </div>
                  {errors.icon && (
                    <p className="text-destructive text-xs mt-1 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.icon}
                    </p>
                  )}
                </div>

                {/* Sub-Services */}
                <div>
                  <label htmlFor="subservice" className="block text-sm font-semibold text-foreground mb-2">
                    Sub-Services
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      id="subservice"
                      type="text"
                      value={subServiceInput}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setSubServiceInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add sub-service name"
                      className="flex-1 px-4 py-2.5 border border-input rounded-lg font-sans text-sm focus:border-primary focus:ring-2 focus:ring-primary/10 focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddSubService}
                      className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/90 transition-colors flex items-center gap-2"
                    >
                      <Plus size={18} />
                    </button>
                  </div>

                  {/* Sub-Services List */}
                  <div className="space-y-2">
                    {formData.subServices.map((subService, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-accent p-3 rounded-lg border border-border"
                      >
                        <span className="text-sm text-foreground font-medium">{subService}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSubService(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {errors.subServices && (
                    <p className="text-destructive text-xs mt-2 flex items-center gap-1">
                      <AlertCircle size={14} /> {errors.subServices}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mt-8"
                >
                  {isSubmitting ? 'Adding Service...' : 'Add Service'}
                </button>
              </form>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-2">
            {services.length === 0 ? (
              <div className="text-center py-16 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground text-lg">No services added yet</p>
                <p className="text-muted-foreground text-sm mt-1">Create your first service to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Icon and Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {service.icon ? (
                          <img src={service.icon} alt={service.name} className="w-full h-full object-cover" />
                        ) : (
                          <Upload className="text-secondary" size={24} />
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveService(service.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    {/* Service Name and Description */}
                    <h3 className="text-lg font-heading font-bold text-primary mb-2 line-clamp-1">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Sub-Services */}
                    <div>
                      <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wider">
                        Sub-Services
                      </p>
                      <div className="space-y-2">
                        {service.subServices.map((subService, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                            <span>{subService}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

export default Services;
