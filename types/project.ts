export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  imageId: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  location: string;
  image: File | null;
  imagePreview: string | null;
}

export const initialProjectFormData: ProjectFormData = {
  title: "",
  description: "",
  location: "",
  image: null,
  imagePreview: null,
};
