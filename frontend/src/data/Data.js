// Mock data for Azure Demand Forecasting Dashboard

export const cpuUsageData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'East US',
      data: [65, 59, 80, 81, 76, 85, 90, 88, 75, 82, 78, 85],
      borderColor: '#0078d4',
      backgroundColor: 'rgba(0, 120, 212, 0.1)',
      tension: 0.4
    },
    {
      label: 'West US',
      data: [45, 55, 60, 70, 65, 75, 80, 78, 70, 72, 68, 75],
      borderColor: '#107c10',
      backgroundColor: 'rgba(16, 124, 16, 0.1)',
      tension: 0.4
    },
    {
      label: 'Central US',
      data: [55, 60, 65, 75, 70, 80, 85, 82, 78, 80, 75, 82],
      borderColor: '#d83b01',
      backgroundColor: 'rgba(216, 59, 1, 0.1)',
      tension: 0.4
    }
  ]
};

export const storageData = {
  labels: ['Blob Storage', 'File Storage', 'Queue Storage', 'Table Storage', 'Disk Storage'],
  datasets: [
    {
      label: 'Storage Usage (TB)',
      data: [150, 89, 23, 45, 200],
      backgroundColor: [
        '#0078d4',
        '#107c10',
        '#d83b01',
        '#5c2d91',
        '#008272'
      ],
      borderWidth: 2,
      borderColor: '#ffffff'
    }
  ]
};

export const demandVariationData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
  datasets: [
    {
      label: 'CPU Demand (%)',
      data: [70, 85, 78, 92, 88, 95],
      backgroundColor: 'rgba(0, 120, 212, 0.7)',
      borderColor: '#0078d4',
      borderWidth: 2
    },
    {
      label: 'Memory Demand (%)',
      data: [65, 80, 75, 88, 82, 90],
      backgroundColor: 'rgba(16, 124, 16, 0.7)',
      borderColor: '#107c10',
      borderWidth: 2
    },
    {
      label: 'Storage Demand (%)',
      data: [55, 70, 68, 80, 75, 85],
      backgroundColor: 'rgba(216, 59, 1, 0.7)',
      borderColor: '#d83b01',
      borderWidth: 2
    }
  ]
};

export const forecastData = {
  labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
  datasets: [
    {
      label: 'Predicted CPU Usage',
      data: [78, 82, 85, 88, 90, 87, 85],
      borderColor: '#0078d4',
      backgroundColor: 'rgba(0, 120, 212, 0.1)',
      fill: true,
      tension: 0.4
    },
    {
      label: 'Confidence Interval',
      data: [85, 88, 92, 95, 97, 94, 92],
      borderColor: '#d83b01',
      backgroundColor: 'rgba(216, 59, 1, 0.1)',
      fill: '-1',
      tension: 0.4,
      borderDash: [5, 5]
    }
  ]
};

export const monthlyCapacityData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Current Capacity',
      data: [100, 100, 100, 100, 100, 100],
      backgroundColor: 'rgba(92, 45, 145, 0.3)',
      borderColor: '#5c2d91',
      borderWidth: 2
    },
    {
      label: 'Predicted Demand',
      data: [75, 82, 88, 95, 102, 110],
      backgroundColor: 'rgba(0, 120, 212, 0.7)',
      borderColor: '#0078d4',
      borderWidth: 2
    }
  ]
};

export const costAnalysisData = {
  labels: ['Compute', 'Storage', 'Networking', 'Database', 'AI/ML Services'],
  datasets: [
    {
      label: 'Monthly Cost ($)',
      data: [2500, 1200, 800, 1500, 900],
      backgroundColor: [
        '#0078d4',
        '#107c10',
        '#d83b01',
        '#5c2d91',
        '#008272'
      ]
    }
  ]
};