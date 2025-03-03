import React, { useState } from 'react';
import './InputDemo.css';

const InputDemo: React.FC = () => {
  const [value, setValue] = useState('');
  const [disabled, setDisabled] = useState(false);

  return (
    <div className="input-demo">
      <div className="input-demo-section">
        <h3>Basic Input</h3>
        <input
          type="text"
          placeholder="Enter text..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="demo-input"
        />
        <p>Current value: {value}</p>
      </div>

      <div className="input-demo-section">
        <h3>Disabled Input</h3>
        <input
          type="text"
          placeholder="Disabled input"
          disabled={disabled}
          className="demo-input"
        />
        <label className="demo-checkbox">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(e) => setDisabled(e.target.checked)}
          />
          Disable input
        </label>
      </div>

      <div className="input-demo-section">
        <h3>Input with Icon</h3>
        <div className="input-with-icon">
          <span className="input-icon">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="demo-input"
          />
        </div>
      </div>
    </div>
  );
};

export default InputDemo; 