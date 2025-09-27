import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, title = "Distribution Chart" }) => {
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
        <p>📊 No distribution data available</p>
      </div>
    );
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 11
          },
          generateLabels: (chart) => {
            const datasets = chart.data.datasets;
            if (datasets.length > 0 && datasets[0].data) {
              return chart.data.labels.map((label, i) => {
                const value = datasets[0].data[i];
                const total = datasets[0].data.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                
                return {
                  text: `${label} (${percentage}%)`,
                  fillStyle: datasets[0].backgroundColor[i],
                  pointStyle: 'circle',
                  index: i
                };
              });
            }
            return [];
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
            return `${context[0].label}`;
          },
          label: (context) => {
            const total = context.dataset.data.reduce((sum, val) => sum + val, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `Usage: ${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#0078d4',
        borderWidth: 1
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#ffffff',
        hoverBorderWidth: 3
      }
    }
  };

  return (
    <div style={{ height: '300px', width: '100%', position: 'relative' }}>
      <Pie options={options} data={data} />
    </div>
  );
};

export default PieChart;