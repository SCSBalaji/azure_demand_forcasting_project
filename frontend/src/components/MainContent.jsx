import React from 'react';
import './MainContent.css';

const MainContent = ({ children }) => {
  return (
    <main className="main-content">
      <div className="content-body">
        {children}
      </div>
    </main>
  );
};

export default MainContent;