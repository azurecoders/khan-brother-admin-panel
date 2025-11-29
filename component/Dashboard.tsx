"use client";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Services from "./Services";
import Products from "./Products";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Messages from "./Messages";
import { useAuth } from "@/context/AuthContext";
import OverviewContent from "./OverviewContent";
import AdminsContent from "./admins/AdminsContent";
import SettingsContent from "./SettingsContent";

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { admin, logout } = useAuth();

  // Sidebar menu items
  const sidebarLinks = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "products", label: "Products" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "messages", label: "Messages" },
    { id: "admins", label: "Administrators" },
    { id: "settings", label: "Settings" },
  ];

  // Render different content based on active menu selection
  const renderContent = () => {
    switch (activeLink) {
      case "overview":
        return <OverviewContent />;
      case "services":
        return <Services />;
      case "projects":
        return <Projects />;
      case "products":
        return <Products />;
      case "testimonials":
        return <Testimonials />;
      case "messages":
        return <Messages />;
      case "admins":
        return <AdminsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <OverviewContent />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6]">
      {/* Sidebar Component */}
      <DashboardSidebar
        links={sidebarLinks}
        activeLink={activeLink}
        onLinkChange={setActiveLink}
        isSidebarOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="sticky top-0 md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <img
              src={"/KhanBrother_Logo.jpeg"}
              alt="KB Logo"
              className="h-10 w-10 object-contain rounded-sm"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-gray-900 tracking-tight">
                KHAN BROTHERS
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Desktop Header with User Info */}
        <div className="hidden md:flex sticky top-0 bg-white border-b border-gray-200 px-8 py-4 items-center justify-end z-30 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">{admin?.name}</p>
              <p className="text-xs text-gray-500">{admin?.email}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Content Wrapper */}
        <div className="p-6 md:p-8 lg:p-10">{renderContent()}</div>
      </main>
    </div>
  );
}
