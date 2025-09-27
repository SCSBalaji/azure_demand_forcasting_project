import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DemandChart = ({ data, title = "Demand Variation" }) => {
  // Handle empty or invalid data
  if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
    return (
      <div style={{ 
        height: '300px', 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#f8f9fa',
        border: '2px dashed #dee2e6',
        borderRadius: '6px',
        color: '#6c757d'
      }}>
        <p>📊 No demand data available</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 14,
          weight: 'bold'
        },
        padding: 20
      },
      tooltip: {
        callbacks: {
          title: (context) => {
            return `Period: ${context[0].label}`;
          },
          label: (context) => {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}%`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#0078d4',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time Period',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 11
          }
        }
      },
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Demand (%)',
          font: {
            weight: 'bold'
          }
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          callback: function(value) {
            return value + '%';
          },
          font: {
            size: 11
          }
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 4,
        borderSkipped: false
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%', position: 'relative' }}>
      <Bar options={options} data={data} />
    </div>
  );
};

export default DemandChart;