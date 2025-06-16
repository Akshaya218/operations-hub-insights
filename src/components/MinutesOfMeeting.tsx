
import React, { useState } from 'react';
import { Plus, Calendar, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

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

const MinutesOfMeeting: React.FC = () => {
  const [participants, setParticipants] = useState<Participant[]>([
    { id: '1', name: 'John Smith', department: 'Engineering' },
    { id: '2', name: 'Sarah Johnson', department: 'Quality' },
  ]);

  const [actionItems, setActionItems] = useState<ActionItem[]>([
    { 
      id: '1', 
      task: 'Review technical specifications', 
      assignedTo: 'John Smith', 
      dueDate: '2024-12-25', 
      priority: 'High', 
      status: 'In Progress' 
    },
    { 
      id: '2', 
      task: 'Prepare quality report', 
      assignedTo: 'Sarah Johnson', 
      dueDate: '2024-12-22', 
      priority: 'Medium', 
      status: 'Pending' 
    },
  ]);

  const [showAddParticipant, setShowAddParticipant] = useState(false);
  const [showAddAction, setShowAddAction] = useState(false);
  const [newParticipant, setNewParticipant] = useState({ name: '', department: '' });
  const [newAction, setNewAction] = useState({ 
    task: '', 
    assignedTo: '', 
    dueDate: '', 
    priority: 'Medium', 
    status: 'Pending' 
  });

  const addParticipant = () => {
    if (newParticipant.name && newParticipant.department) {
      setParticipants([...participants, {
        id: Date.now().toString(),
        ...newParticipant
      }]);
      setNewParticipant({ name: '', department: '' });
      setShowAddParticipant(false);
    }
  };

  const addActionItem = () => {
    if (newAction.task && newAction.assignedTo && newAction.dueDate) {
      setActionItems([...actionItems, {
        id: Date.now().toString(),
        ...newAction
      }]);
      setNewAction({ task: '', assignedTo: '', dueDate: '', priority: 'Medium', status: 'Pending' });
      setShowAddAction(false);
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(participants.filter(p => p.id !== id));
  };

  const removeActionItem = (id: string) => {
    setActionItems(actionItems.filter(a => a.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-orange-600 bg-orange-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-50';
      case 'In Progress': return 'text-blue-600 bg-blue-50';
      case 'Pending': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-1">Minutes of Meeting</h2>
        <p className="text-sharepoint-gray-600">Create and manage meeting minutes efficiently</p>
      </div>

      {/* Meeting Details */}
      <div className="sharepoint-card">
        <h3 className="text-lg font-semibold text-sharepoint-gray-800 mb-4">Meeting Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="meetingTitle">Meeting Title</Label>
            <Input 
              id="meetingTitle" 
              placeholder="Enter meeting title"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="meetingDate">Date & Time</Label>
            <Input 
              id="meetingDate" 
              type="datetime-local"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="meetingType">Meeting Type</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standup">Daily Standup</SelectItem>
                <SelectItem value="review">Project Review</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="retrospective">Retrospective</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="organizer">Organizer</Label>
            <Input 
              id="organizer" 
              placeholder="Meeting organizer"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="location">Location</Label>
            <Input 
              id="location" 
              placeholder="Meeting location or link"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="sharepoint-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-sharepoint-gray-800">Participants</h3>
          <Button 
            onClick={() => setShowAddParticipant(!showAddParticipant)}
            className="sharepoint-button-primary"
          >
            <Plus size={16} className="mr-2" />
            Add Participant
          </Button>
        </div>

        {showAddParticipant && (
          <div className="mb-4 p-4 bg-sharepoint-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Attendee Name</Label>
                <Input 
                  value={newParticipant.name}
                  onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                  placeholder="Enter name"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Department</Label>
                <Input 
                  value={newParticipant.department}
                  onChange={(e) => setNewParticipant({...newParticipant, department: e.target.value})}
                  placeholder="Enter department"
                  className="mt-1"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button onClick={addParticipant} className="sharepoint-button-primary">Add</Button>
              <Button 
                onClick={() => setShowAddParticipant(false)} 
                className="sharepoint-button-secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-2">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center justify-between p-3 bg-sharepoint-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-sharepoint-gray-800">{participant.name}</p>
                <p className="text-sm text-sharepoint-gray-600">{participant.department}</p>
              </div>
              <Button
                onClick={() => removeParticipant(participant.id)}
                className="text-red-600 hover:bg-red-50 p-1"
                variant="ghost"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda & Discussion */}
      <div className="sharepoint-card">
        <h3 className="text-lg font-semibold text-sharepoint-gray-800 mb-4">Agenda & Discussion</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="agendaPoints">Agenda Points</Label>
            <Textarea 
              id="agendaPoints"
              placeholder="List the agenda points for this meeting..."
              className="mt-1 h-24"
            />
          </div>
          <div>
            <Label htmlFor="summary">Summary</Label>
            <Textarea 
              id="summary"
              placeholder="Summarize the key discussions and decisions..."
              className="mt-1 h-32"
            />
          </div>
          <div>
            <Label htmlFor="raisedBy">Raised By</Label>
            <Input 
              id="raisedBy" 
              placeholder="Who raised these points"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="sharepoint-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-sharepoint-gray-800">Action Items</h3>
          <Button 
            onClick={() => setShowAddAction(!showAddAction)}
            className="sharepoint-button-primary"
          >
            <Plus size={16} className="mr-2" />
            Add Action Item
          </Button>
        </div>

        {showAddAction && (
          <div className="mb-4 p-4 bg-sharepoint-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>Task</Label>
                <Input 
                  value={newAction.task}
                  onChange={(e) => setNewAction({...newAction, task: e.target.value})}
                  placeholder="Enter task description"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Assigned To</Label>
                <Input 
                  value={newAction.assignedTo}
                  onChange={(e) => setNewAction({...newAction, assignedTo: e.target.value})}
                  placeholder="Assign to"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Due Date</Label>
                <Input 
                  type="date"
                  value={newAction.dueDate}
                  onChange={(e) => setNewAction({...newAction, dueDate: e.target.value})}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Priority</Label>
                <Select value={newAction.priority} onValueChange={(value) => setNewAction({...newAction, priority: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={newAction.status} onValueChange={(value) => setNewAction({...newAction, status: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex space-x-2 mt-3">
              <Button onClick={addActionItem} className="sharepoint-button-primary">Add</Button>
              <Button 
                onClick={() => setShowAddAction(false)} 
                className="sharepoint-button-secondary"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-sharepoint-gray-200">
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Task</th>
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Assigned To</th>
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Due Date</th>
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Priority</th>
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Status</th>
                <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {actionItems.map((item) => (
                <tr key={item.id} className="border-b border-sharepoint-gray-100 hover:bg-sharepoint-gray-50">
                  <td className="p-3 text-sharepoint-gray-800">{item.task}</td>
                  <td className="p-3 text-sharepoint-gray-800">{item.assignedTo}</td>
                  <td className="p-3 text-sharepoint-gray-800">
                    {new Date(item.dueDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-sm text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Button
                      onClick={() => removeActionItem(item.id)}
                      className="text-red-600 hover:bg-red-50 p-1"
                      variant="ghost"
                    >
                      <X size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Follow-up */}
      <div className="sharepoint-card">
        <h3 className="text-lg font-semibold text-sharepoint-gray-800 mb-4">Follow-up</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="referenceMeeting">Reference Meeting</Label>
            <Input 
              id="referenceMeeting" 
              placeholder="Previous meeting reference"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="closureConfirmation">Closure Confirmation</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="na">Not Applicable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3">
        <Button className="sharepoint-button-primary">
          Save Minutes
        </Button>
        <Button className="sharepoint-button-secondary">
          Export to Excel
        </Button>
        <Button className="sharepoint-button-primary">
          Submit for Review
        </Button>
      </div>
    </div>
  );
};

export default MinutesOfMeeting;
