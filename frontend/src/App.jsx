import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('usage-trends');

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange} 
        />
        <MainContent activeSection={activeSection}>
          <div className="placeholder-content">
            <h3>Welcome to {activeSection.replace('-', ' ').toUpperCase()}</h3>
            <p>Charts and data visualizations will go here...</p>
          </div>
        </MainContent>
      </div>
    </div>
  );
}

export default App;