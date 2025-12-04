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
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">Loading services...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">All Services</h2>
        <p className="text-gray-600 mt-1">
          Total:{" "}
          <span className="font-bold text-orange-600">{services.length}</span>{" "}
          services
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#1E40AF]/10 to-orange-500/10">
            <tr>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Service
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Description
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Sub Services
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {services.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-20 text-gray-500">
                  <div className="text-6xl mb-4">No services found</div>
                  <p className="text-xl">Start by adding your first service</p>
                </td>
              </tr>
            ) : (
              services.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-blue-50/50 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      {service.icon ? (
                        <img
                          src={service.icon}
                          alt={service.name}
                          className="w-14 h-14 rounded-2xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {service.name[0]}
                        </div>
                      )}
                      <span className="font-bold text-gray-900 text-lg">
                        {service.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                      {service.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-gray-700 max-w-lg">
                    <p className="line-clamp-2">{service.description}</p>
                  </td>
                  <td className="px-8 py-6">
                    {service.subServices?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {service.subServices
                          .slice(0, 3)
                          .map((sub: any, i: number) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                            >
                              {sub.name || sub}
                            </span>
                          ))}
                        {service.subServices.length > 3 && (
                          <span className="text-xs text-gray-500 self-center">
                            +{service.subServices.length - 3} more
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">
                        No sub-services
                      </span>
                    )}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onEdit(service)}
                        className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                      >
                        <Edit
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
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

export default ServiceTable;
