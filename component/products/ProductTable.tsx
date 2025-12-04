import { Edit, Trash2, Package } from "lucide-react";
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
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">Loading products...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
        <p className="text-gray-600 mt-1">
          Total:{" "}
          <span className="font-bold text-orange-600">{products.length}</span>{" "}
          products
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#1E40AF]/10 to-orange-500/10">
            <tr>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Product
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Price
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Images
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-20 text-gray-500">
                  <div className="text-6xl mb-4">No products found</div>
                  <p className="text-xl">Start building your catalog</p>
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-blue-50/50 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0].imageUrl}
                          alt={product.title}
                          className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {product.title[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price || "Price on request"}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex -space-x-3">
                      {product.images.slice(0, 4).map((img, i) => (
                        <img
                          key={i}
                          src={img.imageUrl}
                          alt=""
                          className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                      ))}
                      {product.images.length > 4 && (
                        <div className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-bold border-4 border-white">
                          +{product.images.length - 4}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                      >
                        <Edit
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all shadow-md hover:shadow-lg group"
                      >
                        <Trash2
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
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
