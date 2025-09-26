import React, { useState } from 'react';
import './FilterPanel.css';

const FilterPanel = ({ filters, onFilterChange, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (filterKey, value) => {
    const updatedFilters = {
      ...localFilters,
      [filterKey]: value
    };
    setLocalFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
  };

  const handleReset = () => {
    const resetFilters = {
      timeRange: '1Y',
      region: 'all',
      resourceType: 'all'
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h4>🔍 Filters</h4>
        <button className="reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>
      
      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="timeRange">Time Range</label>
          <select
            id="timeRange"
            value={localFilters.timeRange}
            onChange={(e) => handleFilterChange('timeRange', e.target.value)}
          >
            <option value="1M">Last Month</option>
            <option value="3M">Last 3 Months</option>
            <option value="6M">Last 6 Months</option>
            <option value="1Y">Last Year</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="region">Azure Region</label>
          <select
            id="region"
            value={localFilters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            <option value="all">All Regions</option>
            <option value="east-us">East US</option>
            <option value="west-us">West US</option>
            <option value="central-us">Central US</option>
            <option value="north-europe">North Europe</option>
            <option value="southeast-asia">Southeast Asia</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="resourceType">Resource Type</label>
          <select
            id="resourceType"
            value={localFilters.resourceType}
            onChange={(e) => handleFilterChange('resourceType', e.target.value)}
          >
            <option value="all">All Resources</option>
            <option value="cpu">CPU</option>
            <option value="memory">Memory</option>
            <option value="storage">Storage</option>
            <option value="network">Network</option>
          </select>
        </div>

        <div className="filter-actions">
          <button className="apply-btn" onClick={handleApply}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;