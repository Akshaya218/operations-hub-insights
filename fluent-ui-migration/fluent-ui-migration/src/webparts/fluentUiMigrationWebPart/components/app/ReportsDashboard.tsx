import * as React from 'react';
import { useState } from 'react';
import {
  Stack,
  Text,
  PrimaryButton,
  // DefaultButton, // Not explicitly requested but good to have for other actions
  Dropdown,
  IDropdownOption,
  Icon,
} from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

// Props interface for the component
interface IReportsDashboardProps {
  themeVariant?: IReadonlyTheme;
}

// Sample dropdown options (can be expanded or fetched in a real scenario)
const departmentOptions: IDropdownOption[] = [
  { key: 'rnd', text: 'R&D' },
  { key: 'manufacturing', text: 'Manufacturing' },
  { key: 'quality', text: 'Quality Assurance' },
  { key: 'all', text: 'All Departments' },
];

const ownerOptions: IDropdownOption[] = [
  { key: 'user1', text: 'User One' },
  { key: 'user2', text: 'User Two' },
  { key: 'all', text: 'All Owners' },
];

const timePeriodOptions: IDropdownOption[] = [
  { key: 'last_month', text: 'Last Month' },
  { key: 'last_quarter', text: 'Last Quarter' },
  { key: 'last_year', text: 'Last Year' },
  { key: 'all_time', text: 'All Time' },
];

const themeProjectTypeOptions: IDropdownOption[] = [
  { key: 'process_optimization', text: 'Process Optimization' },
  { key: 'cost_reduction', text: 'Cost Reduction' },
  { key: 'new_product', text: 'New Product Development' },
  { key: 'all', text: 'All Themes/Types' },
];


const ReportsDashboard: React.FC<IReportsDashboardProps> = ({ themeVariant }) => {
  // State for filter selections (optional for placeholders, but good for future use)
  const [selectedDepartment, setSelectedDepartment] = useState<string | number | undefined>('all');
  const [selectedOwner, setSelectedOwner] = useState<string | number | undefined>('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<string | number | undefined>('all_time');
  const [selectedTheme, setSelectedTheme] = useState<string | number | undefined>('all');

  const widgetPlaceholderStyles = (theme?: IReadonlyTheme) => ({
    root: {
      background: theme?.palette?.white,
      border: `1px solid ${theme?.palette?.neutralLighter}`,
      borderRadius: theme?.effects?.roundedCorner4,
      boxShadow: theme?.effects?.elevation8,
      padding: 16,
      width: 'calc(33.333% - 11px)', // Responsive: 3 widgets per row with gap
      minHeight: 180,
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'space-between',
    },
  });

  const widgetIconStyles = (theme?: IReadonlyTheme) => ({
    root: {
        fontSize: 32,
        color: theme?.palette?.themePrimary, // Using themePrimary for icons
        marginBottom: 8,
        display: 'block', // Ensure icon is block for margin to apply correctly
        textAlign: 'center' as 'center', // Center icon
    }
  });


  return (
    <Stack tokens={{ childrenGap: 24 }} styles={{ root: { padding: '16px' } }}>
      <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
        Reports Dashboard
      </Text>

      {/* Filters Section */}
      <Stack horizontal wrap tokens={{ childrenGap: 16 }} styles={{ root: { marginBottom: 24 } }}>
        <Dropdown
          label="Filter by Department"
          selectedKey={selectedDepartment}
          options={departmentOptions}
          onChange={(_, o) => setSelectedDepartment(o?.key)}
          styles={{ dropdown: { width: 200 } }}
        />
        <Dropdown
          label="Filter by DOE Owner"
          selectedKey={selectedOwner}
          options={ownerOptions}
          onChange={(_, o) => setSelectedOwner(o?.key)}
          styles={{ dropdown: { width: 200 } }}
        />
        <Dropdown
          label="Filter by Time Period"
          selectedKey={selectedTimePeriod}
          options={timePeriodOptions}
          onChange={(_, o) => setSelectedTimePeriod(o?.key)}
          styles={{ dropdown: { width: 200 } }}
        />
        <Dropdown
          label="Filter by Theme / Project Type"
          selectedKey={selectedTheme}
          options={themeProjectTypeOptions}
          onChange={(_, o) => setSelectedTheme(o?.key)}
          styles={{ dropdown: { width: 220 } }}
        />
      </Stack>

      {/* Dashboard Widgets Section */}
      <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary, marginBottom: 8 } }}>
        DOE Overview
      </Text>
      <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
        {/* Widget 1: DOE Count by Department */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Icon iconName="GroupedList" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>DOE Count by Department</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            Chart/Data will be displayed here.
          </Text>
        </Stack>

        {/* Widget 2: DOE Count by Owner */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
           <Stack.Item align="center">
            <Icon iconName="Contact" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>DOE Count by Owner</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            Chart/Data will be displayed here.
          </Text>
        </Stack>

        {/* Widget 3: DOE Count by Theme */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Icon iconName="BulletedList2" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>DOE Count by Theme</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            Chart/Data will be displayed here.
          </Text>
        </Stack>

        {/* Widget 4: Status Breakdowns */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Icon iconName="PieSingle" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>Status Breakdowns</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            (Initiated, In Progress, Completed, etc.) <br/> Chart/Data will be displayed here.
          </Text>
        </Stack>

        {/* Widget 5: Delay Trends */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Icon iconName="LineChart" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>Delay Trends</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            Chart/Data will be displayed here.
          </Text>
        </Stack>

        {/* Widget 6: Efficiency Gains */}
        <Stack styles={widgetPlaceholderStyles(themeVariant)} tokens={{ childrenGap: 8 }}>
          <Stack.Item align="center">
            <Icon iconName="TrendingUp" styles={widgetIconStyles(themeVariant)} />
          </Stack.Item>
          <Text variant="mediumPlus" styles={{ root: { fontWeight: 600, textAlign: 'center' } }}>Efficiency Gains</Text>
          <Text styles={{ root: { color: themeVariant?.palette?.neutralSecondary, textAlign: 'center', flexGrow: 1 } }}>
            (e.g., Turnaround Time, Cost Reduction) <br/> Chart/Data will be displayed here.
          </Text>
        </Stack>
      </Stack>

      {/* Drill-Down Navigation Placeholder */}
      <Text styles={{ root: { marginTop: 16, color: themeVariant?.palette?.neutralSecondary, fontStyle: 'italic' } }}>
        Note: Clickable elements in widgets will facilitate drill-down navigation to detailed views.
      </Text>

      {/* Export Buttons Section */}
      <Stack horizontal tokens={{ childrenGap: 12 }} styles={{ root: { marginTop: 24 } }}>
        <PrimaryButton text="Export to Excel" iconProps={{ iconName: 'ExcelDocument' }} />
        <PrimaryButton text="Export to PDF" iconProps={{ iconName: 'PDF' }} />
      </Stack>
    </Stack>
  );
};

export default ReportsDashboard;
