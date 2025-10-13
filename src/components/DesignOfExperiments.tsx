
import React, { useState } from 'react';
import { Plus, BarChart3, X, Calendar, Save, ListPlus, Calculator, PieChart as Presentation, LayoutDashboard, UploadCloud, AreaChart, UserCircle } from 'lucide-react'; // Renamed PieChart to Presentation
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ScatterChart, Scatter } from 'recharts';

interface Observation {
  id: string;
  parameter: string;
  value: string;
  observation: string;
  date: string;
}

// 1. Define UserRoles
export enum UserRole { // Exported for testing
  Admin = 'Admin',
  DOE_Owner = 'DOE Owner',
  Activity_Owner = 'Activity Owner',
  Viewer = 'Viewer',
}

const DesignOfExperiments: React.FC = () => {
  // 2. Mock Current User and Role
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.Admin);
  const [currentUserId, setCurrentUserId] = useState<string>('user123'); // Mock current user's ID (e.g. from SharePoint context)

  const [observations, setObservations] = useState<Observation[]>([
    { 
      id: '1', 
      parameter: 'Temperature', 
      value: '85°C', 
      observation: 'Optimal range maintained',
      date: '2024-12-15'
    },
    { 
      id: '2', 
      parameter: 'Pressure', 
      value: '2.5 bar', 
      observation: 'Slight deviation observed',
      date: '2024-12-16'
    },
    { 
      id: '3', 
      parameter: 'pH Level', 
      value: '7.2', 
      observation: 'Within acceptable limits',
      date: '2024-12-17'
    },
  ]);

  const [showAddObservation, setShowAddObservation] = useState(false);
  const [newObservation, setNewObservation] = useState({
    parameter: '',
    value: '',
    observation: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [chartType, setChartType] = useState<'bar' | 'line' | 'scatter'>('bar');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [showExistingDoe, setShowExistingDoe] = useState(false);

  // State for DOE Registration
  const [doeTitle, setDoeTitle] = useState('');
  const [doeBusinessUnit, setDoeBusinessUnit] = useState('');
  const [doeLocation, setDoeLocation] = useState('');
  const [doeTheme, setDoeTheme] = useState('');
  const [doeObjective, setDoeObjective] = useState('');
  const [doeHypotheses, setDoeHypotheses] = useState('');
  const [doeSuccessCriteria, setDoeSuccessCriteria] = useState('');
  const [doeFailureCriteria, setDoeFailureCriteria] = useState('');
  const [doeStartDate, setDoeStartDate] = useState('');
  const [doeEndDate, setDoeEndDate] = useState('');

  // State for Activity Planning & Tracking
  interface Activity {
    id: string;
    name: string;
    owner: string;
    plannedStart: string;
    plannedEnd: string;
    status: string;
    dependencies: string;
    comments: string;
  }
  const [activities, setActivities] = useState<Activity[]>([]);
  // TODO: Add state for new activity form modal/inline visibility and fields

  // State for Performance Evaluation
  const [perfTurnaroundTimePre, setPerfTurnaroundTimePre] = useState('');
  const [perfTurnaroundTimePost, setPerfTurnaroundTimePost] = useState('');
  const [perfCostPre, setPerfCostPre] = useState('');
  const [perfCostPost, setPerfCostPost] = useState('');
  const [perfQualityPre, setPerfQualityPre] = useState('');
  const [perfQualityPost, setPerfQualityPost] = useState('');
  const [perfCompliancePre, setPerfCompliancePre] = useState('');
  const [perfCompliancePost, setPerfCompliancePost] = useState('');
  const [perfInference, setPerfInference] = useState('');
  const [perfOutcome, setPerfOutcome] = useState('');


  // Sample chart data
  const chartData = [
    { name: 'Exp 1', temperature: 80, pressure: 2.2, ph: 7.1 },
    { name: 'Exp 2', temperature: 85, pressure: 2.5, ph: 7.2 },
    { name: 'Exp 3', temperature: 90, pressure: 2.8, ph: 7.3 },
    { name: 'Exp 4', temperature: 75, pressure: 2.0, ph: 6.9 },
    { name: 'Exp 5', temperature: 88, pressure: 2.6, ph: 7.4 },
  ];

  const scatterData = chartData.map(item => ({
    x: item.temperature,
    y: item.pressure,
    z: item.ph
  }));

  const addObservation = () => {
    if (newObservation.parameter && newObservation.value) {
      setObservations([...observations, {
        id: Date.now().toString(),
        ...newObservation
      }]);
      setNewObservation({
        parameter: '',
        value: '',
        observation: '',
        date: new Date().toISOString().split('T')[0]
      });
      setShowAddObservation(false);
    }
  };

  const removeObservation = (id: string) => {
    setObservations(observations.filter(o => o.id !== id));
  };

  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#0078d4" strokeWidth={2} />
              <Line type="monotone" dataKey="pressure" stroke="#106ebe" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'scatter':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={scatterData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" name="Temperature" />
              <YAxis dataKey="y" name="Pressure" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Experiments" dataKey="y" fill="#0078d4" />
            </ScatterChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="temperature" fill="#0078d4" />
              <Bar dataKey="pressure" fill="#106ebe" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* RBAC Role Selector - Temporary for testing */}
      <div className="sharepoint-card p-4 mb-6">
        <div className="flex items-center space-x-3">
          <UserCircle size={24} className="text-sharepoint-primary" />
          <Label htmlFor="userRoleSelector" className="text-lg font-semibold text-sharepoint-gray-700">Current User Role (Test):</Label>
          <Select value={currentUserRole} onValueChange={(value: UserRole) => setCurrentUserRole(value)}>
            <SelectTrigger id="userRoleSelector" className="w-48">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(UserRole).map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            className="w-40"
            placeholder="Current User ID (test)"
            value={currentUserId}
            onChange={(e) => setCurrentUserId(e.target.value)}
          />
        </div>
        <p className="text-xs text-sharepoint-gray-500 mt-1">
          This selector is for testing RBAC. In a real app, the role would come from user context.
        </p>
      </div>

      {/* Collapsible section for existing DOE content */}
      <details className="sharepoint-card" open={showExistingDoe}>
        <summary
          className="text-lg font-semibold text-sharepoint-gray-800 cursor-pointer"
          onClick={(e) => {
            e.preventDefault(); // Prevent default details toggle
            setShowExistingDoe(!showExistingDoe);
          }}
        >
          Existing Design of Experiments Core
        </summary>
        {showExistingDoe && (
          <div className="mt-4 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-1">Design of Experiments</h2>
              <p className="text-sharepoint-gray-600">Plan, execute, and analyze experimental procedures</p>
            </div>

            {/* Experiment Details */}
            <div className="sharepoint-card">
              <h3 className="text-lg font-semibold text-sharepoint-gray-800 mb-4">Experiment Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="experimentTitle">Experiment Title</Label>
                  <Input
                    id="experimentTitle"
                    placeholder="Enter experiment title"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="experimentDate">Date</Label>
                  <Input
                    id="experimentDate"
                    type="date"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="owner">Owner</Label>
                  <Input
                    id="owner"
                    placeholder="Experiment owner"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="productName">Product Name</Label>
                  <Input
                    id="productName"
                    placeholder="Product under test"
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="objective">Objective</Label>
                  <Textarea
                    id="objective"
                    placeholder="Describe the experiment objective..."
                    className="mt-1 h-20"
                  />
                </div>
              </div>
            </div>

            {/* Experiment Inputs */}
            <div className="sharepoint-card">
              <h3 className="text-lg font-semibold text-sharepoint-gray-800 mb-4">Experiment Inputs</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="factors">Factors</Label>
                  <Input
                    id="factors"
                    placeholder="Number of factors"
                    type="number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="levels">Levels</Label>
                  <Input
                    id="levels"
                    placeholder="Number of levels"
                    type="number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="trials">Trials</Label>
                  <Input
                    id="trials"
                    placeholder="Number of trials"
                    type="number"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="repeats">Repeats</Label>
                  <Input
                    id="repeats"
                    placeholder="Number of repeats"
                    type="number"
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Observations Section */}
            <div className="sharepoint-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-sharepoint-gray-800">Observations</h3>
                <Button
                  onClick={() => setShowAddObservation(!showAddObservation)}
                  className="sharepoint-button-primary"
                >
                  <Plus size={16} className="mr-2" />
                  Add Observation
                </Button>
              </div>

              {showAddObservation && (
                <div className="mb-4 p-4 bg-sharepoint-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Parameter</Label>
                      <Input
                        value={newObservation.parameter}
                        onChange={(e) => setNewObservation({...newObservation, parameter: e.target.value})}
                        placeholder="Enter parameter name"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Value</Label>
                      <Input
                        value={newObservation.value}
                        onChange={(e) => setNewObservation({...newObservation, value: e.target.value})}
                        placeholder="Enter measured value"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={newObservation.date}
                        onChange={(e) => setNewObservation({...newObservation, date: e.target.value})}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Observation</Label>
                      <Input
                        value={newObservation.observation}
                        onChange={(e) => setNewObservation({...newObservation, observation: e.target.value})}
                        placeholder="Enter observation notes"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <Button onClick={addObservation} className="sharepoint-button-primary">Add</Button>
                    <Button
                      onClick={() => setShowAddObservation(false)}
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
                      <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Parameter</th>
                      <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Value</th>
                      <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Date</th>
                      <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Observation</th>
                      <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {observations.map((observation) => (
                      <tr key={observation.id} className="border-b border-sharepoint-gray-100 hover:bg-sharepoint-gray-50">
                        <td className="p-3 text-sharepoint-gray-800 font-medium">{observation.parameter}</td>
                        <td className="p-3 text-sharepoint-gray-800">{observation.value}</td>
                        <td className="p-3 text-sharepoint-gray-800">
                          {new Date(observation.date).toLocaleDateString()}
                        </td>
                        <td className="p-3 text-sharepoint-gray-800">{observation.observation}</td>
                        <td className="p-3">
                          <Button
                            onClick={() => removeObservation(observation.id)}
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

            {/* Visualizations */}
            <div className="sharepoint-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-sharepoint-gray-800">Data Visualization</h3>
                <div className="flex items-center space-x-3">
                  <Select value={viewMode} onValueChange={(value: 'chart' | 'table') => setViewMode(value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chart">Chart View</SelectItem>
                      <SelectItem value="table">Table View</SelectItem>
                    </SelectContent>
                  </Select>
                  {viewMode === 'chart' && (
                    <Select value={chartType} onValueChange={(value: 'bar' | 'line' | 'scatter') => setChartType(value)}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bar">Bar Chart</SelectItem>
                        <SelectItem value="line">Line Chart</SelectItem>
                        <SelectItem value="scatter">Scatter Plot</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3 mb-6">
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="all">All Time</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="product1">Product A</SelectItem>
                    <SelectItem value="product2">Product B</SelectItem>
                    <SelectItem value="product3">Product C</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by Owner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {viewMode === 'chart' ? (
                <div className="bg-white border border-sharepoint-gray-200 rounded-lg p-4">
                  {renderChart()}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-sharepoint-gray-200">
                        <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Experiment</th>
                        <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Temperature</th>
                        <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Pressure</th>
                        <th className="text-left p-3 text-sharepoint-gray-700 font-medium">pH Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {chartData.map((item, index) => (
                        <tr key={index} className="border-b border-sharepoint-gray-100 hover:bg-sharepoint-gray-50">
                          <td className="p-3 text-sharepoint-gray-800 font-medium">{item.name}</td>
                          <td className="p-3 text-sharepoint-gray-800">{item.temperature}°C</td>
                          <td className="p-3 text-sharepoint-gray-800">{item.pressure} bar</td>
                          <td className="p-3 text-sharepoint-gray-800">{item.ph}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="sharepoint-button-primary">
                <BarChart3 size={16} className="mr-2" />
                Run Analysis
              </Button>
              <Button className="sharepoint-button-secondary">
                Export Data
              </Button>
              <Button className="sharepoint-button-primary">
                Save Experiment
              </Button>
            </div>
          </div>
        )}
      </details>

      {/* DOE Tracking Section */}
      <div className="sharepoint-card mt-6">
        <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-4">DOE Tracking</h2>

        {/* DOE Registration Sub-section */}
        <div className="sharepoint-card-section mb-6">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3">DOE Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="doeTitle">Title</Label>
              <Input
                id="doeTitle"
                placeholder="Enter DOE title"
                className="mt-1"
                value={doeTitle}
                onChange={(e) => setDoeTitle(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeBusinessUnit">Business Unit/Department</Label>
              <Select
                value={doeBusinessUnit}
                onValueChange={setDoeBusinessUnit}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Business Unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rnd">R&D</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="quality">Quality Assurance</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doeLocation">Location</Label>
              <Input
                id="doeLocation"
                placeholder="Enter location"
                className="mt-1"
                value={doeLocation}
                onChange={(e) => setDoeLocation(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeTheme">Theme</Label>
              <Select
                value={doeTheme}
                onValueChange={setDoeTheme}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="process_optimization">Process Optimization</SelectItem>
                  <SelectItem value="cost_reduction">Cost Reduction</SelectItem>
                  <SelectItem value="quality_improvement">Quality Improvement</SelectItem>
                  <SelectItem value="new_product_development">New Product Development</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Conceptual: Add DOE Owner field here. For now, RBAC for save is Admin only.
                <div>
                  <Label htmlFor="doeOwner">DOE Owner</Label>
                  // Placeholder for People Picker - Employee Master integration
                  <Input id="doeOwner" placeholder="Assign DOE Owner" disabled={currentUserRole !== UserRole.Admin} />
                </div>
            */}
            <div className="md:col-span-2">
              <Label htmlFor="doeObjective">Objective</Label>
              <Textarea
                id="doeObjective"
                placeholder="Describe the DOE objective"
                className="mt-1 h-20"
                value={doeObjective}
                onChange={(e) => setDoeObjective(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="doeHypotheses">Hypotheses</Label>
              <Textarea
                id="doeHypotheses"
                placeholder="State the hypotheses"
                className="mt-1 h-20"
                value={doeHypotheses}
                onChange={(e) => setDoeHypotheses(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeSuccessCriteria">Success Criteria</Label>
              <Textarea
                id="doeSuccessCriteria"
                placeholder="Define success criteria"
                className="mt-1"
                value={doeSuccessCriteria}
                onChange={(e) => setDoeSuccessCriteria(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeFailureCriteria">Failure Criteria</Label>
              <Textarea
                id="doeFailureCriteria"
                placeholder="Define failure criteria"
                className="mt-1"
                value={doeFailureCriteria}
                onChange={(e) => setDoeFailureCriteria(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeStartDate">Start Date</Label>
              <Input
                id="doeStartDate"
                type="date"
                className="mt-1"
                value={doeStartDate}
                onChange={(e) => setDoeStartDate(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
            <div>
              <Label htmlFor="doeEndDate">End Date</Label>
              <Input
                id="doeEndDate"
                type="date"
                className="mt-1"
                value={doeEndDate}
                onChange={(e) => setDoeEndDate(e.target.value)}
                disabled={currentUserRole === UserRole.Viewer || currentUserRole === UserRole.Activity_Owner}
              />
            </div>
          </div>
          <div className="mt-4">
            {/* DOE Data would need an ownerId field. Example: currentDOE.ownerId === currentUserId */}
            <Button
              className="sharepoint-button-primary"
              disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
            >
              <Save size={16} className="mr-2" />
              Save DOE
            </Button>
          </div>
        </div>

        {/* Activity Planning & Tracking Sub-section */}
        {/* Activity object would need assignedOwnerId. Example: activity.assignedOwnerId === currentUserId */}
        <div className="sharepoint-card-section mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-sharepoint-gray-700">Activity Planning & Tracking</h3>
            <Button
              className="sharepoint-button-secondary"
              disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
            >
              <ListPlus size={16} className="mr-2" />
              Add Activity
            </Button>
          </div>
          {/* Placeholder for Employee Master integration for 'Assigned Owner' column */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-sharepoint-gray-200">
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Activity Name</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Assigned Owner {/* Employee Master */}</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Planned Start</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Planned End</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Status</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Dependencies</th>
                  <th className="text-left p-3 text-sharepoint-gray-700 font-medium">Comments</th>
                  {/* Add actions column if needed */}
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-3 text-center text-sharepoint-gray-500">
                      No activities added yet.
                    </td>
                  </tr>
                ) : (
                  activities.map((activity) => (
                    <tr key={activity.id} className="border-b border-sharepoint-gray-100 hover:bg-sharepoint-gray-50">
                      <td className="p-3 text-sharepoint-gray-800">{activity.name}</td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.owner}</td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.plannedStart}</td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.plannedEnd}</td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.status}
                        {/* Activity_Owner for this activity (activity.assignedOwnerId === currentUserId) or Admin/DOE_Owner can edit status */}
                      </td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.dependencies}</td>
                      <td className="p-3 text-sharepoint-gray-800">{activity.comments}</td>
                      {/* Add action buttons for edit/delete activity based on role */}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Evaluation Sub-section */}
        <div className="sharepoint-card-section mb-6">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <Calculator size={20} className="mr-2 text-sharepoint-primary" />
            Performance Evaluation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
            {/* Headers */}
            <div className="font-semibold text-sharepoint-gray-600">Metric</div>
            <div className="font-semibold text-sharepoint-gray-600">Pre-Project</div>
            <div className="font-semibold text-sharepoint-gray-600">Post-Project</div>
            <div className="font-semibold text-sharepoint-gray-600">Variance (Abs / %)</div>

            {/* Turnaround Time */}
            <Label htmlFor="perfTurnaroundTimePre" className="self-center">Turnaround Time</Label>
            <Input id="perfTurnaroundTimePre" type="number" placeholder="e.g., 10" value={perfTurnaroundTimePre} onChange={(e) => setPerfTurnaroundTimePre(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Input id="perfTurnaroundTimePost" type="number" placeholder="e.g., 8" value={perfTurnaroundTimePost} onChange={(e) => setPerfTurnaroundTimePost(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <div className="self-center text-sharepoint-gray-700">
              <span>--</span> / <span>--%</span> {/* Placeholder for variance */}
            </div>

            {/* Cost */}
            <Label htmlFor="perfCostPre" className="self-center">Cost</Label>
            <Input id="perfCostPre" type="number" placeholder="e.g., 1000" value={perfCostPre} onChange={(e) => setPerfCostPre(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Input id="perfCostPost" type="number" placeholder="e.g., 900" value={perfCostPost} onChange={(e) => setPerfCostPost(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <div className="self-center text-sharepoint-gray-700">
              <span>--</span> / <span>--%</span> {/* Placeholder for variance */}
            </div>

            {/* Quality */}
            <Label htmlFor="perfQualityPre" className="self-center">Quality (e.g., % defects)</Label>
            <Input id="perfQualityPre" type="number" placeholder="e.g., 5" value={perfQualityPre} onChange={(e) => setPerfQualityPre(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Input id="perfQualityPost" type="number" placeholder="e.g., 2" value={perfQualityPost} onChange={(e) => setPerfQualityPost(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <div className="self-center text-sharepoint-gray-700">
              <span>--</span> / <span>--%</span> {/* Placeholder for variance */}
            </div>

            {/* Compliance */}
            <Label htmlFor="perfCompliancePre" className="self-center">Compliance (e.g., % adherence)</Label>
            <Input id="perfCompliancePre" type="number" placeholder="e.g., 90" value={perfCompliancePre} onChange={(e) => setPerfCompliancePre(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <Input id="perfCompliancePost" type="number" placeholder="e.g., 98" value={perfCompliancePost} onChange={(e) => setPerfCompliancePost(e.target.value)} disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner} />
            <div className="self-center text-sharepoint-gray-700">
              <span>--</span> / <span>--%</span> {/* Placeholder for variance */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              <Label htmlFor="perfInference">Inference / Reason for variance</Label>
              <Textarea
                id="perfInference"
                placeholder="Explain the observed variances..."
                className="mt-1 h-24"
                value={perfInference}
                onChange={(e) => setPerfInference(e.target.value)}
                disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
              />
            </div>
            <div>
              <Label htmlFor="perfOutcome">Final Outcome / Action Plan</Label>
              <Textarea
                id="perfOutcome"
                placeholder="Describe the final outcome and next steps..."
                className="mt-1 h-24"
                value={perfOutcome}
                onChange={(e) => setPerfOutcome(e.target.value)}
                disabled={currentUserRole !== UserRole.Admin && currentUserRole !== UserRole.DOE_Owner}
              />
            </div>
          </div>
        </div>

        {/* Visualization & Summary Sub-section - Typically Viewers and above can see this */}
        <div className="sharepoint-card-section mb-6">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <Presentation size={20} className="mr-2 text-sharepoint-primary" />
            Visualization & Summary
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="sharepoint-sub-card p-4">
              <h4 className="font-semibold text-sharepoint-gray-600 mb-2">Before/After Metrics Comparison</h4>
              <div className="bg-sharepoint-gray-100 h-48 flex items-center justify-center rounded">
                <p className="text-sharepoint-gray-500 text-sm">[Bar Chart: Turnaround Time, Cost, Quality, Compliance]</p>
              </div>
            </div>
            <div className="sharepoint-sub-card p-4">
              <h4 className="font-semibold text-sharepoint-gray-600 mb-2">DOE Progress</h4>
              <div className="bg-sharepoint-gray-100 h-20 flex items-center justify-center rounded mb-2">
                <p className="text-sharepoint-gray-500 text-sm">[Progress Bar/Indicator: Overall DOE Completion]</p>
              </div>
              <h4 className="font-semibold text-sharepoint-gray-600 mb-2 mt-4">Activity Progress</h4>
              <div className="bg-sharepoint-gray-100 h-20 flex items-center justify-center rounded">
                <p className="text-sharepoint-gray-500 text-sm">[Progress Bar/Indicator: Key Activities Completion]</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard & Reporting Sub-section */}
        <div className="sharepoint-card-section mb-6">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <LayoutDashboard size={20} className="mr-2 text-sharepoint-primary" />
            Dashboard & Reporting
          </h3>

          {/* Filters Placeholder */}
          <div className="mb-4 p-3 bg-sharepoint-gray-50 rounded">
            <h4 className="font-semibold text-sharepoint-gray-600 mb-2">Filters</h4>
            <div className="flex flex-wrap gap-3">
              <div className="p-2 border border-dashed border-sharepoint-gray-300 rounded text-sm text-sharepoint-gray-500">Department Filter</div>
              <div className="p-2 border border-dashed border-sharepoint-gray-300 rounded text-sm text-sharepoint-gray-500">DOE Owner Filter</div>
              <div className="p-2 border border-dashed border-sharepoint-gray-300 rounded text-sm text-sharepoint-gray-500">Time Period Filter</div>
              <div className="p-2 border border-dashed border-sharepoint-gray-300 rounded text-sm text-sharepoint-gray-500">Theme Filter</div>
            </div>
          </div>

          {/* Dashboard Widgets Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: DOE Count by Department]</p>
            </div>
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: DOE Count by Owner]</p>
            </div>
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: DOE Count by Theme]</p>
            </div>
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: Status Breakdowns]</p>
            </div>
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: Delay Trends]</p>
            </div>
            <div className="sharepoint-sub-card p-4 bg-sharepoint-gray-50 h-24 flex items-center justify-center">
              <p className="text-sharepoint-gray-500 text-sm">[Widget: Efficiency Gains]</p>
            </div>
          </div>
        </div>

        {/* File Upload Support Sub-section */}
        <div className="sharepoint-card-section mb-6">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <UploadCloud size={20} className="mr-2 text-sharepoint-primary" />
            File Upload
          </h3>
          <div>
            <Label
              htmlFor="doeFileUpload"
              className="block text-sm font-medium text-sharepoint-gray-700 mb-1"
            >
              Upload Excel/CSV Files
            </Label>
            <Input
              id="doeFileUpload"
              type="file"
              className="mt-1 block w-full text-sm text-sharepoint-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-sharepoint-primary-lighter file:text-sharepoint-primary hover:file:bg-sharepoint-primary-light focus:outline-none focus:ring-2 focus:ring-sharepoint-primary focus:border-sharepoint-primary"
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            />
            <p className="mt-1 text-xs text-sharepoint-gray-500">
              Attach relevant documents, data sheets, or analysis results.
            </p>
          </div>
        </div>

        {/* Tableau Embedding Sub-section */}
        <div className="sharepoint-card-section">
          <h3 className="text-lg font-semibold text-sharepoint-gray-700 mb-3 flex items-center">
            <AreaChart size={20} className="mr-2 text-sharepoint-primary" />
            Embedded Tableau Dashboard
          </h3>
          <div className="bg-sharepoint-gray-100 border-2 border-dashed border-sharepoint-gray-300 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <AreaChart size={48} className="mx-auto text-sharepoint-gray-400 mb-2" />
              <p className="text-sharepoint-gray-500">Tableau Dashboard embed placeholder.</p>
              <p className="text-xs text-sharepoint-gray-400 mt-1">
                (Future iframe for Tableau will be rendered here)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DesignOfExperiments;
