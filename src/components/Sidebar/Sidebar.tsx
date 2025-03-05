import React from 'react';
import { NavLink } from 'react-router-dom';
import { componentCategories } from '../../data/componentData';
import './Sidebar.css';

type Theme = 'light' | 'dark' | 'auto';

interface SidebarProps {
  onThemeChange: (theme: Theme) => void;
  currentTheme: Theme;
}

const Sidebar: React.FC<SidebarProps> = ({ onThemeChange, currentTheme }) => {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Component Library</h2>
        <div className="version">v1.0.0</div>
      </div>

      <div className="sidebar-content">
        <div className="theme-selector">
          <h3>Theme</h3>
          <select
            value={currentTheme}
            onChange={(e) => onThemeChange(e.target.value as Theme)}
            className="theme-select"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto (System)</option>
          </select>
        </div>

        {Object.entries(componentCategories).map(([key, category]) => (
          <div key={key} className="sidebar-section">
            <h3>{category.title}</h3>
            <ul>
              {category.items.map(item => (
                <li key={item.id}>
                  <NavLink
                    to={item.id ? `/components/${item.id}` : '/'}
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