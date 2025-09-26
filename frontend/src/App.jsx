import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import UsageTrends from './pages/UsageTrends';
import Forecasts from './pages/Forecasts';
import Reports from './pages/Reports';
import './App.css';
import './pages/Pages.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Navigate to="/usage-trends" replace />} />
              <Route path="/usage-trends" element={<UsageTrends />} />
              <Route path="/forecasts" element={<Forecasts />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </MainContent>
        </div>
      </div>
    </Router>
  );
}

export default App;