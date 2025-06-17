import * as React from 'react';
import { useState } from 'react';
import {
  Stack,
  Text,
  TextField,
  Dropdown,
  IDropdownOption,
  PrimaryButton,
  DefaultButton,
  DetailsList,
  IColumn,
  Label,
} from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  Filter,
  Link as LinkIcon,
  FileText,
  Sheet,
  Send,
  Clock4,
  Activity,
  AlertTriangle,
  Bell,
  CalendarClock,
  XCircle,
  Info,
  UploadCloud,
  DownloadCloud,
  FileUp,
} from 'lucide-react';

interface Project {
  id: string;
  projectName: string;
  projectOwner: string;
  employeeCode: string;
  department: string;
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold' | 'Cancelled';
  startDate: string;
  endDate: string;
  dueDate: string;
  linkedMeetingReference?: string;
  description: string;
}

interface AllProjectsTrackingProps {
  themeVariant?: IReadonlyTheme;
}

const sampleProjects: Project[] = [
  {
    id: 'PROJ001',
    projectName: 'New HR Portal Development',
    projectOwner: 'Alice Wonderland',
    employeeCode: 'E1001',
    department: 'Tech',
    status: 'In Progress',
    startDate: '2024-01-15',
    endDate: '2024-07-30',
    dueDate: '2024-07-30',
    linkedMeetingReference: 'MOM00123',
    description: 'Develop and launch the new employee HR portal with updated features and UI.',
  },
  {
    id: 'PROJ002',
    projectName: 'Risk Assessment Framework Update',
    projectOwner: 'Bob The Builder',
    employeeCode: 'E1002',
    department: 'Risk',
    status: 'Planning',
    startDate: '2024-05-01',
    endDate: '2024-09-15',
    dueDate: '2024-09-15',
    description: 'Update the company-wide risk assessment framework to align with new regulations.',
  },
  {
    id: 'PROJ003',
    projectName: 'Operations Efficiency Drive',
    projectOwner: 'Charlie Brown',
    employeeCode: 'E1003',
    department: 'Ops',
    status: 'Completed',
    startDate: '2023-10-01',
    endDate: '2024-03-31',
    dueDate: '2024-03-31',
    linkedMeetingReference: 'MOM00456',
    description: 'A project to improve operational efficiency by 20% through process automation.',
  },
];

const statusOptions: IDropdownOption[] = [
  { key: 'Planning', text: 'Planning' },
  { key: 'In Progress', text: 'In Progress' },
  { key: 'Completed', text: 'Completed' },
  { key: 'On Hold', text: 'On Hold' },
  { key: 'Cancelled', text: 'Cancelled' },
];

const departmentOptions: IDropdownOption[] = [
  { key: 'HR', text: 'HR' },
  { key: 'Risk', text: 'Risk' },
  { key: 'Tech', text: 'Tech' },
  { key: 'Ops', text: 'Ops' },
  { key: 'Finance', text: 'Finance' },
  { key: 'Marketing', text: 'Marketing' },
];

