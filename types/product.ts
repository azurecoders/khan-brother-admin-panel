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
  images: ProductImage[];
}

export interface ProductFormData {
  title: string;
  description: string;
  price: string;
  images: File[];
  imagePreviews: string[];
}

export const initialProductFormData: ProductFormData = {
  title: "",
  description: "",
  price: "",
  images: [],
  imagePreviews: [],
};
