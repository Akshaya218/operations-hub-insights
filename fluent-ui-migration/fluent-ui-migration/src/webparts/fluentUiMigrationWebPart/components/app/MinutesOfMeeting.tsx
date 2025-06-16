import * as React from 'react';
import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import type { IStyle } from '@fluentui/style-utilities'; // Import IStyle

// Import Fluent UI components
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Label } from '@fluentui/react/lib/Label'; // Label is used
import { Dropdown, type IDropdownOption } from '@fluentui/react/lib/Dropdown';

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

  // Styles
  const cardStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: themeVariant?.palette?.white || '#ffffff',
    border: `1px solid ${themeVariant?.palette?.neutralLighter || '#e0e0e0'}`,
    borderRadius: '4px',
    marginBottom: '20px',
    boxShadow: themeVariant?.effects?.elevation8 || '0 2px 4px rgba(0,0,0,0.1)'
  };
  const sectionHeaderStyle: React.CSSProperties = { fontSize: themeVariant?.fonts?.large?.fontSize || '18px', fontWeight: '600', color: themeVariant?.palette?.neutralPrimary || '#333', marginBottom: '16px' };

  // This style is passed to Fluent UI components' `styles` prop, so it should be IStyle or compatible.
  const inputGroupStyle: IStyle = { marginBottom: '16px' };
  const inputGroupSpan2Style: IStyle = { ...inputGroupStyle, gridColumn: 'span 2' }; // Example for a style that spans columns

  const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse' };
  const thStyle: React.CSSProperties = { textAlign: 'left', padding: '8px', borderBottom: `1px solid ${themeVariant?.palette?.neutralLight || '#ccc'}`, color: themeVariant?.palette?.neutralPrimary || '#333' };
  const tdStyle: React.CSSProperties = { padding: '8px', borderBottom: `1px solid ${themeVariant?.palette?.neutralLighter || '#eee'}`, color: themeVariant?.palette?.neutralSecondary || '#666' };

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

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{...sectionHeaderStyle, marginBottom: '4px'}}>Minutes of Meeting</h2>
        <p style={{color: themeVariant?.palette?.neutralSecondary || '#666'}}>Create and manage meeting minutes efficiently</p>
      </div>

      {/* Meeting Details */}
      <div style={cardStyle}>
        <h3 style={sectionHeaderStyle}>Meeting Details</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px'}}>
          <TextField label="Meeting Title" placeholder="Enter meeting title" styles={{ root: inputGroupStyle }} />
          <TextField label="Date & Time" type="datetime-local" styles={{ root: inputGroupStyle }} />
          <Dropdown label="Meeting Type" placeholder="Select type" options={meetingTypeOptions} styles={{ root: inputGroupStyle }} />
          <TextField label="Organizer" placeholder="Meeting organizer" styles={{ root: inputGroupStyle }} />
          <TextField label="Location" placeholder="Meeting location or link" styles={{ root: inputGroupSpan2Style }} />
        </div>
      </div>

      {/* Participants */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={sectionHeaderStyle}>Participants</h3>
          <PrimaryButton text="Add Participant" iconProps={{ iconName: 'AddFriend' }} onClick={() => setShowAddParticipant(!showAddParticipant)} />
        </div>
        {showAddParticipant && (
          <div style={{ padding: '16px', backgroundColor: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8', borderRadius: '4px', marginBottom: '16px' }}>
            <TextField label="Attendee Name" value={newParticipant.name} onChange={(_, v) => setNewParticipant({...newParticipant, name: v || ''})} styles={{ root: inputGroupStyle }} />
            <TextField label="Department" value={newParticipant.department} onChange={(_, v) => setNewParticipant({...newParticipant, department: v || ''})} styles={{ root: inputGroupStyle }} />
            <PrimaryButton text="Add" onClick={addParticipant} styles={{root: {marginRight: '8px'}}} />
            <DefaultButton text="Cancel" onClick={() => setShowAddParticipant(false)} />
          </div>
        )}
        {participants.map(p => (
          <div key={p.id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', backgroundColor: themeVariant?.palette?.neutralLighter || '#efefef', borderRadius: '4px', marginBottom: '8px'}}>
            <div><Label>{p.name}</Label><p style={{fontSize: '12px', color: themeVariant?.palette?.neutralSecondary || '#666'}}>{p.department}</p></div>
            <DefaultButton iconProps={{ iconName: 'Delete' }} onClick={() => removeParticipant(p.id)} title="Remove" />
          </div>
        ))}
      </div>

      {/* Agenda & Discussion */}
      <div style={cardStyle}>
        <h3 style={sectionHeaderStyle}>Agenda & Discussion</h3>
        <TextField label="Agenda Points" multiline rows={3} placeholder="List agenda points..." styles={{ root: inputGroupStyle }} />
        <TextField label="Summary" multiline rows={5} placeholder="Summarize discussions..." styles={{ root: inputGroupStyle }} />
        <TextField label="Raised By" placeholder="Who raised these points" styles={{ root: inputGroupStyle }} />
      </div>

      {/* Action Items */}
      <div style={cardStyle}>
         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={sectionHeaderStyle}>Action Items</h3>
            <PrimaryButton text="Add Action Item" iconProps={{ iconName: 'Add' }} onClick={() => setShowAddAction(!showAddAction)} />
        </div>
        {showAddAction && (
          <div style={{ padding: '16px', backgroundColor: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8', borderRadius: '4px', marginBottom: '16px' }}>
            <TextField label="Task" value={newAction.task} onChange={(_,v) => setNewAction({...newAction, task: v || ''})} styles={{ root: inputGroupStyle }} />
            <TextField label="Assigned To" value={newAction.assignedTo} onChange={(_,v) => setNewAction({...newAction, assignedTo: v || ''})} styles={{ root: inputGroupStyle }} />
            <TextField label="Due Date" type="date" value={newAction.dueDate} onChange={(_,v) => setNewAction({...newAction, dueDate: v || ''})} styles={{ root: inputGroupStyle }} />
            <Dropdown label="Priority" selectedKey={newAction.priority} options={priorityOptions} onChange={(_,o) => setNewAction({...newAction, priority: o?.key.toString() || 'Medium'})} styles={{ root: inputGroupStyle }} />
            <Dropdown label="Status" selectedKey={newAction.status} options={statusOptions} onChange={(_,o) => setNewAction({...newAction, status: o?.key.toString() || 'Pending'})} styles={{ root: inputGroupStyle }} />
            <PrimaryButton text="Add" onClick={addActionItem} styles={{root: {marginRight: '8px'}}}/>
            <DefaultButton text="Cancel" onClick={() => setShowAddAction(false)} />
          </div>
        )}
        <div style={{overflowX: 'auto'}}>
            <table style={tableStyle}>
                <thead><tr><th style={thStyle}>Task</th><th style={thStyle}>Assigned To</th><th style={thStyle}>Due Date</th><th style={thStyle}>Priority</th><th style={thStyle}>Status</th><th style={thStyle}>Actions</th></tr></thead>
                <tbody>
                {actionItems.map(item => (
                    <tr key={item.id}>
                    <td style={tdStyle}>{item.task}</td><td style={tdStyle}>{item.assignedTo}</td><td style={tdStyle}>{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td style={tdStyle}>{item.priority}</td><td style={tdStyle}>{item.status}</td>
                    <td style={tdStyle}><DefaultButton iconProps={{ iconName: 'Delete' }} onClick={() => removeActionItem(item.id)} title="Remove" /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* Follow-up & Action Buttons (simplified) */}
      <div style={cardStyle}>
        <h3 style={sectionHeaderStyle}>Follow-up</h3>
        <TextField label="Reference Meeting" placeholder="Previous meeting reference" styles={{ root: inputGroupStyle }}/>
         {/* ... other follow-up fields ... */}
      </div>
      <div style={{marginTop: '20px', display: 'flex', gap: '10px'}}>
        <PrimaryButton text="Save Minutes" />
        <DefaultButton text="Export to Excel" />
        <PrimaryButton text="Submit for Review" />
      </div>
    </div>
  );
};

export default MinutesOfMeeting;
