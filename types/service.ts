export interface SubService {
  id: string;
  name: string;
  serviceId: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  subServices: SubService[];
}

export interface ServiceFormData {
  name: string;
  description: string;
  icon: File | null;
  iconPreview: string | null;
  subServices: string[];
}

export const initialFormData: ServiceFormData = {
  name: "",
  description: "",
  icon: null,
  iconPreview: null,
  subServices: [],
};
