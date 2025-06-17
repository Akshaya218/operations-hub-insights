import * as React from 'react';
import { type IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Folder,
  FolderOpen,
  Plus
} from 'lucide-react';
import { Stack, DefaultButton, Persona, PersonaSize, Text } from '@fluentui/react';

// Define props for Layout: activeSection and onSectionChange
interface LayoutProps {
  children: React.ReactNode;
  activeSection: string;
  onSectionChange: (section: string) => void;
  themeVariant?: IReadonlyTheme;
}

const Layout: React.FC<LayoutProps> = ({ children, activeSection, onSectionChange, themeVariant }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Folder },
    { id: 'mom', label: 'Minutes of Meeting', icon: Calendar },
    { id: 'doe', label: 'Design of Experiments', icon: FolderOpen },
    { id: 'reports', label: 'Reports', icon: Folder },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <Stack horizontal styles={{ root: { minHeight: '100vh', width: '100%' } }}>
      {/* Sidebar */}
      <Stack
        styles={{
          root: {
            backgroundColor: themeVariant?.palette?.white,
            borderRight: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            transition: 'width 0.3s',
            width: sidebarCollapsed ? 64 : 256,
            minWidth: sidebarCollapsed ? 64 : 256,
            flexShrink: 0,
            zIndex: 2,
          }
        }}
      >
        <Stack
          horizontal
          verticalAlign="center"
          horizontalAlign="space-between"
          styles={{
            root: {
              padding: 16,
              borderBottom: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            }
          }}
        >
          {!sidebarCollapsed && (
            <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
              Operations Hub
            </Text>
          )}
          <DefaultButton
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            styles={{
              root: {
                minWidth: 32,
                height: 32,
                borderRadius: 4,
                background: 'transparent',
                border: 'none',
                padding: 0,
              }
            }}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </DefaultButton>
        </Stack>
        <Stack tokens={{ childrenGap: 4 }} styles={{ root: { padding: 8 } }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <DefaultButton
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                styles={{
                  root: {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '12px 8px',
                    textAlign: 'left',
                    borderRadius: 4,
                    backgroundColor: isActive ? (themeVariant?.palette?.themeLighter) : 'transparent',
                    color: isActive ? (themeVariant?.palette?.themePrimary) : (themeVariant?.palette?.neutralPrimary),
                    borderRight: isActive ? `2px solid ${themeVariant?.palette?.themePrimary}` : 'none',
                    marginBottom: 2,
                    fontWeight: 500,
                  }
                }}
                title={item.label}
              >
                <Icon size={20} style={{ marginRight: sidebarCollapsed ? 0 : 12, flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </DefaultButton>
            );
          })}
        </Stack>
      </Stack>

      {/* Main Content */}
      <Stack grow styles={{ root: { display: 'flex', flexDirection: 'column', minWidth: 0 } }}>
        {/* Top Navigation */}
        <Stack
          horizontal
          verticalAlign="center"
          horizontalAlign="space-between"
          styles={{
            root: {
              backgroundColor: themeVariant?.palette?.white,
              borderBottom: `1px solid ${themeVariant?.palette?.neutralLighter}`,
              padding: '16px 24px',
              zIndex: 1,
            }
          }}
        >
          <Stack>
            <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
              Operations Hub
            </Text>
            <Text variant="medium" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
              Manage meetings and experiments efficiently
            </Text>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 12 }} verticalAlign="center">
            <DefaultButton
              styles={{
                root: {
                  padding: '8px 12px',
                  border: `1px solid ${themeVariant?.palette?.neutralLight}`,
                  borderRadius: 4,
                  background: themeVariant?.palette?.neutralLighter,
                  fontWeight: 500,
                }
              }}
              iconProps={{ iconName: undefined }}
            >
              <Plus size={16} style={{ marginRight: 8 }} />
              New Item
            </DefaultButton>
            <Persona
              text="User"
              size={PersonaSize.size32}
              hidePersonaDetails
              styles={{
                root: {
                  backgroundColor: themeVariant?.palette?.themePrimary,
                  color: themeVariant?.palette?.white,
                  fontWeight: 500,
                }
              }}
            />
          </Stack>
        </Stack>

        {/* Page Content */}
        <Stack grow styles={{ root: { padding: 24, minWidth: 0, overflowY: 'auto' } }}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Layout;
