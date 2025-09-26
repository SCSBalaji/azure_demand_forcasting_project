import React from 'react';
import StorageChart from '../components/charts/StorageChart';
import PieChart from '../components/charts/PieChart';
import DemandChart from '../components/charts/DemandChart';
import { costAnalysisData, demandVariationData, storageData } from '../data/mockData';

const Reports = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h3>📋 Reports & Analytics</h3>
        <p>Comprehensive reports and data analysis for capacity optimization</p>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h4>Monthly Cost Analysis</h4>
          <StorageChart 
            data={costAnalysisData} 
            title="Cost Breakdown by Service ($)"
          />
        </div>
        
        <div className="content-card">
          <h4>Service Cost Distribution</h4>
          <PieChart 
            data={costAnalysisData} 
            title="Cost Distribution by Azure Service"
          />
        </div>
        
        <div className="content-card">
          <h4>Performance Trends</h4>
          <DemandChart 
            data={demandVariationData} 
            title="Weekly Performance Metrics"
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;