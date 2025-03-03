import React, { useState } from 'react';
import Fieldset from './Fieldset/Fieldset';
import './FieldsetDemo.css';

const FieldsetDemo: React.FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const toggleFieldset = (e: { originalEvent: React.MouseEvent<HTMLElement>; value: boolean }) => {
    setCollapsed(e.value);
  };

  return (
    <div className="fieldset-demo">
      <div className="fieldset-examples">
        <h3>Basic Fieldset with Boxed Header</h3>
        <Fieldset legend="Header">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Fieldset>

        <h3>Toggleable Fieldset</h3>
        <Fieldset legend="Expandable Header" toggleable>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Fieldset>

        <h3>Controlled Fieldset</h3>
        <div className="fieldset-controls">
          <button 
            onClick={() => setCollapsed(prev => !prev)} 
            className="toggle-button"
          >
            {collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>
        <Fieldset 
          legend="Controlled Header" 
          toggleable 
          collapsed={collapsed} 
          onToggle={toggleFieldset}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </Fieldset>

        <h3>Custom Legend</h3>
        <Fieldset 
          legend={
            <div className="custom-legend">
              <span className="legend-badge">New</span>
              <span>Advanced Configuration</span>
            </div>
          } 
          toggleable
        >
          <div className="p-grid">
            <div className="p-col-6">
              <div className="field-group">
                <label htmlFor="firstname">Firstname</label>
                <input id="firstname" type="text" className="text-input" />
              </div>
            </div>
            <div className="p-col-6">
              <div className="field-group">
                <label htmlFor="lastname">Lastname</label>
                <input id="lastname" type="text" className="text-input" />
              </div>
            </div>
            <div className="p-col-6">
              <div className="field-group">
                <label htmlFor="age">Age</label>
                <input id="age" type="number" className="text-input" />
              </div>
            </div>
            <div className="p-col-6">
              <div className="field-group">
                <label htmlFor="location">Location</label>
                <input id="location" type="text" className="text-input" />
              </div>
            </div>
          </div>
        </Fieldset>
      </div>
    </div>
  );
};

export default FieldsetDemo; 