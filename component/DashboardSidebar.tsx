import { useAuth } from "@/context/AuthContext";
import {
  Briefcase,
  FileText,
  Layers,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Package,
  Users,
  X,
  Settings, // ← Added Settings icon
} from "lucide-react";
import { useState } from "react";

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
  const { logout, admin } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const iconMap: Record<string, React.ReactNode> = {
    overview: <LayoutGrid size={20} />,
    services: <Briefcase size={20} />,
    projects: <FileText size={20} />,
    products: <Package size={20} />,
    categories: <Layers size={20} />,
    testimonials: <Users size={20} />,
    messages: <MessageSquare size={20} />,
    admins: <Users size={20} />,
    // settings: <Settings size={20} />, // ← Settings icon added
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout? You will be redirected to the login page."
    );
    if (confirmLogout) {
      try {
        setIsLoggingOut(true);
        await logout();
      } catch (error) {
        console.error("Logout error:", error);
        alert("An error occurred during logout. Please try again.");
        setIsLoggingOut(false);
      }
    }
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

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 md:hidden z-40 transition-opacity duration-300 ${isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
        onClick={() => onToggle(false)}
        aria-hidden="true"
      />

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-primary text-primary-foreground shadow-xl md:shadow-none flex flex-col transition-transform duration-300 z-50 md:z-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        style={{
          width: "16rem",
          minWidth: "256px",
          maxWidth: "320px",
        }}
        aria-label="Sidebar navigation"
      >
        {/* Mobile Header */}
        <div className="md:hidden bg-primary border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src="/KhanBrother_Logo.jpeg"
              alt="KB Logo"
              className="h-8 w-8 object-contain rounded-sm bg-white p-1 flex-shrink-0"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-bold text-lg tracking-tight whitespace-nowrap">
                KHAN BROTHERS
              </span>
              <span className="text-[9px] text-blue-200 tracking-wider uppercase font-medium whitespace-nowrap">
                Engineering & Solutions
              </span>
            </div>
          </div>
          <button
            onClick={() => onToggle(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block p-6 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img
              src="/KhanBrother_Logo.jpeg"
              alt="KB Logo"
              className="h-8 w-8 object-contain rounded-sm bg-white p-1"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl tracking-tight">
                KHAN BROTHERS
              </span>
              <span className="text-[10px] text-blue-200 tracking-wider uppercase font-medium">
                Engineering & Solutions
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav
          className="flex-1 px-4 py-6 space-y-2 overflow-y-auto scrollbar-hide"
          aria-label="Main navigation"
        >
          {links.map((link) => {
            const isActive = activeLink === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onLinkChange(link.id);
                  onToggle(false);
                }}
                aria-current={isActive ? "page" : undefined}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary ${isActive
                    ? "bg-secondary text-white shadow-lg"
                    : "text-blue-100 hover:bg-primary-hover hover:text-white"
                  }`}
              >
                <span
                  className={`flex-shrink-0 ${isActive ? "text-white" : "text-blue-300"
                    }`}
                >
                  {iconMap[link.id]}
                </span>
                <span className="text-[15px]">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Dynamic Admin Info + Logout */}
        <div className="p-4 border-t border-white/10">
          {admin ? (
            <div className="mb-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg shadow-md">
                {admin.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  title={admin.name}
                >
                  {admin.name}
                </p>
                <a
                  href={`mailto:${admin.email}`}
                  className="text-xs text-blue-200 hover:underline truncate block"
                  title={admin.email}
                >
                  {admin.email}
                </a>
              </div>
            </div>
          ) : (
            <div className="mb-4 text-center text-blue-200 text-sm">
              Loading user...
            </div>
          )}

          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            <LogOut size={20} className={isLoggingOut ? "animate-spin" : ""} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
