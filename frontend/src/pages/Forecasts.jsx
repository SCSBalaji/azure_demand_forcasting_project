import React, { useState } from 'react';
import CPUTrendsChart from '../components/charts/CPUTrendsChart';
import StorageChart from '../components/charts/StorageChart';
import DemandChart from '../components/charts/DemandChart';
import FilterPanel from '../components/filters/FilterPanel';
import DataTable from '../components/data/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import {
  getDemandForecast,
  getCapacityPlanning,
  getDemandVariation
} from '../services/api';
import { forecastReportData } from '../data/tableData';
import '../pages/Pages.css';

const timeRangeToDays = (timeRange) => {
  switch (timeRange) {
    case '1M': return 7;
    case '3M': return 14;
    case '6M': return 21;
    case '1Y':
    default: return 30;
  }
};

const timeRangeToHorizon = (timeRange) => {
  switch (timeRange) {
    case '1M': return '1month';
    case '3M': return '3months';
    case '6M': return '6months';
    case '1Y':
    default: return '12months';
  }
};

const Forecasts = () => {
  const [filters, setFilters] = useState({
    timeRange: '1M',
    region: 'all',
    resourceType: 'cpu'
  });

  const {
    data: forecastRes,
    loading: forecastLoading,
    error: forecastError
  } = useApi(
    () => getDemandForecast(timeRangeToDays(filters.timeRange), filters.resourceType === 'all' ? 'cpu' : filters.resourceType),
    [filters.timeRange, filters.resourceType]
  );

  const {
    data: capacityRes,
    loading: capacityLoading,
    error: capacityError
  } = useApi(
    () => getCapacityPlanning(timeRangeToHorizon(filters.timeRange)),
    [filters.timeRange]
  );

  const {
    data: weeklyRes,
    loading: weeklyLoading,
    error: weeklyError
  } = useApi(
    () => getDemandVariation('weekly'),
    [filters.timeRange]
  );

  const handleFilterChange = (updated) => setFilters(updated);
  const handleApplyFilters = (applied) => setFilters(applied);

  return (
    <div className="page-content">
      <div className="page-header">
        <h3>🔮 Demand Forecasts</h3>
        <p>AI-powered predictions for future resource demands and capacity planning</p>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      <div className="content-grid">
        <div className="content-card">
          <h4>{timeRangeToDays(filters.timeRange)}-Day Demand Forecast</h4>
          {forecastLoading ? (
            <LoadingSpinner message="Generating forecast..." />
          ) : forecastError ? (
            <p style={{ color: 'red' }}>Error: {forecastError}</p>
          ) : (
            <CPUTrendsChart
              data={forecastRes?.data}
              title={`${timeRangeToDays(filters.timeRange)}-Day ${filters.resourceType.toUpperCase()} Forecast`}
            />
          )}
        </div>

        <div className="content-card">
          <h4>Capacity Planning</h4>
          {capacityLoading ? (
            <LoadingSpinner message="Loading capacity planning..." />
          ) : capacityError ? (
            <p style={{ color: 'red' }}>Error: {capacityError}</p>
          ) : (
            <StorageChart
              data={capacityRes?.data}
              title="Capacity vs Predicted Demand"
            />
          )}
          {capacityRes?.recommendations && (
            <ul style={{ marginTop: '0.75rem', color: '#495057' }}>
              {capacityRes.recommendations.map((rec, idx) => (
                <li key={idx}>• {rec}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="content-card">
          <h4>Weekly Demand Variation</h4>
          {weeklyLoading ? (
            <LoadingSpinner message="Loading weekly variation..." />
          ) : weeklyError ? (
            <p style={{ color: 'red' }}>Error: {weeklyError}</p>
          ) : (
            <DemandChart
              data={weeklyRes?.data}
              title="Resource Demand by Week"
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <DataTable
          data={forecastReportData}
          title="7-Day Forecast Summary"
        />
      </div>
    </div>
  );
};

export default Forecasts;