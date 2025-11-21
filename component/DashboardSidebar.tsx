import { Briefcase, Home, LogOut, Mail, Settings, X, ChevronRight } from 'lucide-react';
import { JSX } from 'react';

const DashboardSidebar = ({ links, activeLink, onLinkChange, isSidebarOpen, onToggle }: {
  links: { id: string; label: string }[];
  activeLink: string;
  onLinkChange: (linkId: string) => void;
  isSidebarOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}) => {
  const iconMap: Record<string, JSX.Element> = {
    services: <Settings size={20} />,
    projects: <Briefcase size={20} />,
    contact: <Mail size={20} />
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm md:hidden z-40 transition-opacity"
          onClick={() => onToggle(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-72 bg-card border-r border-border transition-transform duration-300 ease-out z-50 md:z-auto flex flex-col shadow-xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                <Home size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-foreground">Dashboard</h1>
                <p className="text-xs text-muted-foreground font-medium">Admin Panel</p>
              </div>
            </div>
            <button
              onClick={() => onToggle(false)}
              className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X size={20} className="text-muted-foreground" />
            </button>
          </div>

          {/* User Info Card */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-secondary/80 rounded-full flex items-center justify-center text-secondary-foreground font-heading font-bold text-sm shadow-lg shadow-secondary/20">
                JD
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">John Doe</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Navigation
          </p>
          {links.map((link) => {
            const isActive = activeLink === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onLinkChange(link.id);
                  onToggle(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-r-full" />
                )}

                {/* Icon Container */}
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${isActive
                      ? 'bg-primary-foreground/10'
                      : 'bg-accent group-hover:bg-primary/10 group-hover:scale-110'
                    }`}
                >
                  <span className={isActive ? 'text-primary-foreground' : 'text-primary'}>
                    {iconMap[link.id]}
                  </span>
                </div>

                {/* Label */}
                <span className="font-semibold text-sm flex-1 text-left">{link.label}</span>

                {/* Arrow Indicator */}
                <ChevronRight
                  size={18}
                  className={`transition-all duration-200 ${isActive
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border space-y-3">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-accent/50 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground font-medium">Projects</p>
              <p className="text-lg font-heading font-bold text-primary mt-0.5">24</p>
            </div>
            <div className="bg-accent/50 border border-border rounded-lg p-3 text-center">
              <p className="text-xs text-muted-foreground font-medium">Messages</p>
              <p className="text-lg font-heading font-bold text-secondary mt-0.5">8</p>
            </div>
          </div>

          {/* Logout Button */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-foreground hover:text-destructive-foreground bg-accent hover:bg-destructive rounded-xl transition-all duration-200 font-semibold text-sm border border-border hover:border-destructive shadow-sm hover:shadow-lg group">
            <LogOut size={18} className="group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </button>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center font-medium pt-2">
            © 2025 Dashboard Pro
          </p>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
