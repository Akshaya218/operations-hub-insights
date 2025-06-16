
import React, { useState } from 'react';
import { 
  Calendar, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Folder,
  FolderOpen,
  Plus
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Folder },
    { id: 'mom', label: 'Minutes of Meeting', icon: Calendar },
    { id: 'doe', label: 'Design of Experiments', icon: FolderOpen },
    { id: 'reports', label: 'Reports', icon: Folder },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

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
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`w-full flex items-center p-3 text-left rounded hover:bg-sharepoint-blue-light transition-colors duration-150 ${
                  activeSection === item.id 
                    ? 'bg-sharepoint-blue-light text-sharepoint-blue border-r-2 border-sharepoint-blue' 
                    : 'text-sharepoint-gray-700'
                }`}
              >
                <Icon size={20} className="mr-3 flex-shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            );
          })}
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
