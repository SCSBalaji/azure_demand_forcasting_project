import React from 'react';
import { useApi } from '../hooks/useApi';
import { getCPUUsageTrends, apiHealthCheck } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const ApiTest = () => {
  const { data: healthData, loading: healthLoading } = useApi(apiHealthCheck);
  const { data: cpuData, loading: cpuLoading, error, refetch } = useApi(
    () => getCPUUsageTrends('6M', ['East US', 'West US'])
  );

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem', borderRadius: '8px' }}>
      <h4>🧪 API Service Test</h4>
      
      <div style={{ marginBottom: '1rem' }}>
        <strong>Health Check:</strong>
        {healthLoading ? (
          <span> Loading...</span>
        ) : (
          <span style={{ color: 'green' }}> ✅ {healthData?.status}</span>
        )}
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <strong>CPU Data:</strong>
        {cpuLoading ? (
          <LoadingSpinner message="Fetching CPU trends..." />
        ) : error ? (
          <span style={{ color: 'red' }}> ❌ {error}</span>
        ) : (
          <span style={{ color: 'green' }}> ✅ Data loaded successfully</span>
        )}
      </div>

      <button onClick={refetch} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        🔄 Refetch Data
      </button>
      
      {cpuData && (
        <pre style={{ fontSize: '0.8rem', background: '#f5f5f5', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(cpuData.metadata, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ApiTest;