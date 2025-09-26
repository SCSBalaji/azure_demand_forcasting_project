import React from 'react';
import CPUTrendsChart from '../components/charts/CPUTrendsChart';
import StorageChart from '../components/charts/StorageChart';
import DemandChart from '../components/charts/DemandChart';
import { forecastData, monthlyCapacityData, demandVariationData } from '../data/mockData';

const Forecasts = () => {
  return (
    <div className="page-content">
      <div className="page-header">
        <h3>🔮 Demand Forecasts</h3>
        <p>AI-powered predictions for future resource demands and capacity planning</p>
      </div>
      
      <div className="content-grid">
        <div className="content-card">
          <h4>7-Day Demand Forecast</h4>
          <CPUTrendsChart 
            data={forecastData} 
            title="7-Day CPU Usage Prediction"
          />
        </div>
        
        <div className="content-card">
          <h4>Monthly Capacity Planning</h4>
          <StorageChart 
            data={monthlyCapacityData} 
            title="Capacity vs Predicted Demand"
          />
        </div>
        
        <div className="content-card">
          <h4>Weekly Demand Variation</h4>
          <DemandChart 
            data={demandVariationData} 
            title="Resource Demand by Week"
          />
        </div>
      </div>
    </div>
  );
};

export default Forecasts;