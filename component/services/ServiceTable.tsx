import { Edit, Trash2 } from "lucide-react";
import { Service } from "@/types/service";

interface ServiceTableProps {
  services: Service[];
  loading: boolean;
  searchTerm: string;
  onEdit: (service: Service) => void;
  onDelete: (id: string) => void;
}

const ServiceTable = ({
  services,
  loading,
  searchTerm,
  onEdit,
  onDelete,
}: ServiceTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-8 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent"></div>
          <span className="text-gray-700">Loading services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h2 className="text-lg font-semibold text-gray-900">All Services</h2>
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-medium text-orange-600">
              {services.length}
            </span>{" "}
            services
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Service
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Sub Services
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8">
                  <div className="text-4xl mb-2">📂</div>
                  <p className="text-gray-500">No services found</p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mt-1">
                      Try a different search term
                    </p>
                  )}
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Service Column - FIXED: Mobile responsive */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {service.icon ? (
                        <img
                          src={service.icon}
                          alt={service.name}
                          className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                          {service.name[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {service.name}
                        </h3>
                      </div>
                    </div>
                  </td>

                  {/* Category Column - FIXED: Mobile responsive */}
                  <td className="px-4 py-4">
                    <span className="inline-flex px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {service.category || "Uncategorized"}
                    </span>
                  </td>

                  {/* Description Column - FIXED: Mobile responsive with truncation */}
                  <td className="px-4 py-4">
                    <div className="max-w-[250px]">
                      <p className="text-gray-700 text-sm line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </td>

                  {/* Sub Services Column - FIXED: Mobile responsive */}
                  <td className="px-4 py-4">
                    {service.subServices?.length ? (
                      <div className="flex flex-wrap gap-1">
                        {service.subServices
                          .slice(0, 2)
                          .map((sub: any, i: number) => (
                            <span
                              key={i}
                              className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs truncate max-w-[120px]"
                              title={sub.name || sub}
                            >
                              {sub.name || sub}
                            </span>
                          ))}
                        {service.subServices.length > 2 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{service.subServices.length - 2} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm italic">None</span>
                    )}
                  </td>

                  {/* Actions Column - FIXED: Always visible on mobile */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(service)}
                        className="p-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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

export default ServiceTable;
