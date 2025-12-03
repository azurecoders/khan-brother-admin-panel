// hooks/useProducts.ts
import { useState, useMemo, ChangeEvent } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  Product,
  ProductFormData,
  initialProductFormData,
} from "@/types/product";
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  FETCH_ALL_PRODUCTS,
  UPDATE_PRODUCT,
} from "@/graphql/product";
import { FETCH_ALL_CATEGORIES } from "@/graphql/category";

export const useProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>(
    initialProductFormData
  );

  // Queries & Mutations
  const { data, loading, error, refetch } = useQuery(FETCH_ALL_PRODUCTS);

  const { data: categoriesData, loading: categoriesLoading } =
    useQuery(FETCH_ALL_CATEGORIES);

  const [createProduct, { loading: creating }] = useMutation(CREATE_PRODUCT, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error creating product:", error);
      alert("Failed to create product. Please try again.");
    },
  });

  const [updateProduct, { loading: updating }] = useMutation(UPDATE_PRODUCT, {
    onCompleted: () => {
      resetForm();
      refetch();
    },
    onError: (error) => {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onCompleted: () => refetch(),
    onError: (error) => {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    },
  });

  // Get categories from backend
  const categories = useMemo(() => {
    return categoriesData?.fetchAllCategories || [];
  }, [categoriesData]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    const products: Product[] = data?.fetchAllProducts || [];

    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [data, searchTerm, categoryFilter]);

  // Handlers
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file uploads
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newPreviews = newFiles.map((file) => URL.createObjectURL(file));

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newFiles],
        imagePreviews: [...prev.imagePreviews, ...newPreviews],
      }));
    }
  };

  // NEW: Handle URL input
  const handleImageUrlAdd = (url: string) => {
    if (!url.trim()) return;

    try {
      new URL(url); // Validate URL
      setFormData((prev) => ({
        ...prev,
        imageUrls: [...prev.imageUrls, url.trim()],
        imagePreviews: [...prev.imagePreviews, url.trim()],
      }));
    } catch {
      alert("Please enter a valid URL");
    }
  };

  // NEW: Handle input type toggle
  const handleImageInputTypeChange = (type: "file" | "url") => {
    setFormData((prev) => ({
      ...prev,
      imageInputType: type,
    }));
  };

  // Handle remove image (works for both file and URL)
  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const preview = prev.imagePreviews[index];

      // Check if it's a blob URL (file upload)
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);

        // Find the corresponding file index
        const blobPreviews = prev.imagePreviews
          .slice(0, index + 1)
          .filter((p) => p.startsWith("blob:"));
        const fileIndex = blobPreviews.length - 1;

        return {
          ...prev,
          images: prev.images.filter((_, i) => i !== fileIndex),
          imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        };
      } else {
        // It's a URL
        const urlPreviews = prev.imagePreviews
          .slice(0, index + 1)
          .filter((p) => !p.startsWith("blob:"));
        const urlIndex = urlPreviews.length - 1;

        return {
          ...prev,
          imageUrls: prev.imageUrls.filter((_, i) => i !== urlIndex),
          imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
        };
      }
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);

    // Check if images are external URLs or from ImageKit
    const existingUrls = product.images
      .filter((img) => !img.imageId) // External URLs have no imageId
      .map((img) => img.imageUrl);

    setFormData({
      title: product.title,
      description: product.description,
      price: product.price || "",
      category: product.category,
      images: [],
      imageUrls: existingUrls,
      imagePreviews: product.images.map((img) => img.imageUrl),
      imageInputType: "file",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct({ variables: { id } });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    try {
      if (editingProduct) {
        const variables: Record<string, any> = {
          id: editingProduct.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price || null,
        };

        // Add file uploads if any
        if (formData.images.length > 0) {
          variables.images = formData.images;
        }

        // Add URL images if any
        if (formData.imageUrls.length > 0) {
          variables.imageUrls = formData.imageUrls;
        }

        await updateProduct({ variables });
      } else {
        const variables: Record<string, any> = {
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price || null,
        };

        // Add file uploads if any
        if (formData.images.length > 0) {
          variables.images = formData.images;
        }

        // Add URL images if any
        if (formData.imageUrls.length > 0) {
          variables.imageUrls = formData.imageUrls;
        }

        await createProduct({ variables });
      }
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  const resetForm = () => {
    // Clean up object URLs
    formData.imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) {
        URL.revokeObjectURL(url);
      }
    });

    setFormData(initialProductFormData);
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return {
    // State
    searchTerm,
    categoryFilter,
    isModalOpen,
    editingProduct,
    formData,
    filteredProducts,
    categories,
    loading,
    categoriesLoading,
    error,
    mutationLoading: creating || updating,

    // Actions
    setSearchTerm,
    setCategoryFilter,
    openAddModal,
    resetForm,
    handleInputChange,
    handleImagesChange,
    handleImageUrlAdd, // NEW
    handleImageInputTypeChange, // NEW
    handleRemoveImage,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
