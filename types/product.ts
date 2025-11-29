export interface ProductImage {
  id: string;
  imageId: string;
  imageUrl: string;
  productId: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string | null;
  category: string;
  images: ProductImage[];
}

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  imagePreviews: string[];
}

export const initialProductFormData: ProductFormData = {
  title: "",
  description: "",
  price: "",
  category: "",
  images: [],
  imagePreviews: [],
};

// Available categories
export const PRODUCT_CATEGORIES = [
  "Electrical Equipment",
  "Solar Products",
  "Networking & IT Hardware",
  "Security Systems",
  "Plumbing Materials",
  "Construction Materials",
  "Other",
];
