import * as React from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import type { IReadonlyTheme } from '@microsoft/sp-component-base'; // For themeVariant prop

// Define props for Dashboard
interface DashboardProps {
  themeVariant?: IReadonlyTheme;
}

const Dashboard: React.FC<DashboardProps> = ({ themeVariant }) => {
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
    { label: "Active Meetings", value: "12", icon: Calendar, color: themeVariant?.palette?.themePrimary || "blue" },
    { label: "Pending Actions", value: "8", icon: Clock, color: themeVariant?.palette?.orange || "orange" },
    { label: "Completed Tasks", value: "24", icon: CheckCircle, color: themeVariant?.palette?.green || "green" },
    { label: "Ongoing Experiments", value: "6", icon: AlertCircle, color: themeVariant?.palette?.purple || "purple" },
  ];

  // Basic styles - these would be replaced by Fluent UI components (Card, Stack, Text, etc.)
  const cardStyle: React.CSSProperties = {
    padding: '16px',
    backgroundColor: themeVariant?.palette?.white || '#ffffff',
    border: `1px solid ${themeVariant?.palette?.neutralLighter || '#e0e0e0'}`,
    borderRadius: '4px',
    marginBottom: '16px', // For spacing between cards if stacked vertically
    boxShadow: themeVariant?.effects?.elevation8 || '0 2px 4px rgba(0,0,0,0.1)'
  };

  const textHeaderStyle: React.CSSProperties = {
    fontSize: themeVariant?.fonts?.large?.fontSize || '18px',
    fontWeight: themeVariant?.fonts?.large?.fontWeight || '600', // Corrected: fontWeight
    color: themeVariant?.palette?.neutralPrimary || '#333',
    marginBottom: '4px'
  };

  const textMutedStyle: React.CSSProperties = {
    fontSize: themeVariant?.fonts?.medium?.fontSize || '14px',
    color: themeVariant?.palette?.neutralSecondary || '#666',
  };

  const buttonStyle: React.CSSProperties = {
    width: '100%',
    marginTop: '16px',
    color: themeVariant?.palette?.themePrimary || 'blue',
    background: 'transparent',
    border: 'none',
    padding: '8px 0',
    textAlign: 'left',
    cursor: 'pointer',
    fontWeight: '600' // Corrected: fontWeight
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}> {/* Replicating animate-fade-in approximately */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={textHeaderStyle}>Dashboard</h2>
        <p style={textMutedStyle}>Overview of your operations and activities</p>
      </div>

      {/* Stats Grid - using CSS Grid via inline styles for now */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ padding: '8px', borderRadius: '8px', backgroundColor: themeVariant?.palette?.neutralLighterAlt || '#f0f0f0', marginRight: '16px' }}>
                  <Icon size={24} style={{ color: stat.color }} />
                </div>
                <div>
                  <p style={{ fontSize: themeVariant?.fonts?.xLarge?.fontSize || '24px', fontWeight: '600', color: themeVariant?.palette?.neutralPrimary || '#333' }}>{stat.value}</p>
                  <p style={{ fontSize: themeVariant?.fonts?.small?.fontSize || '12px', color: themeVariant?.palette?.neutralSecondary || '#666' }}>{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}> {/* Changed to single column for meetings/experiments stack */}
        {/* Upcoming Meetings */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={textHeaderStyle}>Upcoming Meetings</h3>
            <Calendar size={20} style={{ color: themeVariant?.palette?.themePrimary || 'blue' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingMeetings.map((meeting, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center', padding: '12px', backgroundColor: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8', borderRadius: '4px' }}>
                <div style={{ width: '8px', height: '8px', backgroundColor: themeVariant?.palette?.themePrimary || 'blue', borderRadius: '50%', marginRight: '12px' }}></div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '500', color: themeVariant?.palette?.neutralPrimary || '#333' }}>{meeting.title}</p>
                  <p style={{ fontSize: themeVariant?.fonts?.small?.fontSize || '12px', color: themeVariant?.palette?.neutralSecondary || '#666' }}>{meeting.date} • {meeting.organizer}</p>
                </div>
              </div>
            ))}
          </div>
          <button style={buttonStyle}>
            View All Meetings →
          </button>
        </div>

        {/* Ongoing Experiments */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={textHeaderStyle}>Ongoing Experiments</h3>
            <AlertCircle size={20} style={{ color: themeVariant?.palette?.themePrimary || 'blue' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ongoingExperiments.map((experiment, index) => (
              <div key={index} style={{ padding: '12px', backgroundColor: themeVariant?.palette?.neutralLighterAlt || '#f8f8f8', borderRadius: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p style={{ fontWeight: '500', color: themeVariant?.palette?.neutralPrimary || '#333' }}>{experiment.title}</p>
                  <span style={{ fontSize: themeVariant?.fonts?.tiny?.fontSize || '10px', backgroundColor: themeVariant?.palette?.themeLighter || '#e0e0ff', color: themeVariant?.palette?.themePrimary || 'blue', padding: '2px 6px', borderRadius: '2px' }}>
                    {experiment.status}
                  </span>
                </div>
                <p style={{ fontSize: themeVariant?.fonts?.small?.fontSize || '12px', color: themeVariant?.palette?.neutralSecondary || '#666', marginBottom: '8px' }}>Owner: {experiment.owner}</p>
                <div style={{ width: '100%', backgroundColor: themeVariant?.palette?.neutralLight || '#e0e0e0', borderRadius: '9999px', height: '8px' }}>
                  <div
                    style={{ backgroundColor: themeVariant?.palette?.themePrimary || 'blue', height: '8px', borderRadius: '9999px', transition: 'width 0.3s ease-in-out', width: `${experiment.completion}%` }}
                  ></div>
                </div>
                <p style={{ fontSize: themeVariant?.fonts?.tiny?.fontSize || '10px', color: themeVariant?.palette?.neutralSecondary || '#666', marginTop: '4px' }}>{experiment.completion}% Complete</p>
              </div>
            ))}
          </div>
          <button style={buttonStyle}>
            View All Experiments →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
