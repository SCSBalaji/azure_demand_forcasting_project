import React from 'react';
import CPUTrendsChart from '../components/charts/CPUTrendsChart';
import StorageChart from '../components/charts/StorageChart';
import PieChart from '../components/charts/PieChart';
import ApiTest from '../components/ApiTest';
import { cpuUsageData, storageData } from '../data/mockData';

const UsageTrends = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h3>📊 Usage Trends Dashboard</h3>
        <p>Monitor CPU, storage, and resource usage patterns across Azure regions</p>
      </div>
      
      {/* Add API Test Component */}
      <ApiTest />
      
      <div className="content-grid">
        <div className="content-card">
          <h4>CPU Usage by Region</h4>
          <CPUTrendsChart 
            data={cpuUsageData} 
            title="Monthly CPU Usage Trends by Region"
          />
        </div>
        
        <div className="content-card">
          <h4>Storage Consumption</h4>
          <StorageChart 
            data={storageData} 
            title="Storage Usage by Type"
          />
        </div>
        
        <div className="content-card">
          <h4>Resource Utilization Distribution</h4>
          <PieChart 
            data={storageData} 
            title="Storage Distribution by Type"
          />
        </div>
      </div>
    </div>
  );
};

export default UsageTrends;