
import React, { useState } from 'react';
import { Plus, BarChart3, X, Calendar } from 'lucide-react';
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

const DesignOfExperiments: React.FC = () => {
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
  );
};

export default DesignOfExperiments;
