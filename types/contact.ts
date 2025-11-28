export interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  phone: string;
  createdAt?: string;
}

// Local state for read status (stored in localStorage)
export interface ContactReadStatus {
  [id: string]: boolean;
}
