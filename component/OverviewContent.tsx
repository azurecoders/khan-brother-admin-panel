"use client";

import {
  TrendingUp,
  Package,
  Briefcase,
  MessageSquare,
  Users,
  Calendar,
  FolderOpen,
  Quote,
  RefreshCw,
} from "lucide-react";
import { useOverview } from "@/hooks/useOverview";

const OverviewContent = () => {
  const { stats, loading, error, refetch } = useOverview();

  // Static values (can be made dynamic later with a settings table)
  const staticStats = {
    happyClients: 150,
    yearsOfExperience: 15,
  };

  const statsCards = [
    {
      id: 1,
      title: "Total Services",
      value: stats.totalServices,
      icon: <Briefcase size={24} />,
      color: "text-[#F97316]",
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600",
      trend: "Active services",
    },
    {
      id: 2,
      title: "Total Projects",
      value: stats.totalProjects,
      icon: <FolderOpen size={24} />,
      color: "text-[#1E40AF]",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "Completed & ongoing",
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
      title: "Messages",
      value: stats.totalMessages,
      icon: <MessageSquare size={24} />,
      color: "text-[#10B981]",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "Contact inquiries",
    },
    {
      id: 5,
      title: "Testimonials",
      value: stats.totalTestimonials,
      icon: <Quote size={24} />,
      color: "text-[#06B6D4]",
      bgColor: "bg-cyan-50",
      iconColor: "text-cyan-600",
      trend: "Client reviews",
    },
    {
      id: 6,
      title: "Happy Clients",
      value: staticStats.happyClients,
      icon: <Users size={24} />,
      color: "text-[#EC4899]",
      bgColor: "bg-pink-50",
      iconColor: "text-pink-600",
      trend: "Satisfied customers",
    },
    {
      id: 7,
      title: "Years Experience",
      value: staticStats.yearsOfExperience,
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Overview</h1>
          <p className="text-gray-600 text-lg">Manage your website content</p>
        </div>
        <button
          onClick={() => refetch()}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw
            size={18}
            className={`text-gray-600 ${loading ? "animate-spin" : ""}`}
          />
          <span className="text-sm font-medium text-gray-700">Refresh</span>
        </button>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-600">
            Failed to load stats. Please try again.
          </p>
        </div>
      )}

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
                {loading ? (
                  <span className="inline-block w-12 h-10 bg-gray-200 rounded animate-pulse"></span>
                ) : (
                  stat.value
                )}
              </p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div>

        {/* Quick Stats Summary */}
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
                {loading ? "-" : stats.totalServices}
              </span>
            </div>

            {/* Projects Status */}
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FolderOpen size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Projects
                  </p>
                  <p className="text-xs text-gray-600">Completed & Ongoing</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-blue-600">
                {loading ? "-" : stats.totalProjects}
              </span>
            </div>

            {/* Products Status */}
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Products
                  </p>
                  <p className="text-xs text-gray-600">In catalog</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-purple-600">
                {loading ? "-" : stats.totalProducts}
              </span>
            </div>

            {/* Messages Status */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <MessageSquare size={20} className="text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Messages
                  </p>
                  <p className="text-xs text-gray-600">Contact inquiries</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">
                {loading ? "-" : stats.totalMessages}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Company Milestones */}
      <div className="bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-xl p-8 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6">Company Milestones</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {staticStats.happyClients}+
            </div>
            <p className="text-blue-100 font-medium">Happy Clients</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {staticStats.yearsOfExperience}+
            </div>
            <p className="text-blue-100 font-medium">Years of Experience</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {loading ? "-" : stats.totalProjects}+
            </div>
            <p className="text-blue-100 font-medium">Projects Completed</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {loading ? "-" : stats.totalServices}+
            </div>
            <p className="text-blue-100 font-medium">Services Offered</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewContent;
