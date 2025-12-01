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

  // Get unique categories from products (fallback)
  const availableCategories = useMemo(() => {
    const products: Product[] = data?.fetchAllProducts || [];
    const productCategories = new Set(products.map((p) => p.category));
    return Array.from(productCategories).sort();
  }, [data]);

  // Filtered products
  const filteredProducts = useMemo(() => {
    const products: Product[] = data?.fetchAllProducts || [];

    return products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
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

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      // Revoke the object URL to prevent memory leaks
      if (prev.imagePreviews[index]?.startsWith("blob:")) {
        URL.revokeObjectURL(prev.imagePreviews[index]);
      }

      return {
        ...prev,
        images: prev.images.filter((_, i) => i !== index),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
      };
    });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price || "",
      category: product.category,
      images: [],
      imagePreviews: product.images.map((img) => img.imageUrl),
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    await deleteProduct({ variables: { id } });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    try {
      if (editingProduct) {
        // Update product
        const variables: Record<string, any> = {
          id: editingProduct.id,
          title: formData.title,
          description: formData.description,
          category: formData.category,
          price: formData.price || null,
        };

        // Only include images if new ones were selected
        if (formData.images.length > 0) {
          variables.images = formData.images;
        }

        await updateProduct({ variables });
      } else {
        // Create product
        await createProduct({
          variables: {
            title: formData.title,
            description: formData.description,
            category: formData.category,
            price: formData.price || null,
            images: formData.images.length > 0 ? formData.images : null,
          },
        });
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
    availableCategories,
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
    handleRemoveImage,
    handleEdit,
    handleDelete,
    handleSubmit,
  };
};
