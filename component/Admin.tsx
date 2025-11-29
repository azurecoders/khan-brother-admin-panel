// khan-brother-admin-panel/components/Admin.tsx
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

  // Simple demo login state (in real app, this comes from backend or cookies)
  useEffect(() => {
    // For now, we assume user is logged in after visiting /auth and clicking Sign In
    // In real version, we check localStorage or session
    const loggedIn = localStorage.getItem("kb-admin-loggedin") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("kb-admin-loggedin");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  // If not logged in → redirect to auth page
  if (!isLoggedIn) {
    // Auto redirect to your beautiful auth page
    if (typeof window !== "undefined") {
      window.location.href = "/auth";
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-20"
          }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center gap-3 ${!isSidebarOpen && "justify-center"
                }`}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">KB</span>
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="text-xl font-bold">KB Admin</h1>
                  <p className="text-xs text-blue-200">Khan Brothers E&S</p>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <DashboardSidebar isOpen={isSidebarOpen} />
        </div>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
          >
            <LogOut size={18} />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </div>

      {/* Mobile Header + Sidebar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">KB</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">KB Admin</h1>
              <p className="text-xs text-gray-500">Khan Brothers E&S</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed top-16 left-0 bottom-0 w-72 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white z-50 transform transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-4">
          <DashboardSidebar isOpen={true} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 transition-colors text-white font-medium"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-0 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto">{children}</div>
      </div>
    </div>
  );
}
