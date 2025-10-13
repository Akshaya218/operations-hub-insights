import * as React from 'react';
import type { IFluentUiMigrationWebPartProps } from './IFluentUiMigrationWebPartProps';
import { ThemeProvider } from '@fluentui/react/lib/Theme'; // ThemeProvider only
import type { IReadonlyTheme as SPTheme } from '@microsoft/sp-component-base'; // Alias for clarity

import Layout from './app/Layout';
import Dashboard from './app/Dashboard';
import MinutesOfMeeting from './app/MinutesOfMeeting'; // Import actual MoM component
import DesignOfExperiments from './app/DesignOfExperiment';
import ReportsDashboard from './app/ReportsDashboard'; // Import ReportsDashboard

// Placeholders for other sections
const ReportsPlaceholder: React.FC<{themeVariant?: SPTheme}> = ({themeVariant}) => <div style={{padding: '20px', background: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8'}}>Legacy Reports Content Goes Here</div>; // Renamed for clarity
const SettingsPlaceholder: React.FC<{themeVariant?: SPTheme}> = ({themeVariant}) => <div style={{padding: '20px', background: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8'}}>Settings Content Goes Here</div>;


export default class FluentUiMigrationWebPart extends React.Component<IFluentUiMigrationWebPartProps, { activeSection: string }> {

  constructor(props: IFluentUiMigrationWebPartProps) {
    super(props);
    this.state = {
      activeSection: 'dashboard'
    };
  }

  private handleSectionChange = (section: string) => {
    this.setState({ activeSection: section });
  }

  public render(): React.ReactElement<IFluentUiMigrationWebPartProps> {
    const { themeVariant } = this.props;

    // Cast to Partial<IReadonlyTheme> for ThemeProvider, though SPTheme should be compatible
    const currentFluentTheme: Partial<SPTheme> | undefined = themeVariant as Partial<SPTheme> | undefined;

    let contentComponent;
    switch (this.state.activeSection) {
      case 'dashboard':
        contentComponent = <Dashboard themeVariant={themeVariant} />;
        break;
      case 'mom':
        contentComponent = <MinutesOfMeeting themeVariant={themeVariant} />; // Use actual MoM
        break;
      case 'doe':
        contentComponent = <DesignOfExperiments themeVariant={themeVariant} />;
        break;
      case 'reportsDashboard': // New case for the Reports Dashboard
        contentComponent = <ReportsDashboard themeVariant={themeVariant} />;
        break;
      case 'reports': // Kept original 'reports' case for now, pointing to placeholder
        contentComponent = <ReportsPlaceholder themeVariant={themeVariant} />;
        break;
      case 'settings':
        contentComponent = <SettingsPlaceholder themeVariant={themeVariant} />;
        break;
      default:
        contentComponent = <Dashboard themeVariant={themeVariant} />; // Default to Dashboard
    }

    return (
      <ThemeProvider theme={currentFluentTheme} applyTo="body">
          <Layout
            activeSection={this.state.activeSection}
            onSectionChange={this.handleSectionChange}
            themeVariant={themeVariant} // Pass SPTheme to Layout
          >
            { contentComponent }
          </Layout>
      </ThemeProvider>
    );
  }
}
