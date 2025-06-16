import * as React from 'react'; // Changed to import * as React
import { type IReadonlyTheme } from '@microsoft/sp-component-base'; // Added for themeVariant type
import {
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Plus
} from 'lucide-react';

// Define props for Layout: activeSection and onSectionChange
interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  themeVariant?: IReadonlyTheme; // Changed type from any
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange, themeVariant }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false); // Changed to React.useState

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Folder },
    { id: 'mom', label: 'Minutes of Meeting', icon: Calendar },
    { id: 'doe', label: 'Design of Experiments', icon: FolderOpen },
    { id: 'reports', label: 'Reports', icon: Folder },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Basic styling for demonstration, to be replaced by Fluent UI & theme
  const sidebarStyle: React.CSSProperties = {
    backgroundColor: themeVariant?.palette?.white || '#ffffff', // Example of using theme
    borderRight: `1px solid ${themeVariant?.palette?.neutralLighter || '#e0e0e0'}`,
    transition: 'width 0.3s',
    width: sidebarCollapsed ? '64px' : '256px',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: themeVariant?.palette?.white || '#ffffff',
    borderBottom: `1px solid ${themeVariant?.palette?.neutralLighter || '#e0e0e0'}`,
    padding: '16px 24px',
  };

  const contentStyle: React.CSSProperties = {
    padding: '24px',
    flex: 1,
    overflowY: 'auto'
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <div style={sidebarStyle}>
        <div style={{ padding: '16px', borderBottom: `1px solid ${themeVariant?.palette?.neutralLighter || '#e0e0e0'}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {!sidebarCollapsed && (
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: themeVariant?.palette?.neutralPrimary || '#333' }}>Operations Hub</h2>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{ padding: '4px', borderRadius: '4px', background: 'transparent', border: 'none', cursor: 'pointer' }}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>
        </div>

        <nav style={{ padding: '8px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '12px',
                  textAlign: 'left',
                  borderRadius: '4px',
                  backgroundColor: isActive ? (themeVariant?.palette?.themeLighter || '#e0e0ff') : 'transparent',
                  color: isActive ? (themeVariant?.palette?.themePrimary || '#0078d4') : (themeVariant?.palette?.neutralPrimary || '#333'),
                  borderRight: isActive ? `2px solid ${themeVariant?.palette?.themePrimary || '#0078d4'}` : 'none',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  border: 'none'
                }}
                title={item.label}
              >
                <Icon size={20} style={{ marginRight: sidebarCollapsed ? '0' : '12px', flexShrink: 0 }} />
                {!sidebarCollapsed && <span style={{ fontWeight: '500' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Navigation */}
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '600', color: themeVariant?.palette?.neutralPrimary || '#333' }}>Operations Hub</h1>
              <p style={{ fontSize: '0.875rem', color: themeVariant?.palette?.neutralSecondary || '#666' }}>Manage meetings and experiments efficiently</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* This button should eventually use Fluent UI Button */}
              <button style={{ padding: '8px 12px', border: '1px solid #ccc', borderRadius: '4px', background: '#f0f0f0', cursor: 'pointer' }}>
                <Plus size={16} style={{ marginRight: '8px' }} />
                New Item
              </button>
              <div style={{ width: '32px', height: '32px', backgroundColor: themeVariant?.palette?.themePrimary || '#0078d4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: themeVariant?.palette?.white || '#fff', fontSize: '0.875rem', fontWeight: '500' }}>
                U
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={contentStyle}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
