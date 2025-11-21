"use client"
import { Menu } from 'lucide-react';
import { useState } from 'react';
import ContactUs from './ContactUs';
import DashboardSidebar from './DashboardSidebar';
import Projects from './Projects';
import Services from './Services';

// Main Dashboard Component
export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('services');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const sidebarLinks = [
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];



  const renderContent = () => {
    switch (activeLink) {
      case 'services':
        return <Services />;

      case 'projects':
        return <Projects />;

      case 'contact':
        return <ContactUs />

      default:
        return <Services />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Fixed Sidebar */}
      <DashboardSidebar
        links={sidebarLinks}
        activeLink={activeLink}
        onLinkChange={setActiveLink}
        isSidebarOpen={isSidebarOpen}
        onToggle={setIsSidebarOpen}
      />

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="sticky top-0 md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between z-30">
          <h2 className="font-bold text-slate-900">Dashboard</h2>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Menu size={24} className="text-slate-900" />
          </button>
        </div>

        <div className="p-6 md:p-8 lg:p-10">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
