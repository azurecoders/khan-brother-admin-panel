import {
  Briefcase,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Settings,
  Users,
  FileText,
  Package,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  links: { id: string; label: string }[];
  activeLink: string;
  onLinkChange: (linkId: string) => void;
  isSidebarOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

const DashboardSidebar = ({
  links,
  activeLink,
  onLinkChange,
  isSidebarOpen,
  onToggle,
}: DashboardSidebarProps) => {
  // Icon mapping for each menu item (matching your requirements)
  const iconMap: Record<string, React.ReactNode> = {
    overview: <LayoutGrid size={20} />,
    services: <Briefcase size={20} />,
    projects: <FileText size={20} />,
    products: <Package size={20} />,
    testimonials: <Users size={20} />,
    messages: <MessageSquare size={20} />,
    settings: <Settings size={20} />,
  };

  return (
    <>
      {/* Custom CSS for hiding scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Mobile Overlay - Dark backdrop when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40 transition-opacity"
          onClick={() => onToggle(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-[#1E40AF] transition-transform duration-300 z-50 md:z-auto flex flex-col shadow-xl md:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: "15%",
          minWidth: "200px",
          maxWidth: "320px",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Header Section */}
        <div className="p-6 pb-8 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">KB Admin</h1>
              <p className="text-blue-200 text-sm mt-1">Content Management</p>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={() => onToggle(false)}
              className="md:hidden text-white hover:text-blue-200 p-2 transition-colors rounded-lg hover:bg-white/10"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide">
          {links.map((link) => {
            const isActive = activeLink === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onLinkChange(link.id);
                  onToggle(false); // Close sidebar on mobile after selection
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-[#F97316] text-white shadow-lg" // Orange active state
                    : "text-blue-100 hover:bg-[#1E3A8A] hover:text-white" // Hover state
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex-shrink-0">{iconMap[link.id]}</span>
                <span className="text-[15px]">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer with Logout Button */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => {
              // Add logout logic here
              const confirmLogout = confirm("Are you sure you want to logout?");
              if (confirmLogout) {
                alert(
                  "Logout functionality will be connected to authentication system."
                );
                // Later: Add actual logout logic (clear session, redirect, etc.)
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
