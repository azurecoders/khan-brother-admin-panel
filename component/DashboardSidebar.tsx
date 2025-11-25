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
  // Icon mapping for each menu item
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
            onClick={() => {
              const confirmLogout = confirm("Are you sure you want to logout?");
              if (confirmLogout) {
                alert(
                  "Logout functionality will be connected to authentication system."
                );
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-lg transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            <LogOut size={20} />
            <span>Logout</span>
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
