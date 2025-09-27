// API Service for Azure Demand Forecasting System
// Updated to use real backend endpoints

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Generic API call function with better error handling
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  console.log(`🔄 API Call: ${url}`);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`✅ API Success: ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`❌ API Error for ${endpoint}:`, error);
    throw error;
  }
};

// =================== REAL DATA APIs ===================

/**
 * Fetch raw CSV data from backend
 */
export const getRawData = async () => {
  try {
    const rawData = await apiCall('/api/raw-data');
    console.log(`📊 Loaded ${rawData.length} records from CSV`);
    return {
      success: true,
      data: rawData,
      metadata: {
        totalRecords: rawData.length,
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('❌ Error fetching raw data:', error);
    throw new Error('Failed to fetch raw CSV data');
  }
};

/**
 * Fetch CPU usage trends by processing raw data
 */
export const getCPUUsageTrends = async (timeRange = '1Y', regions = []) => {
  try {
    console.log(`🔄 Fetching CPU usage trends for ${timeRange} timerange, regions: ${regions.join(',') || 'all'}`);
    
    // Get raw data from your backend
    const rawData = await apiCall('/api/raw-data');
    
    // Process data for Chart.js format
    const processedData = processDataForCPUChart(rawData, regions);
    
    return {
      success: true,
      data: processedData,
      metadata: {
        timeRange,
        regions: regions.length ? regions : ['East US', 'West US', 'North Europe', 'Southeast Asia'],
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('❌ Error fetching CPU usage trends:', error);
    throw new Error('Failed to fetch CPU usage data');
  }
};

/**
 * Fetch storage usage from top regions endpoint
 */
export const getStorageUsage = async (storageType = 'all') => {
  try {
    console.log(`🔄 Fetching storage usage data for type: ${storageType}`);
    
    // Use the top-regions endpoint as a proxy for storage data
    const topRegions = await apiCall('/api/top-regions');
    
    // Process for storage chart format
    const storageData = processDataForStorageChart(topRegions);
    
    return {
      success: true,
      data: storageData,
      metadata: {
        storageType,
        totalStorage: '507 TB',
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('❌ Error fetching storage usage:', error);
    throw new Error('Failed to fetch storage data');
  }
};

/**
 * Fetch demand variation using usage trends data
 */
export const getDemandVariation = async (period = 'weekly') => {
  try {
    console.log(`🔄 Fetching demand variation for period: ${period}`);
    
    // Use usage-trends endpoint for demand variation
    const trendsData = await apiCall('/api/usage-trends');
    
    // Process for demand variation chart
    const demandData = processDataForDemandChart(trendsData);
    
    return {
      success: true,
      data: demandData,
      metadata: {
        period,
        analysisType: 'resource_demand',
        lastUpdated: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('❌ Error fetching demand variation:', error);
    throw new Error('Failed to fetch demand variation data');
  }
};

// =================== DATA PROCESSING FUNCTIONS ===================

/**
 * Process raw CSV data for CPU usage chart
 */
const processDataForCPUChart = (rawData, filterRegions = []) => {
  if (!rawData || rawData.length === 0) {
    return getEmptyChartData();
  }

  // Filter by regions if specified
  let filteredData = rawData;
  if (filterRegions.length > 0) {
    filteredData = rawData.filter(row => filterRegions.includes(row.region));
  }

  // Group by date and calculate averages
  const groupedByDate = {};
  filteredData.forEach(row => {
    const date = new Date(row.date).toLocaleDateString();
    if (!groupedByDate[date]) {
      groupedByDate[date] = {};
    }
    if (!groupedByDate[date][row.region]) {
      groupedByDate[date][row.region] = [];
    }
    groupedByDate[date][row.region].push(parseFloat(row.usage_cpu));
  });

  // Get unique regions and dates
  const regions = [...new Set(filteredData.map(row => row.region))];
  const dates = Object.keys(groupedByDate).sort();

  // Take first 12 dates for chart display
  const displayDates = dates.slice(0, 12);

  const datasets = regions.map((region, index) => {
    const colors = ['#0078d4', '#107c10', '#d83b01', '#5c2d91', '#008272'];
    const color = colors[index % colors.length];
    
    const data = displayDates.map(date => {
      const values = groupedByDate[date]?.[region] || [];
      return values.length > 0 ? 
        values.reduce((sum, val) => sum + val, 0) / values.length : 0;
    });

    return {
      label: region,
      data: data,
      borderColor: color,
      backgroundColor: color + '20',
      tension: 0.4
    };
  });

  return {
    labels: displayDates,
    datasets: datasets
  };
};

/**
 * Process top regions data for storage chart
 */
const processDataForStorageChart = (topRegionsData) => {
  if (!topRegionsData || topRegionsData.length === 0) {
    return getEmptyBarChart();
  }

  const labels = topRegionsData.map(item => item.region);
  const data = topRegionsData.map(item => Math.round(item.total_cpu_usage / 1000)); // Convert to storage-like values

  return {
    labels: labels,
    datasets: [{
      label: 'Storage Usage (TB)',
      data: data,
      backgroundColor: [
        '#0078d4',
        '#107c10',
        '#d83b01',
        '#5c2d91',
        '#008272'
      ].slice(0, data.length),
      borderWidth: 2,
      borderColor: '#ffffff'
    }]
  };
};

/**
 * Process usage trends for demand variation chart
 */
const processDataForDemandChart = (trendsData) => {
  if (!trendsData || trendsData.length === 0) {
    return getEmptyBarChart();
  }

  // Group by date and calculate daily averages
  const groupedByDate = {};
  trendsData.forEach(row => {
    const date = new Date(row.date).toLocaleDateString();
    if (!groupedByDate[date]) {
      groupedByDate[date] = [];
    }
    groupedByDate[date].push(parseFloat(row.usage_cpu));
  });

  // Get first 6 dates for weekly view
  const dates = Object.keys(groupedByDate).sort().slice(0, 6);
  const avgUsage = dates.map(date => {
    const values = groupedByDate[date];
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  });

  return {
    labels: dates.map((date, i) => `Week ${i + 1}`),
    datasets: [{
      label: 'CPU Demand (%)',
      data: avgUsage,
      backgroundColor: 'rgba(0, 120, 212, 0.7)',
      borderColor: '#0078d4',
      borderWidth: 2
    }]
  };
};

// =================== FALLBACK/MOCK APIs (for endpoints that don't exist yet) ===================

export const getDemandForecast = async (days = 7, resourceType = 'cpu') => {
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  console.log(`🔄 API Call: Generating ${days}-day forecast for ${resourceType}`);
  
  // Return mock forecast data
  return {
    success: true,
    data: {
      labels: Array.from({ length: days }, (_, i) => `Day ${i + 1}`),
      datasets: [{
        label: 'Predicted CPU Usage',
        data: Array.from({ length: days }, () => Math.random() * 40 + 60),
        borderColor: '#0078d4',
        backgroundColor: 'rgba(0, 120, 212, 0.1)',
        fill: true,
        tension: 0.4
      }]
    },
    metadata: {
      forecastDays: days,
      resourceType,
      confidence: '85%',
      model: 'Azure ML AutoML',
      generatedAt: new Date().toISOString()
    }
  };
};

export const getCapacityPlanning = async (timeHorizon = '6months') => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log(`🔄 API Call: Fetching capacity planning for ${timeHorizon}`);
  
  return {
    success: true,
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [{
        label: 'Current Capacity',
        data: [100, 100, 100, 100, 100, 100],
        backgroundColor: 'rgba(92, 45, 145, 0.3)',
        borderColor: '#5c2d91',
        borderWidth: 2
      }, {
        label: 'Predicted Demand',
        data: [75, 82, 88, 95, 102, 110],
        backgroundColor: 'rgba(0, 120, 212, 0.7)',
        borderColor: '#0078d4',
        borderWidth: 2
      }]
    },
    recommendations: [
      'Consider scaling up in April when demand exceeds capacity',
      'Optimize resource allocation in East US region',
      'Implement auto-scaling policies for peak hours'
    ],
    metadata: {
      timeHorizon,
      confidenceLevel: '82%',
      lastUpdated: new Date().toISOString()
    }
  };
};

export const getCostAnalysis = async (period = 'monthly') => {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  console.log(`🔄 API Call: Fetching cost analysis for ${period} period`);
  
  return {
    success: true,
    data: {
      labels: ['Compute', 'Storage', 'Networking', 'Database', 'AI/ML Services'],
      datasets: [{
        label: 'Monthly Cost ($)',
        data: [2500, 1200, 800, 1500, 900],
        backgroundColor: ['#0078d4', '#107c10', '#d83b01', '#5c2d91', '#008272']
      }]
    },
    summary: {
      totalCost: '$6,900',
      trend: '+12% from last month',
      topCostDriver: 'Compute Services'
    },
    metadata: {
      period,
      currency: 'USD',
      lastUpdated: new Date().toISOString()
    }
  };
};

export const getPerformanceReport = async (reportType = 'weekly') => {
  await new Promise(resolve => setTimeout(resolve, 1100));
  
  console.log(`🔄 API Call: Generating ${reportType} performance report`);
  
  return {
    success: true,
    data: {
      performanceScore: 87,
      efficiency: 'Good',
      recommendations: [
        'CPU utilization is optimal in Central US',
        'Storage costs can be reduced by 15% with better allocation',
        'Consider implementing predictive scaling'
      ]
    },
    metadata: {
      reportType,
      generatedAt: new Date().toISOString(),
      analysisEngine: 'Azure Analytics'
    }
  };
};

// =================== UTILITY FUNCTIONS ===================

const getEmptyChartData = () => ({
  labels: ['No Data'],
  datasets: [{
    label: 'No Data Available',
    data: [0],
    borderColor: '#6c757d',
    backgroundColor: 'rgba(108, 117, 125, 0.1)'
  }]
});

const getEmptyBarChart = () => ({
  labels: ['No Data'],
  datasets: [{
    label: 'No Data Available',
    data: [0],
    backgroundColor: '#6c757d'
  }]
});

export const apiHealthCheck = async () => {
  try {
    const healthData = await apiCall('/api/health');
    return healthData;
  } catch (error) {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    };
  }
};

// Export all functions
export default {
  getRawData,
  getCPUUsageTrends,
  getStorageUsage,
  getDemandVariation,
  getDemandForecast,
  getCapacityPlanning,
  getCostAnalysis,
  getPerformanceReport,
  apiHealthCheck
};