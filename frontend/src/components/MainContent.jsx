import React from 'react';
import './MainContent.css';

const MainContent = ({ activeSection, children }) => {
  const getSectionTitle = (section) => {
    switch (section) {
      case 'usage-trends':
        return 'Usage Trends';
      case 'forecasts':
        return 'Forecasts';
      case 'reports':
        return 'Reports';
      default:
        return 'Dashboard';
    }
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h2 className="section-title">{getSectionTitle(activeSection)}</h2>
      </div>
      <div className="content-body">
        {children}
      </div>
    </main>
  );
};

export default MainContent;