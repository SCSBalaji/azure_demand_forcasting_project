// Mock table data for reports and analytics

export const usageReportData = [
  {
    region: 'East US',
    cpuUsage: 78,
    memoryUsage: 65,
    storageGB: 1250,
    cost: 2100,
    lastUpdated: '2025-01-02'
  },
  {
    region: 'West US',
    cpuUsage: 82,
    memoryUsage: 71,
    storageGB: 980,
    cost: 1850,
    lastUpdated: '2025-01-02'
  },
  {
    region: 'Central US',
    cpuUsage: 75,
    memoryUsage: 68,
    storageGB: 1100,
    cost: 1950,
    lastUpdated: '2025-01-02'
  },
  {
    region: 'North Europe',
    cpuUsage: 88,
    memoryUsage: 72,
    storageGB: 1450,
    cost: 2250,
    lastUpdated: '2025-01-02'
  },
  {
    region: 'Southeast Asia',
    cpuUsage: 73,
    memoryUsage: 62,
    storageGB: 890,
    cost: 1680,
    lastUpdated: '2025-01-02'
  }
];

export const forecastReportData = [
  {
    date: '2025-01-03',
    predictedCpuUsage: 85,
    confidence: 87,
    recommendedAction: 'Monitor',
    expectedCost: 2200
  },
  {
    date: '2025-01-04',
    predictedCpuUsage: 92,
    confidence: 82,
    recommendedAction: 'Scale Up',
    expectedCost: 2450
  },
  {
    date: '2025-01-05',
    predictedCpuUsage: 78,
    confidence: 90,
    recommendedAction: 'Monitor',
    expectedCost: 2100
  },
  {
    date: '2025-01-06',
    predictedCpuUsage: 95,
    confidence: 79,
    recommendedAction: 'Scale Up',
    expectedCost: 2600
  },
  {
    date: '2025-01-07',
    predictedCpuUsage: 88,
    confidence: 85,
    recommendedAction: 'Monitor',
    expectedCost: 2350
  }
];

export const optimizationData = [
  {
    resource: 'VM-EastUS-001',
    currentCost: 450,
    optimizedCost: 320,
    savings: 130,
    recommendation: 'Resize to smaller instance'
  },
  {
    resource: 'Storage-WestUS-002',
    currentCost: 280,
    optimizedCost: 210,
    savings: 70,
    recommendation: 'Move to cool storage tier'
  },
  {
    resource: 'VM-Central-003',
    currentCost: 380,
    optimizedCost: 285,
    savings: 95,
    recommendation: 'Implement auto-shutdown'
  },
  {
    resource: 'Network-Europe-001',
    currentCost: 150,
    optimizedCost: 120,
    savings: 30,
    recommendation: 'Optimize data transfer'
  }
];