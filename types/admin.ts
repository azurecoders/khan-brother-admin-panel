export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthPayload {
  token: string;
  admin: Admin;
}

export interface AdminFormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

export const initialAdminFormData: AdminFormData = {
  name: "",
  email: "",
  password: "",
  role: "admin",
};

export const ADMIN_ROLES = ["admin", "super_admin", "editor"];
