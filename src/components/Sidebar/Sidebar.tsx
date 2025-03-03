import React from 'react';
import { NavLink } from 'react-router-dom';
import { componentCategories } from '../../data/componentData';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Component Library</h2>
        <div className="version">v1.0.0</div>
      </div>
      
      <div className="sidebar-content">
        {Object.entries(componentCategories).map(([key, category]) => (
          <div key={key} className="sidebar-section">
            <h3>{category.title}</h3>
            <ul>
              {category.items.map(item => (
                <li key={item.id}>
                  <NavLink 
                    to={`/components/${item.id}`}
                    className={({ isActive }) => isActive ? 'active' : ''}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar; 