import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  FETCH_ALL_PROJECTS,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  DELETE_PROJECT,
} from "@/graphql/projects";
import {
  Project,
  ProjectFormData,
  initialProjectFormData,
} from "@/types/project";

export const useProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<ProjectFormData>(
    initialProjectFormData
  );

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_PROJECTS);

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

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const projects: Project[] = data?.fetchAllProjects || [];
    if (!searchTerm) return projects;

    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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

    // For create: image is required
    if (!formData.image && !editingProject) {
      alert("Please upload an image");
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
    isModalOpen,
    editingProject,
    formData,
    filteredProjects,
    loading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImageChange,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
