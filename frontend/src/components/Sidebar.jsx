import React from "react";
import './Sidebar.css'

const Sidebar = ({activeSection, onSectionChange}) => {
    const menuItems = [
        { id: 'usage-trends', label: 'Usage Trends', icon: '📊'},
        { id: 'forecasts', label: 'Forecasts', icon: '🔮'},
        { id: 'reports', label: 'Reports', icon: '📋'}
    ];

    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <ul className="menu-list">
                    {menuItems.map((item) => (
                        <li key={item.id} className="menu-item">
                            <button 
                                className={`menu-button ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => onSectionChange(item.id)}
                            >
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};