// types/product.ts
export interface ProductImage {
  id: string;
  imageId: string | null;
  imageUrl: string;
  productId: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  images: ProductImage[];
}

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  images: File[];
  imageUrls: string[]; // NEW: for URL inputs
  imagePreviews: string[];
  imageInputType: "file" | "url"; // NEW: track input type
}

export const initialProductFormData: ProductFormData = {
  title: "",
  description: "",
  price: "",
  category: "",
  images: [],
  imageUrls: [], // NEW
  imagePreviews: [],
  imageInputType: "file", // NEW
};
