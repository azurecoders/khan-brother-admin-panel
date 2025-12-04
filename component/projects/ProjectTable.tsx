import { Edit, Trash2, MapPin, FolderOpen } from "lucide-react";
import { Project } from "@/types/project";

interface ProjectTableProps {
  projects: Project[];
  loading: boolean;
  searchTerm: string;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectTable = ({
  projects,
  loading,
  searchTerm,
  onEdit,
  onDelete,
}: ProjectTableProps) => {
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      onDelete(id);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-16 text-center">
        <div className="inline-flex items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <span className="text-xl text-gray-700">Loading projects...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
      <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-[#1E40AF]/5 to-orange-500/5">
        <h2 className="text-2xl font-bold text-gray-900">All Projects</h2>
        <p className="text-gray-600 mt-1">
          Total:{" "}
          <span className="font-bold text-orange-600">{projects.length}</span>{" "}
          projects
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#1E40AF]/10 to-orange-500/10">
            <tr>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Project
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Category
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Location
              </th>
              <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {projects.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-20 text-gray-500">
                  <div className="text-6xl mb-4">No projects found</div>
                  <p className="text-xl">
                    Start showcasing your engineering legacy
                  </p>
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-gradient-to-r hover:from-orange-50/50 hover:to-blue-50/50 transition-all duration-300"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-5">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-[#1E40AF] to-orange-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                          {project.title[0]}
                        </div>
                      )}
                      <div>
                        <h3 className="font-bold text-gray-900 text-xl">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mt-1">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-orange-600" />
                      <span className="font-medium">{project.location}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onEdit(project)}
                        className="p-3 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] rounded-xl transition-all shadow-md hover:shadow-lg group"
                      >
                        <Edit
                          size={18}
                          className="group-hover:scale-110 transition-transform"
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(project.id)}
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

export default ProjectTable;
