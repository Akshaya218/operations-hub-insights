
import React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const upcomingMeetings = [
    { title: "Weekly Team Sync", date: "Today, 2:00 PM", organizer: "John Smith" },
    { title: "Project Review", date: "Tomorrow, 10:00 AM", organizer: "Sarah Johnson" },
    { title: "Quarterly Planning", date: "Dec 20, 9:00 AM", organizer: "Mike Davis" },
  ];

  const ongoingExperiments = [
    { title: "Material Strength Test", owner: "Dr. Wilson", status: "In Progress", completion: 75 },
    { title: "Chemical Analysis", owner: "Lisa Chen", status: "Data Collection", completion: 45 },
    { title: "Quality Control Study", owner: "Mark Taylor", status: "Analysis", completion: 90 },
  ];

  const stats = [
    { label: "Active Meetings", value: "12", icon: Calendar, color: "text-sharepoint-blue" },
    { label: "Pending Actions", value: "8", icon: Clock, color: "text-orange-500" },
    { label: "Completed Tasks", value: "24", icon: CheckCircle, color: "text-green-500" },
    { label: "Ongoing Experiments", value: "6", icon: AlertCircle, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-1">Dashboard</h2>
        <p className="text-sharepoint-gray-600">Overview of your operations and activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="sharepoint-card">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg bg-gray-50 ${stat.color} mr-4`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-2xl font-semibold text-sharepoint-gray-800">{stat.value}</p>
                  <p className="text-sm text-sharepoint-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Meetings */}
        <div className="sharepoint-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-sharepoint-gray-800">Upcoming Meetings</h3>
            <Calendar size={20} className="text-sharepoint-blue" />
          </div>
          <div className="space-y-3">
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} className="flex items-center p-3 bg-sharepoint-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-sharepoint-blue rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="font-medium text-sharepoint-gray-800">{meeting.title}</p>
                  <p className="text-sm text-sharepoint-gray-600">{meeting.date} • {meeting.organizer}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sharepoint-blue hover:text-sharepoint-blue-dark font-medium text-sm">
            View All Meetings →
          </button>
        </div>

        {/* Ongoing Experiments */}
        <div className="sharepoint-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-sharepoint-gray-800">Ongoing Experiments</h3>
            <AlertCircle size={20} className="text-sharepoint-blue" />
          </div>
          <div className="space-y-4">
            {ongoingExperiments.map((experiment, index) => (
              <div key={index} className="p-3 bg-sharepoint-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-sharepoint-gray-800">{experiment.title}</p>
                  <span className="text-xs bg-sharepoint-blue-light text-sharepoint-blue px-2 py-1 rounded">
                    {experiment.status}
                  </span>
                </div>
                <p className="text-sm text-sharepoint-gray-600 mb-2">Owner: {experiment.owner}</p>
                <div className="w-full bg-sharepoint-gray-200 rounded-full h-2">
                  <div 
                    className="bg-sharepoint-blue h-2 rounded-full transition-all duration-300"
                    style={{ width: `${experiment.completion}%` }}
                  ></div>
                </div>
                <p className="text-xs text-sharepoint-gray-600 mt-1">{experiment.completion}% Complete</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sharepoint-blue hover:text-sharepoint-blue-dark font-medium text-sm">
            View All Experiments →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
