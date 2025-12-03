// types/service.ts
export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  subServices: { id: string; name: string }[];
}

export interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  icon: File | null;
  iconUrl: string; // NEW: for URL input
  iconPreview: string;
  iconInputType: "file" | "url"; // NEW: track input type
  subServices: string[];
}

export const initialFormData: ServiceFormData = {
  name: "",
  description: "",
  category: "",
  icon: null,
  iconUrl: "", // NEW
  iconPreview: "",
  iconInputType: "file", // NEW: default to file upload
  subServices: [],
};
