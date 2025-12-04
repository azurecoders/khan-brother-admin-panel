"use client";

import { Menu, Bell } from "lucide-react";
import { useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Services from "./Services";
import Products from "./Products";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Messages from "./Messages";
import Category from "./Category";
import { useAuth } from "@/context/AuthContext";
import OverviewContent from "./OverviewContent";
import AdminsContent from "./admins/AdminsContent";
import SettingsContent from "./SettingsContent";

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { admin } = useAuth();

  const sidebarLinks = [
    { id: "overview", label: "Overview" },
    { id: "categories", label: "Categories" },
    { id: "services", label: "Services" },
    { id: "products", label: "Products" },
    { id: "projects", label: "Projects" },
    { id: "testimonials", label: "Testimonials" },
    { id: "messages", label: "Messages" },
    { id: "admins", label: "Administrators" },
    { id: "settings", label: "Settings" },
  ];

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
      case "categories":
        return <Category />;
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
    <div className="flex h-screen bg-gray-50">
      {/* Premium Sidebar */}
      <DashboardSidebar
        links={sidebarLinks}
        activeLink={activeLink}
        onLinkChange={setActiveLink}
        isSidebarOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="sticky top-0 md:hidden bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-40 shadow-md backdrop-blur-sm bg-white/90">
          <div className="flex items-center gap-3">
            <img
              src="/KhanBrother_Logo.jpeg"
              alt="Khan Brothers Logo"
              className="h-10 w-10 rounded-lg bg-white p-1.5 shadow-md"
            />
            <div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                KHAN BROTHERS
              </span>
              <p className="text-[10px] text-orange-600 uppercase tracking-widest font-semibold">
                Engineering & Solutions
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200"
            aria-label="Toggle menu"
          >
            <Menu size={26} className="text-gray-800" />
          </button>
        </div>

        {/* Desktop Header - Clean & Premium */}
        <header className="hidden md:flex sticky top-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/80 px-8 py-5 items-center justify-between z-40 shadow-lg">
          <div className="flex items-center gap-3">
            <img
              src="/KhanBrother_Logo.jpeg"
              alt="Logo"
              className="h-11 w-11 rounded-xl bg-white p-1.5 shadow-lg"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                KHAN BROTHERS
              </h1>
              <p className="text-xs text-orange-600 uppercase tracking-widest font-bold">
                Engineering & Solutions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Notification Bell → Navigates to Messages */}
            <button
              onClick={() => setActiveLink("messages")}
              className="relative p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
              aria-label="View Messages"
            >
              <Bell
                size={22}
                className="text-gray-700 group-hover:text-orange-600 transition-colors"
              />
              <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-orange-500 rounded-full animate-pulse ring-4 ring-orange-500/30"></span>
            </button>

            {/* User Profile - Clean & Professional */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{admin?.name}</p>
                <p className="text-xs text-gray-500">{admin?.email}</p>
              </div>
              <div className="h-11 w-11 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {admin?.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="p-6 md:p-8 lg:p-10 xl:p-12">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}
