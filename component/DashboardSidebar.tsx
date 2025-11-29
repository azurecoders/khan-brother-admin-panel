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
  Layers,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
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

  // Icon mapping for each menu item (with Categories icon added)
  const iconMap: Record<string, React.ReactNode> = {
    overview: <LayoutGrid size={20} />,
    services: <Briefcase size={20} />,
    projects: <FileText size={20} />,
    products: <Package size={20} />,
    categories: <Layers size={20} />,
    testimonials: <Users size={20} />,
    messages: <MessageSquare size={20} />,
    admins: <Users size={20} />,
    settings: <Settings size={20} />,
  };

  const handleLogout = async () => {
    const confirmLogout = window.confirm(
      "Are you sure you want to logout? You will be redirected to the login page."
    );

    if (confirmLogout) {
      try {
        setIsLoggingOut(true);
        logout();
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

      {/* Mobile Overlay - Dark backdrop when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40 transition-opacity"
          onClick={() => onToggle(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container - ORIGINAL BLUE THEME */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen bg-[#1E40AF] transition-transform duration-300 z-50 md:z-auto flex flex-col shadow-xl md:shadow-none ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        style={{
          width: "15%",
          minWidth: "265px",
          maxWidth: "320px",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Mobile Header with Close Button - PERFECTLY ALIGNED */}
        <div className="md:hidden bg-[#1E40AF] border-b border-white/10 px-4 py-3 flex items-center justify-between">
          {/* Mobile Branding - PERFECTLY ALIGNED TO LEFT */}
          <div className="flex items-center gap-2 flex-1">
            <img
              src={"/KhanBrother_Logo.jpeg"}
              alt="KB Logo"
              className="h-8 w-8 object-contain rounded-sm bg-white p-1"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-white tracking-tight">
                KHAN BROTHERS
              </span>
              <span className="text-[9px] text-blue-200 tracking-wider uppercase font-medium">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Mobile Close Button - ON RIGHT SIDE */}
          <button
            onClick={() => onToggle(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0 ml-2"
            aria-label="Close sidebar"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        {/* Desktop Header Section - PERFECTLY ALIGNED */}
        <div className="hidden md:block p-6 pb-6 border-b border-white/10">
          {/* Logo Section - PERFECTLY ALIGNED TO LEFT */}
          <div className="flex items-center gap-3">
            <img
              src={"/KhanBrother_Logo.jpeg"}
              alt="KB Logo"
              className="h-8 w-8 object-contain rounded-sm bg-white p-1"
            />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight text-white tracking-tight">
                KHAN BROTHERS
              </span>
              <span className="text-[10px] text-blue-200 tracking-wider uppercase font-medium">
                Engineering & Solutions
              </span>
            </div>
          </div>

          {/* Admin Info Display */}
          {admin && (
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-white text-sm font-medium truncate">
                    {admin.name}
                  </span>
                  <span className="text-blue-200 text-xs truncate">
                    {admin.email}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu - ORIGINAL BLUE THEME */}
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
                    ? "bg-[#F97316] text-white shadow-lg" // ORIGINAL ORANGE ACTIVE STATE
                    : "text-blue-100 hover:bg-[#1E3A8A] hover:text-white" // ORIGINAL HOVER STATE
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="flex-shrink-0">{iconMap[link.id]}</span>
                <span className="text-[15px]">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer with Logout Button - ORIGINAL BLUE THEME */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogOut size={20} className={isLoggingOut ? "animate-spin" : ""} />
            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
          </button>

          {/* Footer Note */}
          <div className="mt-3 text-center">
            <p className="text-[10px] text-blue-200">Secure Admin Access</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
