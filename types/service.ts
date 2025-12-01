// types/service.ts
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
  subServices?: SubService[]; // Made optional with ?
}

export interface ServiceFormData {
  name: string;
  description: string;
  icon: File | null;
  iconPreview: string;
  subServices: string[]; // Keep as array, just can be empty
}

export const initialFormData: ServiceFormData = {
  name: "",
  description: "",
  icon: null,
  iconPreview: null,
  subServices: [],
};
