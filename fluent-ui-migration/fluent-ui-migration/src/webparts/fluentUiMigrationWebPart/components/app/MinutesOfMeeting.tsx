import * as React from 'react';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import type { IStyle } from '@fluentui/style-utilities';

import { PrimaryButton, DefaultButton, Stack, Text, Dropdown, IDropdownOption, TextField, DetailsList, IColumn, IconButton, Panel, PanelType } from '@fluentui/react';

interface Participant {
  id: string;
  name: string;
  department: string;
}

interface ActionItem {
  id: string;
  task: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  status: string;
}

interface MinutesOfMeetingProps {
  themeVariant?: IReadonlyTheme;
}

const MinutesOfMeeting: React.FC<MinutesOfMeetingProps> = ({ themeVariant }) => {
  const [participants, setParticipants] = React.useState<Participant[]>([
    { id: '1', name: 'John Smith', department: 'Engineering' },
    { id: '2', name: 'Sarah Johnson', department: 'Quality' },
  ]);

  const [actionItems, setActionItems] = React.useState<ActionItem[]>([
    { id: '1', task: 'Review technical specifications', assignedTo: 'John Smith', dueDate: '2024-12-25', priority: 'High', status: 'In Progress' },
    { id: '2', task: 'Prepare quality report', assignedTo: 'Sarah Johnson', dueDate: '2024-12-22', priority: 'Medium', status: 'Pending' },
  ]);

  const [showAddParticipant, setShowAddParticipant] = React.useState(false);
  const [showAddAction, setShowAddAction] = React.useState(false);
  const [newParticipant, setNewParticipant] = React.useState({ name: '', department: '' });
  const [newAction, setNewAction] = React.useState({ task: '', assignedTo: '', dueDate: '', priority: 'Medium', status: 'Pending' });

  const addParticipant = () => {
    if (newParticipant.name && newParticipant.department) {
      setParticipants([...participants, { id: Date.now().toString(), ...newParticipant }]);
      setNewParticipant({ name: '', department: '' });
      setShowAddParticipant(false);
    }
  };

  const addActionItem = () => {
    if (newAction.task && newAction.assignedTo && newAction.dueDate) {
      setActionItems([...actionItems, { id: Date.now().toString(), ...newAction }]);
      setNewAction({ task: '', assignedTo: '', dueDate: '', priority: 'Medium', status: 'Pending' });
      setShowAddAction(false);
    }
  };

  const removeParticipant = (id: string) => setParticipants(participants.filter(p => p.id !== id));
  const removeActionItem = (id: string) => setActionItems(actionItems.filter(a => a.id !== id));

  const priorityOptions: IDropdownOption[] = [
    { key: 'Low', text: 'Low' }, { key: 'Medium', text: 'Medium' }, { key: 'High', text: 'High' }
  ];
  const statusOptions: IDropdownOption[] = [
    { key: 'Pending', text: 'Pending' }, { key: 'In Progress', text: 'In Progress' }, { key: 'Completed', text: 'Completed' }
  ];
  const meetingTypeOptions: IDropdownOption[] = [
    { key: 'standup', text: 'Daily Standup' },
    { key: 'review', text: 'Project Review' },
    { key: 'planning', text: 'Planning' },
    { key: 'retrospective', text: 'Retrospective' },
  ];

  // Fluent UI DetailsList columns for Action Items
  const actionColumns: IColumn[] = [
    { key: 'task', name: 'Task', fieldName: 'task', minWidth: 120, isResizable: true },
    { key: 'assignedTo', name: 'Assigned To', fieldName: 'assignedTo', minWidth: 100, isResizable: true },
    { key: 'dueDate', name: 'Due Date', fieldName: 'dueDate', minWidth: 90, isResizable: true, onRender: (item: ActionItem) => new Date(item.dueDate).toLocaleDateString() },
    { key: 'priority', name: 'Priority', fieldName: 'priority', minWidth: 70, isResizable: true },
    { key: 'status', name: 'Status', fieldName: 'status', minWidth: 90, isResizable: true },
    {
      key: 'actions', name: 'Actions', minWidth: 40, maxWidth: 60, isResizable: false,
      onRender: (item: ActionItem) => (
        <IconButton iconProps={{ iconName: 'Delete' }} title="Remove" ariaLabel="Remove" onClick={() => removeActionItem(item.id)} />
      )
    }
  ];

  // Fluent UI DetailsList columns for Participants
  const participantColumns: IColumn[] = [
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 120, isResizable: true },
    { key: 'department', name: 'Department', fieldName: 'department', minWidth: 100, isResizable: true },
    {
      key: 'actions', name: 'Actions', minWidth: 40, maxWidth: 60, isResizable: false,
      onRender: (item: Participant) => (
        <IconButton iconProps={{ iconName: 'Delete' }} title="Remove" ariaLabel="Remove" onClick={() => removeParticipant(item.id)} />
      )
    }
  ];

  // Styles using Fluent UI's Stack tokens and styles
  const cardTokens = { childrenGap: 16, padding: 24 };
  const sectionHeaderStyles: IStyle = { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary, marginBottom: 4 };
  const cardStyles = {
    root: {
      background: themeVariant?.palette?.white,
      border: `1px solid ${themeVariant?.palette?.neutralLighter}`,
      borderRadius: 4,
      boxShadow: themeVariant?.effects?.elevation8,
      marginBottom: 24,
      width: '100%',
      maxWidth: '100%',
    }
  };

  return (
    <Stack tokens={{ childrenGap: 24 }}>
      <Stack>
        <Text variant="xLarge" styles={{ root: { fontWeight: 600, color: themeVariant?.palette?.neutralPrimary } }}>Minutes of Meeting</Text>
        <Text variant="medium" styles={{ root: { color: themeVariant?.palette?.neutralSecondary } }}>
          Create and manage meeting minutes efficiently
        </Text>
      </Stack>

      {/* Meeting Details */}
      <Stack styles={cardStyles} tokens={cardTokens}>
        <Text variant="large" styles={{ root: sectionHeaderStyles }}>Meeting Details</Text>
        <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
          <TextField label="Meeting Title" placeholder="Enter meeting title" styles={{ root: { width: 250 } }} />
          <TextField label="Date & Time" type="datetime-local" styles={{ root: { width: 250 } }} />
          <Dropdown label="Meeting Type" placeholder="Select type" options={meetingTypeOptions} styles={{ root: { width: 250 } }} />
          <TextField label="Organizer" placeholder="Meeting organizer" styles={{ root: { width: 250 } }} />
          <TextField label="Location" placeholder="Meeting location or link" styles={{ root: { width: 520 } }} />
        </Stack>
      </Stack>

      {/* Participants */}
      <Stack styles={cardStyles} tokens={cardTokens}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: sectionHeaderStyles }}>Participants</Text>
          <PrimaryButton text="Add Participant" iconProps={{ iconName: 'AddFriend' }} onClick={() => setShowAddParticipant(true)} />
        </Stack>
        <DetailsList
          items={participants}
          columns={participantColumns}
          styles={{ root: { marginBottom: 8 } }}
          compact
        />
        <Panel
          isOpen={showAddParticipant}
          onDismiss={() => setShowAddParticipant(false)}
          headerText="Add Participant"
          type={PanelType.smallFixedFar}
        >
          <Stack tokens={{ childrenGap: 12 }}>
            <TextField label="Attendee Name" value={newParticipant.name} onChange={(_, v) => setNewParticipant({ ...newParticipant, name: v || '' })} />
            <TextField label="Department" value={newParticipant.department} onChange={(_, v) => setNewParticipant({ ...newParticipant, department: v || '' })} />
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <PrimaryButton text="Add" onClick={addParticipant} />
              <DefaultButton text="Cancel" onClick={() => setShowAddParticipant(false)} />
            </Stack>
          </Stack>
        </Panel>
      </Stack>

      {/* Agenda & Discussion */}
      <Stack styles={cardStyles} tokens={cardTokens}>
        <Text variant="large" styles={{ root: sectionHeaderStyles }}>Agenda & Discussion</Text>
        <TextField label="Agenda Points" multiline rows={3} placeholder="List agenda points..." />
        <TextField label="Summary" multiline rows={5} placeholder="Summarize discussions..." />
        <TextField label="Raised By" placeholder="Who raised these points" />
      </Stack>

      {/* Action Items */}
      <Stack styles={cardStyles} tokens={cardTokens}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
          <Text variant="large" styles={{ root: sectionHeaderStyles }}>Action Items</Text>
          <PrimaryButton text="Add Action Item" iconProps={{ iconName: 'Add' }} onClick={() => setShowAddAction(true)} />
        </Stack>
        <DetailsList
          items={actionItems}
          columns={actionColumns}
          styles={{ root: { marginBottom: 8 } }}
          compact
        />
        <Panel
          isOpen={showAddAction}
          onDismiss={() => setShowAddAction(false)}
          headerText="Add Action Item"
          type={PanelType.smallFixedFar}
        >
          <Stack tokens={{ childrenGap: 12 }}>
            <TextField label="Task" value={newAction.task} onChange={(_, v) => setNewAction({ ...newAction, task: v || '' })} />
            <TextField label="Assigned To" value={newAction.assignedTo} onChange={(_, v) => setNewAction({ ...newAction, assignedTo: v || '' })} />
            <TextField label="Due Date" type="date" value={newAction.dueDate} onChange={(_, v) => setNewAction({ ...newAction, dueDate: v || '' })} />
            <Dropdown label="Priority" selectedKey={newAction.priority} options={priorityOptions} onChange={(_, o) => setNewAction({ ...newAction, priority: o?.key.toString() || 'Medium' })} />
            <Dropdown label="Status" selectedKey={newAction.status} options={statusOptions} onChange={(_, o) => setNewAction({ ...newAction, status: o?.key.toString() || 'Pending' })} />
            <Stack horizontal tokens={{ childrenGap: 8 }}>
              <PrimaryButton text="Add" onClick={addActionItem} />
              <DefaultButton text="Cancel" onClick={() => setShowAddAction(false)} />
            </Stack>
          </Stack>
        </Panel>
      </Stack>

      {/* Follow-up & Action Buttons */}
      <Stack styles={cardStyles} tokens={cardTokens}>
        <Text variant="large" styles={{ root: sectionHeaderStyles }}>Follow-up</Text>
        <TextField label="Reference Meeting" placeholder="Previous meeting reference" />
      </Stack>
      <Stack horizontal tokens={{ childrenGap: 12 }}>
        <PrimaryButton text="Save Minutes" />
        <DefaultButton text="Export to Excel" />
        <PrimaryButton text="Submit for Review" />
      </Stack>
    </Stack>
  );
};

export default MinutesOfMeeting;
