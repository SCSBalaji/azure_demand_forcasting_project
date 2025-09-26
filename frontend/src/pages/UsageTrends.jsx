import React, { useState } from 'react';
import CPUTrendsChart from '../components/charts/CPUTrendsChart';
import StorageChart from '../components/charts/StorageChart';
import PieChart from '../components/charts/PieChart';
import FilterPanel from '../components/filters/FilterPanel';
import DataTable from '../components/data/DataTable';
import LoadingSpinner from '../components/LoadingSpinner';
import { useApi } from '../hooks/useApi';
import {
  getCPUUsageTrends,
  getStorageUsage,
  getDemandVariation
} from '../services/api';
import { usageReportData } from '../data/tableData';
import '../pages/Pages.css';

const regionLabelToApi = (value) => {
  switch (value) {
    case 'east-us': return ['East US'];
    case 'west-us': return ['West US'];
    case 'central-us': return ['Central US'];
    case 'north-europe': return ['North Europe'];
    case 'southeast-asia': return ['Southeast Asia'];
    case 'all':
    default:
      return []; // API treats empty array as "all"
  }
};

const timeRangeToPeriod = (timeRange) => {
  // For demand variation
  if (timeRange === '1M' || timeRange === '3M') return 'weekly';
  return 'monthly';
};

const UsageTrends = () => {
  const [filters, setFilters] = useState({
    timeRange: '1Y',
    region: 'all',
    resourceType: 'all'
  });

  // Fetch with filters (re-runs when filters change)
  const {
    data: cpuRes,
    loading: cpuLoading,
    error: cpuError
  } = useApi(
    () => getCPUUsageTrends(filters.timeRange, regionLabelToApi(filters.region)),
    [filters.timeRange, filters.region]
  );

  const {
    data: storageRes,
    loading: storageLoading,
    error: storageError
  } = useApi(
    () => getStorageUsage('all'),
    [filters.timeRange] // tie to timeRange just to show reactivity
  );

  const {
    data: demandRes,
    loading: demandLoading,
    error: demandError
  } = useApi(
    () => getDemandVariation(timeRangeToPeriod(filters.timeRange)),
    [filters.timeRange]
  );

  const handleFilterChange = (updated) => setFilters(updated);
  const handleApplyFilters = (applied) => setFilters(applied);

  return (
    <div className="page-content">
      <div className="page-header">
        <h3>📊 Usage Trends Dashboard</h3>
        <p>Monitor CPU, storage, and resource usage patterns across Azure regions</p>
      </div>

      <FilterPanel
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
      />

      <div className="content-grid">
        <div className="content-card">
          <h4>CPU Usage by Region</h4>
          {cpuLoading ? (
            <LoadingSpinner message="Loading CPU usage trends..." />
          ) : cpuError ? (
            <p style={{ color: 'red' }}>Error: {cpuError}</p>
          ) : (
            <CPUTrendsChart
              data={cpuRes?.data}
              title={`CPU Usage Trends (${filters.timeRange.toUpperCase()})`}
            />
          )}
          {cpuRes?.metadata?.lastUpdated && (
            <p style={{ marginTop: '0.5rem', color: '#6c757d', fontSize: '0.85rem' }}>
              Last updated: {new Date(cpuRes.metadata.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>

        <div className="content-card">
          <h4>Storage Consumption</h4>
          {storageLoading ? (
            <LoadingSpinner message="Loading storage data..." />
          ) : storageError ? (
            <p style={{ color: 'red' }}>Error: {storageError}</p>
          ) : (
            <StorageChart
              data={storageRes?.data}
              title="Storage Usage by Type"
            />
          )}
        </div>

        <div className="content-card">
          <h4>Resource Utilization Distribution</h4>
          {demandLoading ? (
            <LoadingSpinner message="Loading demand distribution..." />
          ) : demandError ? (
            <p style={{ color: 'red' }}>Error: {demandError}</p>
          ) : (
            <PieChart
              // Reuse storageRes breakdown as a distribution example
              data={storageRes?.data}
              title="Storage Distribution by Type"
            />
          )}
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <DataTable
          data={usageReportData}
          title="Regional Usage Summary"
        />
      </div>
    </div>
  );
};

export default UsageTrends;