
import React, { useState } from 'react';
import { 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Folder,
  FolderOpen,
  Plus,
  Briefcase
  Experiment, // For DOE Core
  ListChecks  // For DOE Tracking
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null); // To track open submenu

  const menuItems = [
    { id: 'allProjects', label: 'All Projects', icon: Briefcase }, 
    { id: 'dashboard', label: 'Dashboard', icon: Folder, path: '/dashboard' },
    { id: 'mom', label: 'Minutes of Meeting', icon: Calendar, path: '/mom' },
    {
      id: 'doe',
      label: 'Design of Experiments',
      icon: FolderOpen,
      path: '/doe', // Main path for DoE
      children: [
        { id: 'doe-core', label: 'DOE Core', icon: Experiment, path: '/doe' }, // Or a more specific path like /doe/core
        { id: 'doe-tracking', label: 'DOE Tracking', icon: ListChecks, path: '/doe' } // Or /doe/tracking
      ]
    },
    { id: 'reports', label: 'Reports', icon: Folder, path: '/reports' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleMenuClick = (item: any) => {
    onSectionChange(item.id.startsWith('doe-') ? 'doe' : item.id); // Set active section to main 'doe' for sub-items

    if (item.children) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else {
      // If it's a sub-item, we might want to collapse other submenus or handle specific navigation
      // For now, clicking a sub-item will navigate, and the parent 'doe' remains active.
      // The DesignOfExperiments.tsx component will handle showing the correct internal view.
    }
  };

  return (
    <div className="min-h-screen bg-sharepoint-gray-50 flex w-full">
      {/* Sidebar */}
      <div className={`bg-white border-r border-sharepoint-gray-200 transition-all duration-300 ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="p-4 border-b border-sharepoint-gray-200">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-lg font-semibold text-sharepoint-gray-800">Operations Hub</h2>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-1 hover:bg-sharepoint-gray-100 rounded"
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>
        
        <nav className="p-2">
          {menuItems.map((item) => (
            <React.Fragment key={item.id}>
              <button
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center p-3 text-left rounded hover:bg-sharepoint-blue-light transition-colors duration-150 ${
                  activeSection === item.id || (item.id === 'doe' && activeSection.startsWith('doe-'))
                    ? 'bg-sharepoint-blue-light text-sharepoint-blue border-r-2 border-sharepoint-blue' 
                    : 'text-sharepoint-gray-700'
                }`}
              >
                <item.icon size={20} className="mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
              {!sidebarCollapsed && openSubmenu === item.id && item.children && (
                <div className="pl-6 mt-1 mb-1 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleMenuClick(child)} // Sub-items might just ensure the parent 'doe' section is active
                      className={`w-full flex items-center p-2 text-left rounded hover:bg-sharepoint-gray-100 transition-colors duration-150 text-sm ${
                        activeSection === 'doe' // Keep parent highlighted, or manage specific sub-item active state if needed
                          ? 'text-sharepoint-gray-700'
                          : 'text-sharepoint-gray-600'
                      }`}
                    >
                      <child.icon size={18} className="mr-2 flex-shrink-0" />
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="bg-white border-b border-sharepoint-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-sharepoint-gray-800">Operations Hub</h1>
              <p className="text-sharepoint-gray-600 text-sm">Manage meetings and experiments efficiently</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="sharepoint-button-secondary">
                <Plus size={16} className="mr-2" />
                New Item
              </button>
              <div className="w-8 h-8 bg-sharepoint-blue rounded-full flex items-center justify-center text-white text-sm font-medium">
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
