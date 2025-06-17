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

  return (
    <Stack tokens={{ childrenGap: 24 }}>
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
    </Stack>
    );
}
export default DesignOfExperiments;