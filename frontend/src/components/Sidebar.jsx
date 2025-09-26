import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const menuItems = [
    { 
      id: 'usage-trends', 
      label: 'Usage Trends', 
      icon: '📊',
      path: '/usage-trends'
    },
    { 
      id: 'forecasts', 
      label: 'Forecasts', 
      icon: '🔮',
      path: '/forecasts'
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: '📋',
      path: '/reports'
    }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map((item) => (
            <li key={item.id} className="menu-item">
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `menu-button ${isActive ? 'active' : ''}`
                }
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;