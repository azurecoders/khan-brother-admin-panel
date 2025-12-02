// hooks/useProjects.ts
import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "@/graphql/projects";
import { FETCH_ALL_CATEGORIES } from "@/graphql/category";
import {
  Project,
  ProjectFormData,
  initialProjectFormData,
} from "@/types/project";

export const useProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(
    initialProjectFormData
  );

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_PROJECTS);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(FETCH_ALL_CATEGORIES);

  const [createProject, { loading: creating }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error creating project:", error);
      alert("Failed to create project. Please try again.");
    },
  });

  const [updateProject, { loading: updating }] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error updating project:", error);
      alert("Failed to update project. Please try again.");
    },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting project:", error);
      alert("Failed to delete project. Please try again.");
    },
  });

  // Get categories from backend
  const categories = useMemo(() => {
    return categoriesData?.fetchAllCategories || [];
  }, [categoriesData]);

  // Get unique categories from projects (fallback)
  const availableCategories = useMemo(() => {
    const projects: Project[] = data?.fetchAllProjects || [];
    const projectCategories = new Set(
      projects.map((p) => p.category).filter(Boolean)
    );
    return Array.from(projectCategories).sort();
  }, [data]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const projects: Project[] = data?.fetchAllProjects || [];

    return projects.filter((project) => {
      // Search filter
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.category &&
          project.category.toLowerCase().includes(searchTerm.toLowerCase()));

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || project.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, categoryFilter]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Revoke previous preview URL if exists
      if (formData.imagePreview?.startsWith("blob:")) {
        URL.revokeObjectURL(formData.imagePreview);
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      location: project.location,
      category: project.category || "",
      image: null,
      imagePreview: project.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProject({ variables: { id } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.image && !editingProject) {
      alert("Please upload an image");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    try {
      if (editingProject) {
        // Update project
        const variables: Record<string, any> = {
          id: editingProject.id,
          title: formData.title,
          description: formData.description,
          location: formData.location,
          category: formData.category,
        };

        // Only include image if new one was selected
        if (formData.image) {
          variables.image = formData.image;
        }

        await updateProject({ variables });
      } else {
        // Create project
        await createProject({
          variables: {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            category: formData.category,
            image: formData.image,
          },
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    // Clean up object URL
    if (formData.imagePreview?.startsWith("blob:")) {
      URL.revokeObjectURL(formData.imagePreview);
    }

    setFormData(initialProjectFormData);
    setEditingProject(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return {
    // State
    searchTerm,
    categoryFilter,
    isModalOpen,
    editingProject,
    formData,
    filteredProjects,
    availableCategories,
    categories,
    categoriesLoading,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    setCategoryFilter,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
