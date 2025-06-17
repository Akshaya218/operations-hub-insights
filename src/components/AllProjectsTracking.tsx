import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
    Search, Filter, Link as LinkIcon,
    FileText, Sheet, Send, Clock4,
    Activity, TrendingUp, AlertTriangle, Bell, CalendarClock, XCircle, Info,
    UploadCloud, DownloadCloud, FileUp
} from 'lucide-react'; // Removed duplicate Download
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

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
    description: 'Develop and launch the new employee HR portal with updated features and UI.'
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
    description: 'Update the company-wide risk assessment framework to align with new regulations.'
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
    description: 'A project to improve operational efficiency by 20% through process automation.'
  }
];

const AllProjectsTracking: React.FC = () => {
  const getStatusBadgeVariant = (status: Project['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Completed': return 'default';
      case 'In Progress': return 'secondary';
      case 'Planning': return 'outline';
      case 'On Hold': return 'outline';
      case 'Cancelled': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter & Search Panel */}
      <div className="sharepoint-card p-4 md:p-6">
        <h2 className="text-lg font-semibold text-sharepoint-gray-800 mb-4 flex items-center">
          <Filter size={20} className="mr-2" />
          Filter & Search Panel
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <div>
            <Label htmlFor="projectOwner" className="text-sm font-medium text-sharepoint-gray-700">Project Owner</Label>
            <Input id="projectOwner" placeholder="Name or employee code" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="department" className="text-sm font-medium text-sharepoint-gray-700">Department/Function</Label>
            <Select>
              <SelectTrigger id="department" className="mt-1">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">HR</SelectItem>
                <SelectItem value="risk">Risk</SelectItem>
                <SelectItem value="tech">Tech</SelectItem>
                <SelectItem value="ops">Ops</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status" className="text-sm font-medium text-sharepoint-gray-700">Status</Label>
            <Select>
              <SelectTrigger id="status" className="mt-1">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="inProgress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="onHold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="startDate" className="text-sm font-medium text-sharepoint-gray-700">Start Date</Label>
            <Input type="date" id="startDate" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="endDate" className="text-sm font-medium text-sharepoint-gray-700">End Date</Label>
            <Input type="date" id="endDate" className="mt-1" />
          </div>
          <div>
            <Label htmlFor="dueDate" className="text-sm font-medium text-sharepoint-gray-700">Due Date</Label>
            <Input type="date" id="dueDate" className="mt-1" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="sharepoint-button">
            <Search size={16} className="mr-2" />
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Project Records List */}
      <div>
        <h3 className="text-xl font-semibold text-sharepoint-gray-800 mb-4">Project Records</h3>
        {sampleProjects.length === 0 ? (
          <p className="text-sharepoint-gray-600">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleProjects.map((project) => (
              <Card key={project.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-sharepoint-blue">{project.projectName}</CardTitle>
                  <CardDescription>Owner: {project.projectOwner} ({project.employeeCode})</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-sharepoint-gray-700 flex-grow">
                  <p><strong>Department:</strong> {project.department}</p>
                  <div>
                    <strong>Status:</strong>{' '}
                    <Badge variant={getStatusBadgeVariant(project.status)}>{project.status}</Badge>
                  </div>
                  <p><strong>Dates:</strong> {project.startDate} to {project.endDate} (Due: {project.dueDate})</p>
                  <p className="text-xs mt-1">{project.description}</p>
                </CardContent>
                {project.linkedMeetingReference && (
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full sharepoint-button-secondary"
                      onClick={() => alert(`Navigate to MoM: ${project.linkedMeetingReference}`)}
                    >
                      <LinkIcon size={14} className="mr-2" />
                      View Linked MoM ({project.linkedMeetingReference})
                    </Button>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Report Generator Section */}
      <div className="sharepoint-card p-4 md:p-6">
        <h3 className="text-xl font-semibold text-sharepoint-gray-800 mb-4 flex items-center">
          <Sheet size={20} className="mr-2" />
          Report Generator
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Column 1: Scheduling & Role */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="reportSchedule" className="text-sm font-medium text-sharepoint-gray-700 block mb-1">Report Schedule Time</Label>
              <Input type="datetime-local" id="reportSchedule" className="mt-1" />
            </div>
            <div>
              <Label htmlFor="reportRecurrence" className="text-sm font-medium text-sharepoint-gray-700 block mb-1">Recurrence</Label>
              <Select>
                <SelectTrigger id="reportRecurrence" className="mt-1">
                  <SelectValue placeholder="Select Recurrence" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div>
              <Label htmlFor="reportRole" className="text-sm font-medium text-sharepoint-gray-700 block mb-1">Role-based View</Label>
              <Select>
                <SelectTrigger id="reportRole" className="mt-1">
                  <SelectValue placeholder="Select View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cxo">Summary for CXOs</SelectItem>
                  <SelectItem value="pm">Detailed for PMs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="sharepoint-button w-full mt-2">
              <Clock4 size={16} className="mr-2" />
              Schedule Report Job
            </Button>
          </div>

          {/* Column 2: Content Info, Export & Email */}
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-sharepoint-gray-700">Report Content Includes:</p>
              <ul className="list-disc list-inside text-xs text-sharepoint-gray-600">
                <li>% Complete</li>
                <li>Action Items</li>
                <li>Timeline Deviation</li>
                <li>Blockers</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-sharepoint-gray-700">Export Options:</p>
              <div className="flex space-x-2">
                <Button variant="outline" className="sharepoint-button-secondary flex-1">
                  <FileText size={16} className="mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline" className="sharepoint-button-secondary flex-1">
                  <Sheet size={16} className="mr-2" />
                  Export as Excel
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="reportEmail" className="text-sm font-medium text-sharepoint-gray-700 block mb-1">Email Report To</Label>
              <Input type="email" id="reportEmail" placeholder="Enter email addresses" className="mt-1" />
              <Button className="sharepoint-button w-full mt-2">
                <Send size={16} className="mr-2" />
                Schedule Email Delivery
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Health Dashboard Section */}
      <div className="sharepoint-card p-4 md:p-6">
        <h3 className="text-xl font-semibold text-sharepoint-gray-800 mb-4 flex items-center">
          <Activity size={20} className="mr-2" />
          Live Health Dashboard
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Traffic Light Summary */}
          <div className="md:col-span-1 space-y-2">
            <h4 className="text-md font-semibold text-sharepoint-gray-700 mb-2">Project Status Overview</h4>
            <div className="flex items-center p-2 bg-green-100 rounded">
              <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700 font-medium">On Track: 15 Projects</span>
            </div>
            <div className="flex items-center p-2 bg-yellow-100 rounded">
              <div className="w-4 h-4 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-yellow-700 font-medium">At Risk: 5 Projects</span>
            </div>
            <div className="flex items-center p-2 bg-red-100 rounded">
              <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-red-700 font-medium">Delayed: 3 Projects</span>
            </div>
          </div>

          {/* KPIs */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-md font-semibold text-sharepoint-gray-700 mb-2">Key Performance Indicators</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 p-2 border border-sharepoint-gray-200 rounded">
              <div className="text-sm">
                <p className="font-medium text-sharepoint-gray-700">Milestone Completion %:</p>
                <p className="text-lg font-semibold text-sharepoint-blue">75%</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-sharepoint-gray-700">Delay Trends:</p>
                <p className="text-lg font-semibold text-red-600">+3 days</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-sharepoint-gray-700">Open Critical Items:</p>
                <p className="text-lg font-semibold text-yellow-600">12</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-sharepoint-gray-700">Projects On Budget:</p>
                <p className="text-lg font-semibold text-green-600">85%</p>
              </div>
            </div>
             <p className="text-xs text-sharepoint-gray-500 mt-2">
                <Info size={14} className="inline mr-1" />
                Drill-down from project list: Project → Task → Owner. (Future functionality)
              </p>
          </div>
        </div>

        {/* Alerts Section */}
        <div>
          <h4 className="text-md font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <Bell size={18} className="mr-2" />
            Recent Alerts
          </h4>
          <div className="space-y-3">
            <Alert variant="default">
              <CalendarClock className="h-4 w-4" />
              <AlertTitle>Upcoming Deadline</AlertTitle>
              <AlertDescription>
                'New HR Portal Development - Phase 2' is due in 3 days.
              </AlertDescription>
            </Alert>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Overdue Task</AlertTitle>
              <AlertDescription>
                Task 'Requirement Finalization on Risk Assessment Framework Update' is 2 days overdue.
              </AlertDescription>
            </Alert>
            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Blocked Work</AlertTitle>
              <AlertDescription>
                'Operations Efficiency Drive - Integration Step' is currently blocked by dependency on Team Gamma.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>

      {/* Bulk Upload Section */}
      <div className="sharepoint-card p-4 md:p-6">
        <h3 className="text-xl font-semibold text-sharepoint-gray-800 mb-4 flex items-center">
          <UploadCloud size={20} className="mr-2" />
          Bulk Project Upload
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Column 1: Download Template & Info */}
          <div className="space-y-3">
            <p className="text-sm text-sharepoint-gray-600">
              Use the provided template to prepare your project data for bulk import.
              Ensure all required fields are correctly formatted.
            </p>
            <Button variant="outline" className="w-full sharepoint-button-secondary">
              <DownloadCloud size={16} className="mr-2" />
              Download CSV/Excel Template
            </Button>
            <p className="text-xs text-sharepoint-gray-500 mt-2">
              Note: Uploaded files will be validated. A preview of the data will be shown before final import.
            </p>
          </div>

          {/* Column 2: Upload Panel Placeholder */}
          <div className="space-y-3">
            <div className="border-2 border-dashed border-sharepoint-gray-300 rounded-md p-6 text-center">
              <Label htmlFor="bulkUploadFile" className="cursor-pointer">
                <FileUp size={32} className="mx-auto text-sharepoint-gray-500 mb-2" />
                <p className="text-sm text-sharepoint-gray-600">
                  Drag & drop CSV/Excel file here, or <span className="text-sharepoint-blue font-semibold">click to browse</span>.
                </p>
                <Input type="file" id="bulkUploadFile" className="sr-only" />
              </Label>
            </div>
            <Button className="w-full sharepoint-button mt-2">
              <UploadCloud size={16} className="mr-2" />
              Upload Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectsTracking;
