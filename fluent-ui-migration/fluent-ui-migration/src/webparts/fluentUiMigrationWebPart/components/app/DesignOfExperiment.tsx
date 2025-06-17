import * as React from 'react';
import { useState } from 'react';
import { BarChart3} from 'lucide-react';
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
  Panel,
  PanelType,
  IconButton,
} from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

// 1. Define User Roles Enum
enum UserRole {
  Admin = 'Admin',
  DOE_Owner = 'DOE Owner',
  Activity_Owner = 'Activity Owner',
  Viewer = 'Viewer'
}

interface Observation {
  id: string;
  parameter: string;
  value: string;
  observation: string;
  date: string;
}

interface DesignOfExperimentsProps {
  themeVariant?: IReadonlyTheme;
}

const DesignOfExperiments: React.FC<DesignOfExperimentsProps> = ({ themeVariant }) => {
  const [observations, setObservations] = useState<Observation[]>([
    {
      id: '1',
      parameter: 'Temperature',
      value: '85°C',
      observation: 'Optimal range maintained',
      date: '2024-12-15',
    },
    {
      id: '2',
      parameter: 'Pressure',
      value: '2.5 bar',
      observation: 'Slight deviation observed',
      date: '2024-12-16',
    },
    {
      id: '3',
      parameter: 'pH Level',
      value: '7.2',
      observation: 'Within acceptable limits',
      date: '2024-12-17',
    },
  ]);

  const [showAddObservation, setShowAddObservation] = useState(false);
  const [newObservation, setNewObservation] = useState({
    parameter: '',
    value: '',
    observation: '',
    date: new Date().toISOString().split('T')[0],
  });

  const [chartType, setChartType] = useState<'bar' | 'line' | 'scatter'>('bar');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');

  // 2. Add Mock Current User and Role State
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Admin);
  const [currentUserId, setCurrentUserId] = useState<string>('user123'); // Mock current user's ID

  // DOE Tracking State Variables
  const [doeTitle, setDoeTitle] = useState('');
  const [doeBusinessUnit, setDoeBusinessUnit] = useState<string | number | undefined>(undefined);
  const [doeLocation, setDoeLocation] = useState('');
  const [doeTheme, setDoeTheme] = useState<string | number | undefined>(undefined);
  const [doeObjective, setDoeObjective] = useState('');
  const [doeHypotheses, setDoeHypotheses] = useState('');
  const [doeSuccessCriteria, setDoeSuccessCriteria] = useState('');
  const [doeFailureCriteria, setDoeFailureCriteria] = useState(''); // Added this
  const [doeStartDate, setDoeStartDate] = useState('');
  const [doeEndDate, setDoeEndDate] = useState('');

  // Activity Planning & Tracking State
  interface IDOEActivity {
    id: string;
    activityName: string;
    assignedOwner: string;
    plannedStartDate?: string;
    plannedEndDate?: string;
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
    dependencies?: string;
    comments?: string;
  }
  const [activities, setActivities] = useState<IDOEActivity[]>([]);
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<Partial<IDOEActivity> | undefined>(undefined);
  const [isEditingActivity, setIsEditingActivity] = useState(false);


  // Performance Evaluation State
  const [perfTurnaroundTimePre, setPerfTurnaroundTimePre] = useState('');
  const [perfTurnaroundTimePost, setPerfTurnaroundTimePost] = useState('');
  const [perfCostPre, setPerfCostPre] = useState('');
  const [perfCostPost, setPerfCostPost] = useState('');
  const [perfQualityPre, setPerfQualityPre] = useState('');
  const [perfQualityPost, setPerfQualityPost] = useState('');
  const [perfCompliancePre, setPerfCompliancePre] = useState('');
  const [perfCompliancePost, setPerfCompliancePost] = useState('');
  // For varianceData, it might be better to calculate it on the fly or use useMemo
  // const [varianceData, setVarianceData] = useState({});
  const [perfInference, setPerfInference] = useState('');
  const [perfActionPlan, setPerfActionPlan] = useState('');


  // Sample chart data
  const chartData = [
    { name: 'Exp 1', temperature: 80, pressure: 2.2, ph: 7.1 },
    { name: 'Exp 2', temperature: 85, pressure: 2.5, ph: 7.2 },
    { name: 'Exp 3', temperature: 90, pressure: 2.8, ph: 7.3 },
    { name: 'Exp 4', temperature: 75, pressure: 2.0, ph: 6.9 },
    { name: 'Exp 5', temperature: 88, pressure: 2.6, ph: 7.4 },
  ];

  const addObservation = () => {
    if (newObservation.parameter && newObservation.value) {
      setObservations([
        ...observations,
        {
          id: Date.now().toString(),
          ...newObservation,
        },
      ]);
      setNewObservation({
        parameter: '',
        value: '',
        observation: '',
        date: new Date().toISOString().split('T')[0],
      });
      setShowAddObservation(false);
    }
  };

  const removeObservation = (id: string) => {
    setObservations(observations.filter(o => o.id !== id));
  };

  // Fluent UI columns for observations
  const observationColumns: IColumn[] = [
    { key: 'parameter', name: 'Parameter', fieldName: 'parameter', minWidth: 100, isResizable: true },
    { key: 'value', name: 'Value', fieldName: 'value', minWidth: 80, isResizable: true },
    {
      key: 'date',
      name: 'Date',
      fieldName: 'date',
      minWidth: 90,
      isResizable: true,
      onRender: (item: Observation) => new Date(item.date).toLocaleDateString(),
    },
    { key: 'observation', name: 'Observation', fieldName: 'observation', minWidth: 120, isResizable: true },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 40,
      maxWidth: 60,
      isResizable: false,
      onRender: (item: Observation) => (
        <IconButton
          iconProps={{ iconName: 'Delete' }}
          title="Remove"
          ariaLabel="Remove"
          onClick={() => removeObservation(item.id)}
        />
      ),
    },
  ];

  // Dropdown options
  const chartTypeOptions: IDropdownOption[] = [
    { key: 'bar', text: 'Bar Chart' },
    { key: 'line', text: 'Line Chart' },
    { key: 'scatter', text: 'Scatter Plot' },
  ];
  const viewModeOptions: IDropdownOption[] = [
    { key: 'chart', text: 'Chart View' },
    { key: 'table', text: 'Table View' },
  ];

  // Filter dropdowns (placeholders)
  const filterDateOptions: IDropdownOption[] = [
    { key: 'today', text: 'Today' },
    { key: 'week', text: 'This Week' },
    { key: 'month', text: 'This Month' },
    { key: 'all', text: 'All Time' },
  ];
  const filterProductOptions: IDropdownOption[] = [
    { key: 'product1', text: 'Product A' },
    { key: 'product2', text: 'Product B' },
    { key: 'product3', text: 'Product C' },
  ];
  const filterOwnerOptions: IDropdownOption[] = [
    { key: 'john', text: 'John Smith' },
    { key: 'sarah', text: 'Sarah Johnson' },
    { key: 'mike', text: 'Mike Davis' },
  ];

  // Dropdown options for DOE Registration
  const businessUnitOptions: IDropdownOption[] = [
    { key: 'rnd', text: 'R&D' },
    { key: 'manufacturing', text: 'Manufacturing' },
    { key: 'quality', text: 'Quality Assurance' },
    { key: 'logistics', text: 'Logistics' },
    { key: 'other', text: 'Other' },
  ];

  const themeOptions: IDropdownOption[] = [
    { key: 'process_optimization', text: 'Process Optimization' },
    { key: 'cost_reduction', text: 'Cost Reduction' },
    { key: 'quality_improvement', text: 'Quality Improvement' },
    { key: 'new_product_dev', text: 'New Product Development' },
    { key: 'sustainability', text: 'Sustainability' },
    { key: 'other', text: 'Other' },
  ];

  // Options for Activity Status Dropdown
  const activityStatusOptions: IDropdownOption[] = [
    { key: 'Not Started', text: 'Not Started' },
    { key: 'In Progress', text: 'In Progress' },
    { key: 'Completed', text: 'Completed' },
    { key: 'Delayed', text: 'Delayed' },
  ];

  const userRoleOptions: IDropdownOption[] = Object.keys(UserRole).map(role => ({
    key: UserRole[role as keyof typeof UserRole],
    text: UserRole[role as keyof typeof UserRole]
  }));

  // Columns for Activities DetailsList
  const activityColumns: IColumn[] = [
    { key: 'activityName', name: 'Activity Name', fieldName: 'activityName', minWidth: 150, isResizable: true },
    { key: 'assignedOwner', name: 'Assigned Owner', fieldName: 'assignedOwner', minWidth: 100, isResizable: true }, // TODO: Replace with People Picker column
    { key: 'plannedStartDate', name: 'Planned Start', fieldName: 'plannedStartDate', minWidth: 100, isResizable: true },
    { key: 'plannedEndDate', name: 'Planned End', fieldName: 'plannedEndDate', minWidth: 100, isResizable: true },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 100, isResizable: true },
    { key: 'dependencies', name: 'Dependencies', fieldName: 'dependencies', minWidth: 100, isResizable: true },
    { key: 'comments', name: 'Comments', fieldName: 'comments', minWidth: 150, isResizable: true },
    {
      key: 'actions',
      name: 'Actions',
      minWidth: 80,
      maxWidth: 100,
      isResizable: false,
      onRender: (item: IDOEActivity) => {
        // TODO: Implement actual check against Activity.assignedOwnerId and currentUserId for Activity_Owner
        // TODO: Implement actual check against DOE.ownerId for DOE_Owner role context
        const canAdmin = currentUserRole === UserRole.Admin;
        const isDoeOwner = currentUserRole === UserRole.DOE_Owner;
        const isActivityOwner = currentUserRole === UserRole.Activity_Owner && item.assignedOwner === currentUserId;

        const canEdit = canAdmin || isDoeOwner || isActivityOwner;
        // Typically, only Admins or DOE owners can delete activities. Activity owners might only update.
        const canDelete = canAdmin || isDoeOwner;

        return (
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <IconButton
              iconProps={{ iconName: 'Edit' }}
              title="Edit Activity"
              onClick={() => handleEditActivity(item)}
              disabled={!canEdit}
            />
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              title="Delete Activity"
              onClick={() => handleDeleteActivity(item.id)}
              disabled={!canDelete}
            />
          </Stack>
        );
      }
    },
  ];

  const handleAddNewActivity = () => {
    setIsEditingActivity(false);
    setCurrentActivity({ status: 'Not Started' }); // Default status
    setShowActivityPanel(true);
  };

  const handleEditActivity = (activity: IDOEActivity) => {
    setIsEditingActivity(true);
    setCurrentActivity({ ...activity });
    setShowActivityPanel(true);
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(prev => prev.filter(act => act.id !== activityId));
  };

  const onSaveActivity = () => {
    if (!currentActivity?.activityName) return; // Basic validation

    if (isEditingActivity) {
      setActivities(prev => prev.map(act => act.id === currentActivity.id ? { ...act, ...currentActivity } as IDOEActivity : act));
    } else {
      setActivities(prev => [...prev, { ...currentActivity, id: Date.now().toString() } as IDOEActivity]);
    }
    setShowActivityPanel(false);
    setCurrentActivity(undefined);
  };


  return (
    <Stack tokens={{ childrenGap: 24 }}>
      {/* 3. Add Temporary Role Switcher UI */}
      <Dropdown
        label="Current User Role (Test):"
        selectedKey={currentUserRole}
        options={userRoleOptions}
        onChange={(_, option) => setCurrentUserRole(option?.key as UserRole)}
        styles={{ root: { marginBottom: 20, maxWidth: 300, borderBottom: `1px solid ${themeVariant?.palette?.neutralLight}`, paddingBottom: 20 } }}
      />

      <Stack>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Design of Experiments
        </Text>
        <Text variant="medium" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
          Plan, execute, and analyze experimental procedures
        </Text>
      </Stack>

      {/* Experiment Details */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Experiment Configuration
        </Text>
        <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
          <TextField label="Experiment Title" placeholder="Enter experiment title" styles={{ root: { width: 250 } }} />
          <TextField label="Date" type="date" styles={{ root: { width: 250 } }} />
          <TextField label="Owner" placeholder="Experiment owner" styles={{ root: { width: 250 } }} />
          <TextField label="Product Name" placeholder="Product under test" styles={{ root: { width: 250 } }} />
          <TextField
            label="Objective"
            multiline
            rows={3}
            placeholder="Describe the experiment objective..."
            styles={{ root: { width: 520 } }}
          />
        </Stack>
      </Stack>

      {/* Experiment Inputs */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Experiment Inputs
        </Text>
        <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
          <TextField label="Factors" placeholder="Number of factors" type="number" styles={{ root: { width: 180 } }} />
          <TextField label="Levels" placeholder="Number of levels" type="number" styles={{ root: { width: 180 } }} />
          <TextField label="Trials" placeholder="Number of trials" type="number" styles={{ root: { width: 180 } }} />
          <TextField label="Repeats" placeholder="Number of repeats" type="number" styles={{ root: { width: 180 } }} />
        </Stack>
      </Stack>

      {/* Observations Section */}
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
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Observations
          </Text>
          <PrimaryButton
            text="Add Observation"
            iconProps={{ iconName: 'Add' }}
            onClick={() => setShowAddObservation(true)}
          />
        </Stack>
        <DetailsList
          items={observations}
          columns={observationColumns}
          compact
        />
        <Panel
          isOpen={showAddObservation}
          onDismiss={() => setShowAddObservation(false)}
          headerText="Add Observation"
          type={PanelType.smallFixedFar}
        >
          <Stack tokens={{ childrenGap: 12 }}>
            <TextField
              label="Parameter"
              value={newObservation.parameter}
              onChange={(_, v) => setNewObservation({ ...newObservation, parameter: v || '' })}
            />
            <TextField
              label="Value"
              value={newObservation.value}
              onChange={(_, v) => setNewObservation({ ...newObservation, value: v || '' })}
            />
            <TextField
              label="Date"
              type="date"
              value={newObservation.date}
              onChange={(_, v) => setNewObservation({ ...newObservation, date: v || '' })}
            />
            <TextField
              label="Observation"
              value={newObservation.observation}
              onChange={(_, v) => setNewObservation({ ...newObservation, observation: v || '' })}
            />
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <PrimaryButton text="Add" onClick={addObservation} />
              <DefaultButton text="Cancel" onClick={() => setShowAddObservation(false)} />
            </Stack>
          </Stack>
        </Panel>
      </Stack>

      {/* Visualizations */}
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
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Data Visualization
          </Text>
          <Stack horizontal tokens={{ childrenGap: 12 }}>
            <Dropdown
              label="View Mode"
              selectedKey={viewMode}
              options={viewModeOptions}
              onChange={(_, o) => setViewMode(o?.key as 'chart' | 'table')}
              styles={{ dropdown: { width: 140 } }}
            />
            {viewMode === 'chart' && (
              <Dropdown
                label="Chart Type"
                selectedKey={chartType}
                options={chartTypeOptions}
                onChange={(_, o) => setChartType(o?.key as 'bar' | 'line' | 'scatter')}
                styles={{ dropdown: { width: 140 } }}
              />
            )}
          </Stack>
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 12 }}>
          <Dropdown
            label="Filter by Date"
            options={filterDateOptions}
            styles={{ dropdown: { width: 160 } }}
          />
          <Dropdown
            label="Filter by Product"
            options={filterProductOptions}
            styles={{ dropdown: { width: 160 } }}
          />
          <Dropdown
            label="Filter by Owner"
            options={filterOwnerOptions}
            styles={{ dropdown: { width: 160 } }}
          />
        </Stack>
          <DetailsList
            items={chartData.map(item => ({
              name: item.name,
              temperature: `${item.temperature}°C`,
              pressure: `${item.pressure} bar`,
              ph: item.ph,
            }))}
            columns={[
              { key: 'name', name: 'Experiment', fieldName: 'name', minWidth: 100, isResizable: true },
              { key: 'temperature', name: 'Temperature', fieldName: 'temperature', minWidth: 100, isResizable: true },
              { key: 'pressure', name: 'Pressure', fieldName: 'pressure', minWidth: 100, isResizable: true },
              { key: 'ph', name: 'pH Level', fieldName: 'ph', minWidth: 100, isResizable: true },
            ]}
            compact
          />
      </Stack>

      {/* Action Buttons */}
      <Stack horizontal tokens={{ childrenGap: 12 }}>
        <PrimaryButton>
          <BarChart3 size={16} style={{ marginRight: 8 }} />
          Run Analysis
        </PrimaryButton>
        <DefaultButton>Export Data</DefaultButton>
        <PrimaryButton>Save Experiment</PrimaryButton>
      </Stack>

      {/* =============== DOE Tracking Sections Start =============== */}
      <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary, marginTop: 20 } }}>
        DOE Tracking
      </Text>

      {/* DOE Registration Section */}
      <Stack
        tokens={{ childrenGap: 16 }}
        styles={{
          root: {
            background: themeVariant?.palette?.white,
            border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
            borderRadius: 4,
            boxShadow: themeVariant?.effects?.elevation8,
            padding: 24,
            marginTop: 16
          },
        }}
      >
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          DOE Registration
        </Text>
        <Stack tokens={{ childrenGap: 12 }}>
          <TextField
            label="Title"
            placeholder="Enter DOE title"
            value={doeTitle}
            onChange={(_, newValue) => setDoeTitle(newValue || '')}
            disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
          />
          <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
            <Dropdown
              label="Business Unit/Department"
              placeholder="Select Business Unit"
              options={businessUnitOptions}
              selectedKey={doeBusinessUnit}
              onChange={(_, option) => setDoeBusinessUnit(option?.key)}
              styles={{ root: { width: 250 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
            <TextField
              label="Location"
              placeholder="Enter location"
              value={doeLocation}
              onChange={(_, newValue) => setDoeLocation(newValue || '')}
              styles={{ root: { width: 250 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
             <Dropdown
              label="Theme"
              placeholder="Select Theme"
              options={themeOptions}
              selectedKey={doeTheme}
              onChange={(_, option) => setDoeTheme(option?.key)}
              styles={{ root: { width: 250 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
          </Stack>
          <TextField
            label="Objective"
            multiline
            rows={3}
            placeholder="Describe the DOE objective"
            value={doeObjective}
            onChange={(_, newValue) => setDoeObjective(newValue || '')}
            disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
          />
          <TextField
            label="Hypotheses"
            multiline
            rows={3}
            placeholder="State the hypotheses"
            value={doeHypotheses}
            onChange={(_, newValue) => setDoeHypotheses(newValue || '')}
            disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
          />
          <Stack horizontal tokens={{ childrenGap: 16 }} styles={{root: {width: '100%'}}}>
            <TextField
              label="Success Criteria"
              multiline
              rows={3}
              placeholder="Define success criteria"
              value={doeSuccessCriteria}
              onChange={(_, newValue) => setDoeSuccessCriteria(newValue || '')}
              styles={{ root: { flexGrow: 1 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
            <TextField
              label="Failure Criteria"
              multiline
              rows={3}
              placeholder="Define failure criteria"
              value={doeFailureCriteria}
              onChange={(_, newValue) => setDoeFailureCriteria(newValue || '')}
              styles={{ root: { flexGrow: 1 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 16 }}>
            <TextField
              label="Start Date"
              type="date"
              value={doeStartDate}
              onChange={(_, newValue) => setDoeStartDate(newValue || '')}
              styles={{ root: { width: 250 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
            <TextField
              label="End Date"
              type="date"
              value={doeEndDate}
              onChange={(_, newValue) => setDoeEndDate(newValue || '')}
              styles={{ root: { width: 250 } }}
              disabled={currentUserRole === UserRole.Activity_Owner || currentUserRole === UserRole.Viewer}
            />
          </Stack>
          {/* // TODO: Implement actual check against DOE.ownerId and currentUserId for DOE_Owner role */}
          <PrimaryButton
            text="Save DOE"
            iconProps={{ iconName: 'Save' }}
            styles={{root: {width: 120, marginTop: 8}}}
            disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
          />
        </Stack>
      </Stack>

      {/* Activity Planning & Tracking Section */}
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
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
            Activity Planning & Tracking
          </Text>
          <PrimaryButton
            text="Add Activity"
            iconProps={{ iconName: 'Add' }}
            onClick={handleAddNewActivity}
            disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
          />
        </Stack>
        <DetailsList
          items={activities}
          columns={activityColumns}
          compact
          // selectionMode={SelectionMode.none} // Optional: if you don't need selection
          // setKey="activities" // Optional: for ensuring re-render on item change if needed
        />
      </Stack>

      {showActivityPanel && (
        <Panel
          isOpen={showActivityPanel}
          onDismiss={() => setShowActivityPanel(false)}
          headerText={isEditingActivity ? "Edit Activity" : "Add New Activity"}
          type={PanelType.medium} // Or smallFixedFar, medium, large, etc.
          closeButtonAriaLabel="Close"
          onRenderFooterContent={() => (
            <Stack horizontal tokens={{ childrenGap: 8 }} styles={{ root: { padding: '0 24px 16px' }}}>
              <PrimaryButton text="Save" onClick={onSaveActivity} />
              <DefaultButton text="Cancel" onClick={() => setShowActivityPanel(false)} />
            </Stack>
          )}
        >
          <Stack tokens={{ childrenGap: 12 }} styles={{ root: { padding: '16px 0' }}}>
            <TextField
              label="Activity Name"
              required
              value={currentActivity?.activityName || ''}
              onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, activityName: v || '' }))}
              disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
            />
            <TextField
              label="Assigned Owner"
              // TODO: Replace with People Picker for actual user selection from Employee Master
              value={currentActivity?.assignedOwner || ''}
              onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, assignedOwner: v || '' }))}
              disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner)} // Only Admin/DOE Owner can assign
            />
            <Stack horizontal tokens={{ childrenGap: 16 }}>
              <TextField
                label="Planned Start Date"
                type="date"
                value={currentActivity?.plannedStartDate || ''}
                onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, plannedStartDate: v || '' }))}
                styles={{ root: { flexGrow: 1 } }}
                disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
              />
              <TextField
                label="Planned End Date"
                type="date"
                value={currentActivity?.plannedEndDate || ''}
                onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, plannedEndDate: v || '' }))}
                styles={{ root: { flexGrow: 1 } }}
                disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
              />
            </Stack>
            <Dropdown
              label="Status"
              selectedKey={currentActivity?.status || 'Not Started'}
              options={activityStatusOptions}
              onChange={(_, o) => setCurrentActivity(prev => ({ ...prev, status: o?.key as IDOEActivity['status'] }))}
              // Activity Owner can typically change status of their own activities if isEditingActivity and currentActivity.assignedOwner === currentUserId
              disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
            />
            <TextField
              label="Dependencies"
              value={currentActivity?.dependencies || ''}
              onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, dependencies: v || '' }))}
              disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
            />
            <TextField
              label="Comments"
              multiline
              rows={3}
              value={currentActivity?.comments || ''}
              onChange={(_, v) => setCurrentActivity(prev => ({ ...prev, comments: v || '' }))}
              // Comments might be editable by more roles, or only specific ones. For now, similar to other fields for Activity Owner.
              disabled={!(currentUserRole === UserRole.Admin || currentUserRole === UserRole.DOE_Owner || (isEditingActivity && currentUserRole === UserRole.Activity_Owner && currentActivity?.assignedOwner === currentUserId))}
            />
          </Stack>
        </Panel>
      )}

      {/* Performance Evaluation Section */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Performance Evaluation
        </Text>
        <Stack tokens={{ childrenGap: 12 }}>
          {/* Headers */}
          <Stack horizontal tokens={{ childrenGap: 16 }} styles={{root: {paddingBottom: 8, borderBottom: `1px solid ${themeVariant?.palette?.neutralLight}`}}}>
            <Text styles={{root: {width: 200, fontWeight: 600}}}>Metric</Text>
            <Text styles={{root: {width: 120, fontWeight: 600}}}>Pre-Project</Text>
            <Text styles={{root: {width: 120, fontWeight: 600}}}>Post-Project</Text>
            <Text styles={{root: {width: 150, fontWeight: 600}}}>Variance (Abs)</Text>
            <Text styles={{root: {width: 150, fontWeight: 600}}}>Variance (%)</Text>
          </Stack>

          {/* Turnaround Time */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <Text styles={{root: {width: 200}}}>Turnaround Time (e.g., days)</Text>
            <TextField type="number" styles={{root: {width: 120}}} value={perfTurnaroundTimePre} onChange={(_,v)=>setPerfTurnaroundTimePre(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <TextField type="number" styles={{root: {width: 120}}} value={perfTurnaroundTimePost} onChange={(_,v)=>setPerfTurnaroundTimePost(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Text styles={{root: {width: 150}}}>
              {parseFloat(perfTurnaroundTimePost) - parseFloat(perfTurnaroundTimePre) || 'N/A'}
            </Text>
            <Text styles={{root: {width: 150}}}>
              {perfTurnaroundTimePre && parseFloat(perfTurnaroundTimePre) !== 0 ?
                (((parseFloat(perfTurnaroundTimePost) - parseFloat(perfTurnaroundTimePre)) / parseFloat(perfTurnaroundTimePre)) * 100).toFixed(2) + '%'
                : 'N/A'}
            </Text>
          </Stack>

          {/* Cost */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <Text styles={{root: {width: 200}}}>Cost (e.g., USD)</Text>
            <TextField type="number" styles={{root: {width: 120}}} value={perfCostPre} onChange={(_,v)=>setPerfCostPre(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <TextField type="number" styles={{root: {width: 120}}} value={perfCostPost} onChange={(_,v)=>setPerfCostPost(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Text styles={{root: {width: 150}}}>
              {parseFloat(perfCostPost) - parseFloat(perfCostPre) || 'N/A'}
            </Text>
            <Text styles={{root: {width: 150}}}>
              {perfCostPre && parseFloat(perfCostPre) !== 0 ?
                (((parseFloat(perfCostPost) - parseFloat(perfCostPre)) / parseFloat(perfCostPre)) * 100).toFixed(2) + '%'
                : 'N/A'}
            </Text>
          </Stack>

          {/* Quality */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <Text styles={{root: {width: 200}}}>Quality (e.g., % defects)</Text>
            <TextField type="number" styles={{root: {width: 120}}} value={perfQualityPre} onChange={(_,v)=>setPerfQualityPre(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <TextField type="number" styles={{root: {width: 120}}} value={perfQualityPost} onChange={(_,v)=>setPerfQualityPost(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Text styles={{root: {width: 150}}}>
              {parseFloat(perfQualityPost) - parseFloat(perfQualityPre) || 'N/A'}
            </Text>
            <Text styles={{root: {width: 150}}}>
              {perfQualityPre && parseFloat(perfQualityPre) !== 0 ?
                (((parseFloat(perfQualityPost) - parseFloat(perfQualityPre)) / parseFloat(perfQualityPre)) * 100).toFixed(2) + '%'
                : 'N/A'}
            </Text>
          </Stack>

          {/* Compliance */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
            <Text styles={{root: {width: 200}}}>Compliance (e.g., % adherence)</Text>
            <TextField type="number" styles={{root: {width: 120}}} value={perfCompliancePre} onChange={(_,v)=>setPerfCompliancePre(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <TextField type="number" styles={{root: {width: 120}}} value={perfCompliancePost} onChange={(_,v)=>setPerfCompliancePost(v||'')} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Text styles={{root: {width: 150}}}>
              {parseFloat(perfCompliancePost) - parseFloat(perfCompliancePre) || 'N/A'}
            </Text>
            <Text styles={{root: {width: 150}}}>
              {perfCompliancePre && parseFloat(perfCompliancePre) !== 0 ?
                (((parseFloat(perfCompliancePost) - parseFloat(perfCompliancePre)) / parseFloat(perfCompliancePre)) * 100).toFixed(2) + '%'
                : 'N/A'}
            </Text>
          </Stack>

          <TextField
            label="Inference / Reason for variance"
            multiline
            rows={4}
            value={perfInference}
            onChange={(_,v) => setPerfInference(v || '')}
            styles={{root: {marginTop: 16}}}
            disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
          />
          <TextField
            label="Final Outcome / Action Plan"
            multiline
            rows={4}
            value={perfActionPlan}
            onChange={(_,v) => setPerfActionPlan(v || '')}
            disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
          />
        </Stack>
      </Stack>

      {/* Visualization & Summary Section (Placeholders) */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Visualization & Summary
        </Text>
        <Text>Simple bar charts or side-by-side comparisons for before/after metrics will be shown here.</Text>
        <Text>Progress tracking at DOE level and activity level will be shown here.</Text>
      </Stack>

      {/* Dashboard & Reporting Section (Placeholders) */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Dashboard & Reporting Snippets
        </Text>
        <Text>Summary widgets (DOE count by Dept, Status) could be displayed here.</Text>
        <Text>Link/button to navigate to the full Reports Dashboard.</Text>
      </Stack>

      {/* File Upload Support (Placeholder) */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Supporting Files
        </Text>
        <Text>File upload for Excel/CSV (baseline metrics, post-project results) will be available here. (e.g. using Fluent UI FilePicker or similar)</Text>
      </Stack>

      {/* Tableau Embedding (Placeholder) */}
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
        <Text variant="large" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>
          Embedded Tableau Dashboard (Optional)
        </Text>
        <Text>An iframe for Tableau dashboards can be embedded here if a URL is provided.</Text>
      </Stack>

    </Stack>
    );
}
export default DesignOfExperiments;