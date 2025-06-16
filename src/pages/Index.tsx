
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import Dashboard from '@/components/Dashboard';
import MinutesOfMeeting from '@/components/MinutesOfMeeting';
import DesignOfExperiments from '@/components/DesignOfExperiments';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'mom':
        return <MinutesOfMeeting />;
      case 'doe':
        return <DesignOfExperiments />;
      case 'reports':
        return (
          <div className="sharepoint-card">
            <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-4">Reports</h2>
            <p className="text-sharepoint-gray-600">Generate comprehensive reports for meetings and experiments.</p>
          </div>
        );
      case 'settings':
        return (
          <div className="sharepoint-card">
            <h2 className="text-xl font-semibold text-sharepoint-gray-800 mb-4">Settings</h2>
            <p className="text-sharepoint-gray-600">Configure application preferences and user settings.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </Layout>
  );
};

export default Index;
