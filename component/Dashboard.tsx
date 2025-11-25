"use client";
import {
  Menu,
  TrendingUp,
  Package,
  Briefcase,
  MessageSquare,
  AlertCircle,
  Users,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import DashboardSidebar from "./DashboardSidebar";
import Services from "./Services";
import Projects from "./Projects";
import Testimonials from "./Testimonials";
import Messages from "./Messages";
import Products from "./Products";

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar menu items (matching your Figma design)
  const sidebarLinks = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "products", label: "Products" },
    { id: "testimonials", label: "Testimonials" },
    { id: "messages", label: "Messages" },
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
        {/* Mobile Header with Company Logo - FULLY RESPONSIVE */}
        <div className="sticky top-0 md:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-30 shadow-sm">
          {/* Company Logo - Matching Client Design */}
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

          {/* Hamburger Menu Button - Properly Spaced */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            <Menu size={24} className="text-gray-900" />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="p-6 md:p-8 lg:p-10">{renderContent()}</div>
      </main>
    </div>
  );
}

// ========================================
// OVERVIEW PAGE COMPONENT WITH DYNAMIC STATS
// ========================================
function OverviewContent() {
  // Dynamic data - In real application, this would come from your database/API
  const [stats, setStats] = useState({
    activeServices: 6,
    totalProducts: 12,
    totalProjects: 8,
    newMessages: 4,
    outOfStockProducts: 2,
    happyClients: 150,
    yearsOfExperience: 15,
  });

  // Simulate real-time data updates (optional)
  useEffect(() => {
    // In a real application, you would fetch this data from your API
    // Example: fetchDashboardStats().then(data => setStats(data))
  }, []);

  const statsCards = [
    {
      id: 1,
      title: "Active Services",
      value: stats.activeServices,
      icon: <Briefcase size={24} />,
      color: "text-[#F97316]",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "+2 this month",
    },
    {
      id: 2,
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <Package size={24} />,
      color: "text-[#1E40AF]",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+3 this quarter",
    },
    {
      id: 3,
      title: "Total Products",
      value: stats.totalProducts,
      icon: <Package size={24} />,
      color: "text-[#8B5CF6]",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "In catalog",
    },
    {
      id: 4,
      title: "New Messages",
      value: stats.newMessages,
      icon: <MessageSquare size={24} />,
      color: "text-[#10B981]",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "Unread inquiries",
    },
    {
      id: 5,
      title: "Out of Stock",
      value: stats.outOfStockProducts,
      icon: <AlertCircle size={24} />,
      color: "text-[#EF4444]",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      trend: "Requires attention",
    },
    {
      id: 6,
      title: "Happy Clients",
      value: stats.happyClients,
      icon: <Users size={24} />,
      color: "text-[#06B6D4]",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      trend: "Satisfied customers",
    },
    {
      id: 7,
      title: "Years Experience",
      value: stats.yearsOfExperience,
      icon: <Calendar size={24} />,
      color: "text-[#F59E0B]",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-600",
      trend: "Industry expertise",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Overview</h1>
        <p className="text-gray-600 text-lg">Manage your website content</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statsCards.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`${stat.bgColor} p-3 rounded-lg group-hover:scale-110 transition-transform duration-200`}
              >
                <span className={stat.iconColor}>{stat.icon}</span>
              </div>
              <TrendingUp size={18} className="text-green-500" />
            </div>
            <div>
              <p className="text-gray-600 font-medium text-sm mb-1">
                {stat.title}
              </p>
              <p className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Edit Hero Section */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Edit: Home Page Hero
          </h2>

          <div className="space-y-4">
            {/* Hero Title Input */}
            <div>
              <label
                htmlFor="heroTitle"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Hero Title
              </label>
              <input
                id="heroTitle"
                type="text"
                defaultValue="Engineering Excellence with Reliable Solutions"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                placeholder="Enter hero title..."
              />
            </div>

            {/* Hero Subtext Textarea */}
            <div>
              <label
                htmlFor="heroSubtext"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Hero Subtext
              </label>
              <textarea
                id="heroSubtext"
                rows={3}
                defaultValue="We deliver high-performance engineering, construction, solar, and IT infrastructure solutions..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent resize-none"
                placeholder="Enter hero subtext..."
              />
            </div>

            {/* Update Button */}
            <button
              onClick={() => {
                alert(
                  "Content updated successfully! (Connect to backend API later)"
                );
              }}
              className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold py-2.5 rounded-lg transition-colors"
            >
              Update Home Page
            </button>
          </div>
        </div>

        {/* Recent Activity / Quick Stats */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Quick Stats Summary
          </h2>

          <div className="space-y-4">
            {/* Services Status */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Briefcase size={20} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Services
                  </p>
                  <p className="text-xs text-gray-600">All active</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-orange-600">
                {stats.activeServices}
              </span>
            </div>

            {/* Projects Status */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Projects
                  </p>
                  <p className="text-xs text-gray-600">Completed & Ongoing</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {stats.totalProjects}
              </span>
            </div>

            {/* Messages Alert */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Messages
                  </p>
                  <p className="text-xs text-gray-600">Pending replies</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {stats.newMessages}
              </span>
            </div>

            {/* Stock Alert */}
            {stats.outOfStockProducts > 0 && (
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <AlertCircle size={20} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Stock Alert
                    </p>
                    <p className="text-xs text-gray-600">
                      Products out of stock
                    </p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-red-600">
                  {stats.outOfStockProducts}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Company Milestones */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-xl p-8 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6">Company Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">{stats.happyClients}+</div>
            <p className="text-blue-100 font-medium">Happy Clients</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {stats.yearsOfExperience}+
            </div>
            <p className="text-blue-100 font-medium">Years of Experience</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {stats.totalProjects}+
            </div>
            <p className="text-blue-100 font-medium">Projects Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================
// SETTINGS PAGE COMPONENT
// ========================================
function SettingsContent() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 text-lg">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Card */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="space-y-6">
          {/* Account Settings Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-4">
              {/* Admin Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Name
                </label>
                <input
                  type="text"
                  defaultValue="Khan Brothers Admin"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue="khanbrothers.engsolution@gmail.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-lg transition-colors">
                Save Changes
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Website Settings Section */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Website Settings
            </h3>
            <div className="space-y-4">
              {/* Site Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Website Title
                </label>
                <input
                  type="text"
                  defaultValue="Khan Brothers Engineering & Solutions"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Contact Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Contact Phone
                </label>
                <input
                  type="text"
                  defaultValue="+92 321 8980284"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>

              {/* Save Button */}
              <button className="px-6 py-2.5 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-semibold rounded-lg transition-colors">
                Update Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
