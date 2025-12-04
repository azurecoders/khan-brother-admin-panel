"use client";
import { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import { Menu, X, LogOut } from "lucide-react";

interface AdminProps {
  children: React.ReactNode;
}

export default function Admin({ children }: AdminProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("kb-admin-loggedin") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kb-admin-loggedin");
    window.location.href = "/login";
  };

  if (!isLoggedIn) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50 flex">
      {/* Desktop Sidebar - Royal Blue Premium */}
      <aside
        className={`hidden lg:flex flex-col bg-primary text-white transition-all duration-500 ${
          isSidebarOpen ? "w-80" : "w-24"
        } shadow-2xl`}
      >
        <div className="p-8 border-b border-white/10 bg-gradient-to-b from-black/20 to-transparent">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-4 ${
                !isSidebarOpen && "justify-center"
              }`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl ring-4 ring-orange-400/30">
                <span className="text-white text-2xl font-bold">KB</span>
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">
                    Khan Brothers
                  </h1>
                  <p className="text-sm text-orange-200">
                    Engineering & Solutions
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-3 hover:bg-white/10 rounded-xl transition-all"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <DashboardSidebar
            links={[
              { id: "overview", label: "Overview" },
              { id: "services", label: "Services" },
              { id: "products", label: "Products" },
              { id: "projects", label: "Projects" },
              { id: "testimonials", label: "Testimonials" },
              { id: "messages", label: "Messages" },
              { id: "admins", label: "Administrators" },
            ]}
            activeLink={""}
            onLinkChange={() => {}}
            isSidebarOpen={isSidebarOpen}
            onToggle={setIsSidebarOpen}
          />
        </div>

        <div className="p-6 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-2xl transform hover:scale-105"
          >
            <LogOut size={22} />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-xl">
            <span className="text-white text-xl font-bold">KB</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Khan Brothers</h1>
            <p className="text-xs text-orange-600 font-bold uppercase tracking-widest">
              Admin Panel
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 bg-orange-100 hover:bg-orange-200 rounded-xl transition-all"
        >
          {isMobileMenuOpen ? (
            <X size={28} className="text-orange-700" />
          ) : (
            <Menu size={28} className="text-orange-700" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <>
          <div
            className="lg:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <aside className="lg:hidden fixed top-20 left-0 bottom-0 w-80 bg-primary text-white z-50 shadow-2xl">
            <div className="p-6">
              <DashboardSidebar
                links={[
                  { id: "overview", label: "Overview" },
                  { id: "services", label: "Services" },
                  { id: "products", label: "Products" },
                  { id: "projects", label: "Projects" },
                  { id: "testimonials", label: "Testimonials" },
                  { id: "messages", label: "Messages" },
                  { id: "admins", label: "Administrators" },
                ]}
                activeLink={""}
                onLinkChange={() => {}}
                isSidebarOpen={true}
                onToggle={() => {}}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl"
              >
                <LogOut size={22} />
                Logout
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Main Content */}
      <main className="flex-1 pt-20 lg:pt-0">
        <div className="p-6 md:p-8 lg:p-12 max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
