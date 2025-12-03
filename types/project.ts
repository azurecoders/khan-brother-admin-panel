// types/project.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  imageUrl: string;
  imageId?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  location: string;
  category: string;
  image: File | null;
  imageUrl: string;
  imagePreview: string;
  imageInputType: 'file' | 'url';
}

export const initialProjectFormData: ProjectFormData = {
  title: "",
  description: "",
  location: "",
  category: "",
  image: null,
  imageUrl: "",
  imagePreview: "",
  imageInputType: "file",
};
