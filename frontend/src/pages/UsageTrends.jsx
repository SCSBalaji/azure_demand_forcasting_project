import React from 'react';

const UsageTrends = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h3>📊 Usage Trends Dashboard</h3>
        <p>Monitor CPU, storage, and resource usage patterns across Azure regions</p>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h4>CPU Usage by Region</h4>
          <div className="placeholder-chart">
            <p>📈 Line chart showing CPU trends will be here</p>
          </div>
        </div>
        
        <div className="content-card">
          <h4>Storage Consumption</h4>
          <div className="placeholder-chart">
            <p>📊 Bar chart showing storage usage will be here</p>
          </div>
        </div>
        
        <div className="content-card">
          <h4>Resource Utilization</h4>
          <div className="placeholder-chart">
            <p>🔄 Pie chart showing resource distribution will be here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageTrends;