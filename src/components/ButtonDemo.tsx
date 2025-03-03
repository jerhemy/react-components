import React, { useState } from 'react';
import './ButtonDemo.css';

const ButtonDemo: React.FC = () => {
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="button-demo">
      <div className="button-demo-section">
        <h3>Basic Buttons</h3>
        <div className="button-group">
          <button className="demo-button demo-button-primary">Primary Button</button>
          <button className="demo-button demo-button-secondary">Secondary Button</button>
          <button className="demo-button demo-button-outline">Outline Button</button>
        </div>
      </div>

      <div className="button-demo-section">
        <h3>Disabled Buttons</h3>
        <div className="button-group">
          <button className="demo-button demo-button-primary" disabled={disabled}>
            Primary Button
          </button>
          <button className="demo-button demo-button-secondary" disabled={disabled}>
            Secondary Button
          </button>
          <button className="demo-button demo-button-outline" disabled={disabled}>
            Outline Button
          </button>
        </div>
        <label className="demo-checkbox">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          Disable buttons
        </label>
      </div>

      <div className="button-demo-section">
        <h3>Button Sizes</h3>
        <div className="button-group">
          <button className="demo-button demo-button-primary demo-button-sm">Small</button>
          <button className="demo-button demo-button-primary">Default</button>
          <button className="demo-button demo-button-primary demo-button-lg">Large</button>
        </div>
      </div>

      <div className="button-demo-section">
        <h3>Button with Icon</h3>
        <div className="button-group">
          <button className="demo-button demo-button-primary">
            <span className="button-icon">+</span>
            Add Item
          </button>
          <button className="demo-button demo-button-outline">
            <span className="button-icon">🗑️</span>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo; 