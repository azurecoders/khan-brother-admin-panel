import { Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  searchTerm: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({
  products,
  loading,
  searchTerm,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
          <span className="text-gray-700">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">All Products</h2>
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-medium text-orange-600">
              {products.length}
            </span>{" "}
            products
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="text-4xl mb-2">📦</div>
                  <p className="text-gray-500">No products found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  )}
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Product Column - Separated from Description */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.title}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {product.title[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {product.title}
                        </h3>
                      </div>
                    </div>
                  </td>

                  {/* Category Column */}
                  <td className="px-4 py-4">
                    <span className="inline-flex px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>

                  {/* Description Column - Now separate from Product Name */}
                  <td className="px-4 py-4">
                    <div className="max-w-[250px]">
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </td>

                  {/* Price Column */}
                  <td className="px-4 py-4">
                    <span className="font-medium text-gray-900">
                      {product.price || "Price on request"}
                    </span>
                  </td>

                  {/* Actions Column */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
