import React, { useState } from 'react';
import StorageChart from '../components/charts/StorageChart';
import PieChart from '../components/charts/PieChart';
import DemandChart from '../components/charts/DemandChart';
import FilterPanel from '../components/filters/FilterPanel';
import DataTable from '../components/data/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import {
  getCostAnalysis,
  getPerformanceReport,
  getDemandVariation
} from '../services/api';
import { optimizationData } from '../data/tableData';
import '../pages/Pages.css';

const timeRangeToReportPeriod = (timeRange) => {
  switch (timeRange) {
    case '1M': return 'monthly';
    case '3M': return 'quarterly';
    case '6M': return 'biannual';
    case '1Y':
    default: return 'annual';
  }
};

const Reports = () => {
  const [filters, setFilters] = useState({
    timeRange: '1M',
    region: 'all',
    resourceType: 'all'
  });

  const {
    data: costRes,
    loading: costLoading,
    error: costError
  } = useApi(
    () => getCostAnalysis(timeRangeToReportPeriod(filters.timeRange)),
    [filters.timeRange]
  );

  const {
    data: perfRes,
    loading: perfLoading,
    error: perfError
  } = useApi(
    () => getPerformanceReport('weekly'),
    [filters.timeRange]
  );

  const {
    data: perfTrendRes,
    loading: perfTrendLoading,
    error: perfTrendError
  } = useApi(
    () => getDemandVariation('weekly'),
    [filters.timeRange]
  );

  const handleFilterChange = (updated) => setFilters(updated);
  const handleApplyFilters = (applied) => setFilters(applied);

  return (
    <div className="page-content">
      <div className="page-header">
        <h3>📋 Reports & Analytics</h3>
        <p>Comprehensive reports and data analysis for capacity optimization</p>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      <div className="content-grid">
        <div className="content-card">
          <h4>Cost Breakdown</h4>
          {costLoading ? (
            <LoadingSpinner message="Loading cost analysis..." />
          ) : costError ? (
            <p style={{ color: 'red' }}>Error: {costError}</p>
          ) : (
            <StorageChart
              data={costRes?.data}
              title={`Cost Analysis (${timeRangeToReportPeriod(filters.timeRange)})`}
            />
          )}
          {costRes?.summary && (
            <div style={{ marginTop: '0.75rem', color: '#495057' }}>
              <p><strong>Total Cost:</strong> {costRes.summary.totalCost}</p>
              <p><strong>Trend:</strong> {costRes.summary.trend}</p>
              <p><strong>Top Cost Driver:</strong> {costRes.summary.topCostDriver}</p>
            </div>
          )}
        </div>

        <div className="content-card">
          <h4>Service Cost Distribution</h4>
          {costLoading ? (
            <LoadingSpinner message="Loading distribution..." />
          ) : costError ? (
            <p style={{ color: 'red' }}>Error: {costError}</p>
          ) : (
            <PieChart
              data={costRes?.data}
              title="Cost Distribution by Azure Service"
            />
          )}
        </div>

        <div className="content-card">
          <h4>Performance Trends</h4>
          {perfTrendLoading ? (
            <LoadingSpinner message="Loading performance trends..." />
          ) : perfTrendError ? (
            <p style={{ color: 'red' }}>Error: {perfTrendError}</p>
          ) : (
            <DemandChart
              data={perfTrendRes?.data}
              title="Weekly Performance Metrics"
            />
          )}
          {perfLoading ? (
            <LoadingSpinner message="Building performance report..." />
          ) : perfError ? (
            <p style={{ color: 'red' }}>Error: {perfError}</p>
          ) : perfRes?.data ? (
            <ul style={{ marginTop: '0.75rem', color: '#495057' }}>
              <li>Performance Score: {perfRes.data.performanceScore}</li>
              <li>Efficiency: {perfRes.data.efficiency}</li>
              {perfRes.data.recommendations?.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <DataTable
          data={optimizationData}
          title="Optimization Opportunities"
        />
      </div>
    </div>
  );
};

export default Reports;