const AllProjectsTracking: React.FC<AllProjectsTrackingProps> = ({ themeVariant }) => {
  const [projects] = useState<Project[]>(sampleProjects);

  const projectColumns: IColumn[] = [
    { key: 'projectName', name: 'Project Name', fieldName: 'projectName', minWidth: 120, isResizable: true },
    { key: 'projectOwner', name: 'Owner', fieldName: 'projectOwner', minWidth: 100, isResizable: true },
    { key: 'employeeCode', name: 'Emp. Code', fieldName: 'employeeCode', minWidth: 80, isResizable: true },
    { key: 'department', name: 'Department', fieldName: 'department', minWidth: 80, isResizable: true },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 90, isResizable: true },
    { key: 'startDate', name: 'Start Date', fieldName: 'startDate', minWidth: 90, isResizable: true },
    { key: 'endDate', name: 'End Date', fieldName: 'endDate', minWidth: 90, isResizable: true },
    { key: 'dueDate', name: 'Due Date', fieldName: 'dueDate', minWidth: 90, isResizable: true },
    {
      key: 'linkedMeetingReference',
      name: 'Linked MoM',
      minWidth: 100,
      isResizable: true,
      onRender: (item: Project) =>
        item.linkedMeetingReference ? (
          <PrimaryButton
            text={item.linkedMeetingReference}
            iconProps={{ iconName: undefined }}
            onClick={() => alert(`Navigate to MoM: ${item.linkedMeetingReference}`)}
            styles={{ root: { padding: '0 8px', minWidth: 0 } }}
          >
            <LinkIcon size={14} style={{ marginRight: 4 }} />
          </PrimaryButton>
        ) : null,
    },
    { key: 'description', name: 'Description', fieldName: 'description', minWidth: 120, isResizable: true },
  ];

  return (
    <Stack tokens={{ childrenGap: 32 }}>
      {/* Filter & Search Panel */}
      <Stack
        tokens={{ childrenGap: 16 }}
        styles={{
          root: {
            background: themeVariant?.palette?.white,
            border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            borderRadius: 4,
            boxShadow: themeVariant?.effects?.elevation8,
            padding: 24,
          },
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Filter size={20} />
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Filter & Search Panel
          </Text>
        </Stack>
        <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
          <TextField label="Project Owner" placeholder="Name or employee code" styles={{ root: { width: 200 } }} />
          <Dropdown label="Department/Function" options={departmentOptions} styles={{ root: { width: 180 } }} />
          <Dropdown label="Status" options={statusOptions} styles={{ root: { width: 180 } }} />
          <TextField label="Start Date" type="date" styles={{ root: { width: 160 } }} />
          <TextField label="End Date" type="date" styles={{ root: { width: 160 } }} />
          <TextField label="Due Date" type="date" styles={{ root: { width: 160 } }} />
        </Stack>
        <Stack horizontal horizontalAlign="end">
          <PrimaryButton>
            Search
          </PrimaryButton>
        </Stack>
      </Stack>

      {/* Project Records List */}
      <Stack>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary, marginBottom: 16 } }}>
          Project Records
        </Text>
        <DetailsList
          items={projects}
          columns={projectColumns}
          compact
        />
      </Stack>

      {/* Report Generator Section */}
      <Stack
        tokens={{ childrenGap: 16 }}
        styles={{
          root: {
            background: themeVariant?.palette?.white,
            border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            borderRadius: 4,
            boxShadow: themeVariant?.effects?.elevation8,
            padding: 24,
          },
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Sheet size={20} />
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Report Generator
          </Text>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 32 }}>
          {/* Column 1: Scheduling & Role */}
          <Stack tokens={{ childrenGap: 12 }} styles={{ root: { width: 320 } }}>
            <TextField label="Report Schedule Time" type="datetime-local" />
            <Dropdown label="Recurrence" options={[
              { key: 'none', text: 'None' },
              { key: 'daily', text: 'Daily' },
              { key: 'weekly', text: 'Weekly' },
              { key: 'monthly', text: 'Monthly' },
            ]} />
            <Dropdown label="Role-based View" options={[
              { key: 'cxo', text: 'Summary for CXOs' },
              { key: 'pm', text: 'Detailed for PMs' },
            ]} />
            <PrimaryButton>
              <Clock4 size={16} style={{ marginRight: 8 }} />
              Schedule Report Job
            </PrimaryButton>
          </Stack>
          {/* Column 2: Content Info, Export & Email */}
          <Stack tokens={{ childrenGap: 12 }} styles={{ root: { width: 320 } }}>
            <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>Report Content Includes:</Text>
            <ul style={{ fontSize: 12, color: themeVariant?.palette?.neutralSecondary }}>
              <li>% Complete</li>
              <li>Action Items</li>
              <li>Timeline Deviation</li>
              <li>Blockers</li>
            </ul>
            <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>Export Options:</Text>
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <DefaultButton>
                <FileText size={16} style={{ marginRight: 8 }} />
                Export as PDF
              </DefaultButton>
              <DefaultButton>
                <Sheet size={16} style={{ marginRight: 8 }} />
                Export as Excel
              </DefaultButton>
            </Stack>
            <TextField label="Email Report To" type="email" placeholder="Enter email addresses" />
            <PrimaryButton>
              <Send size={16} style={{ marginRight: 8 }} />
              Schedule Email Delivery
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>

      {/* Live Health Dashboard Section */}
      <Stack
        tokens={{ childrenGap: 16 }}
        styles={{
          root: {
            background: themeVariant?.palette?.white,
            border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            borderRadius: 4,
            boxShadow: themeVariant?.effects?.elevation8,
            padding: 24,
          },
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <Activity size={20} />
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Live Health Dashboard
          </Text>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 32 }}>
          {/* Traffic Light Summary */}
          <Stack tokens={{ childrenGap: 8 }} styles={{ root: { width: 220 } }}>
            <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>Project Status Overview</Text>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <span style={{ width: 16, height: 16, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              <Text variant="small" styles={{ root: { color: '#22c55e', fontWeight: 500 } }}>On Track: 15 Projects</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <span style={{ width: 16, height: 16, background: '#eab308', borderRadius: '50%', display: 'inline-block' }} />
              <Text variant="small" styles={{ root: { color: '#eab308', fontWeight: 500 } }}>At Risk: 5 Projects</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <span style={{ width: 16, height: 16, background: '#ef4444', borderRadius: '50%', display: 'inline-block' }} />
              <Text variant="small" styles={{ root: { color: '#ef4444', fontWeight: 500 } }}>Delayed: 3 Projects</Text>
            </Stack>
          </Stack>
          {/* KPIs */}
          <Stack tokens={{ childrenGap: 8 }}>
            <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>Key Performance Indicators</Text>
            <Stack horizontal tokens={{ childrenGap: 32 }}>
              <Stack>
                <Text variant="small">Milestone Completion %:</Text>
                <Text variant="large" styles={{ root: { color: themeVariant?.palette?.themePrimary, fontWeight: 600 } }}>75%</Text>
              </Stack>
              <Stack>
                <Text variant="small">Delay Trends:</Text>
                <Text variant="large" styles={{ root: { color: '#ef4444', fontWeight: 600 } }}>+3 days</Text>
              </Stack>
              <Stack>
                <Text variant="small">Open Critical Items:</Text>
                <Text variant="large" styles={{ root: { color: '#eab308', fontWeight: 600 } }}>12</Text>
              </Stack>
              <Stack>
                <Text variant="small">Projects On Budget:</Text>
                <Text variant="large" styles={{ root: { color: '#22c55e', fontWeight: 600 } }}>85%</Text>
              </Stack>
            </Stack>
            <Text variant="tiny" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
              <Info size={14} style={{ marginRight: 4 }} />
              Drill-down from project list: Project → Task → Owner. (Future functionality)
            </Text>
          </Stack>
        </Stack>
        {/* Alerts Section */}
        <Stack tokens={{ childrenGap: 8 }}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Bell size={18} />
            <Text variant="medium" styles={{ root: { fontWeight: 500 } }}>Recent Alerts</Text>
          </Stack>
          <Stack tokens={{ childrenGap: 8 }}>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <CalendarClock size={16} />
              <Text variant="small" styles={{ root: { fontWeight: 500 } }}>Upcoming Deadline:</Text>
              <Text variant="small">'New HR Portal Development - Phase 2' is due in 3 days.</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <XCircle size={16} />
              <Text variant="small" styles={{ root: { fontWeight: 500 } }}>Overdue Task:</Text>
              <Text variant="small">Task 'Requirement Finalization on Risk Assessment Framework Update' is 2 days overdue.</Text>
            </Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <AlertTriangle size={16} />
              <Text variant="small" styles={{ root: { fontWeight: 500 } }}>Blocked Work:</Text>
              <Text variant="small">'Operations Efficiency Drive - Integration Step' is currently blocked by dependency on Team Gamma.</Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Bulk Upload Section */}
      <Stack
        tokens={{ childrenGap: 16 }}
        styles={{
          root: {
            background: themeVariant?.palette?.white,
            border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            borderRadius: 4,
            boxShadow: themeVariant?.effects?.elevation8,
            padding: 24,
          },
        }}
      >
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
          <UploadCloud size={20} />
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Bulk Project Upload
          </Text>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 32 }}>
          {/* Column 1: Download Template & Info */}
          <Stack tokens={{ childrenGap: 8 }} styles={{ root: { width: 320 } }}>
            <Text variant="small" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
              Use the provided template to prepare your project data for bulk import. Ensure all required fields are correctly formatted.
            </Text>
            <DefaultButton>
              <DownloadCloud size={16} style={{ marginRight: 8 }} />
              Download CSV/Excel Template
            </DefaultButton>
            <Text variant="tiny" styles={{ root: { color: themeVariant?.palette?.neutralTertiary } }}>
              Note: Uploaded files will be validated. A preview of the data will be shown before final import.
            </Text>
          </Stack>
          {/* Column 2: Upload Panel Placeholder */}
          <Stack tokens={{ childrenGap: 8 }} styles={{ root: { width: 320 } }}>
            <Label htmlFor="bulkUploadFile">
              <FileUp size={32} style={{ margin: '0 auto 8px auto', color: themeVariant?.palette?.neutralTertiary }} />
              <Text variant="small" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
                Drag & drop CSV/Excel file here, or <span style={{ color: themeVariant?.palette?.themePrimary, fontWeight: 600 }}>click to browse</span>.
              </Text>
              <input type="file" id="bulkUploadFile" style={{ display: 'none' }} />
            </Label>
            <PrimaryButton>
              <UploadCloud size={16} style={{ marginRight: 8 }} />
              Upload Projects
            </PrimaryButton>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AllProjectsTracking;