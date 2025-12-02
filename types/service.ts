// types/service.ts
export interface SubService {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  subServices: SubService[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  icon: File | null;
  iconPreview: string;
  subServices: string[];
}

export const initialFormData: ServiceFormData = {
  name: "",
  description: "",
  category: "",
  icon: null,
  iconPreview: "",
  subServices: [],
};
