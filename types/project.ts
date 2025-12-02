// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  imageUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  location: string;
  category: string;
  image: File | null;
  imagePreview: string;
}

export const initialProjectFormData: ProjectFormData = {
  title: "",
  description: "",
  location: "",
  category: "",
  image: null,
  imagePreview: "",
};
