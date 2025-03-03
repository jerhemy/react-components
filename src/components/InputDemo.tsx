import './InputDemo.css';

import React, { useState } from 'react';

import CodeBlock from './CodeBlock/CodeBlock';

const InputDemo: React.FC = () => {
  const [value, setValue] = useState('');

  // Define variations of the input component
  const variations = [
    {
      title: 'Basic Input',
      description: 'A standard text input field with placeholder text.',
      component: (
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter text..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="demo-input"
          />
          <p className="input-value">Current value: {value}</p>
        </div>
      ),
      code: `// Basic text input
<input
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="demo-input"
/>`
    },
    {
      title: 'Input Types',
      description: 'Different input types for various data formats.',
      component: (
        <div className="input-stack">
          <input type="email" placeholder="Email address" className="demo-input" />
          <input type="password" placeholder="Password" className="demo-input" />
          <input type="number" placeholder="Age" className="demo-input" />
          <input type="tel" placeholder="Phone number" className="demo-input" />
          <input type="date" className="demo-input" />
        </div>
      ),
      code: `// Different input types
<input type="email" placeholder="Email address" className="demo-input" />
<input type="password" placeholder="Password" className="demo-input" />
<input type="number" placeholder="Age" className="demo-input" />
<input type="tel" placeholder="Phone number" className="demo-input" />
<input type="date" className="demo-input" />`
    },
    {
      title: 'Input States',
      description: 'Input fields in different states: default, disabled, and readonly.',
      component: (
        <div className="input-stack">
          <input type="text" placeholder="Default input" className="demo-input" />
          <input type="text" placeholder="Disabled input" disabled className="demo-input" />
          <input type="text" value="Read-only input" readOnly className="demo-input" />
        </div>
      ),
      code: `// Input states
<input type="text" placeholder="Default input" className="demo-input" />
<input type="text" placeholder="Disabled input" disabled className="demo-input" />
<input type="text" value="Read-only input" readOnly className="demo-input" />`
    },
    {
      title: 'Input with Icon',
      description: 'Input fields with leading or trailing icons.',
      component: (
        <div className="input-stack">
          <div className="input-with-icon">
            <span className="input-icon">🔍</span>
            <input type="text" placeholder="Search..." className="demo-input" />
          </div>
          <div className="input-with-icon">
            <input type="text" placeholder="Email address" className="demo-input" />
            <span className="input-icon">✉️</span>
          </div>
        </div>
      ),
      code: `// Input with leading icon
<div className="input-with-icon">
  <span className="input-icon">🔍</span>
  <input type="text" placeholder="Search..." className="demo-input" />
</div>

// Input with trailing icon
<div className="input-with-icon">
  <input type="text" placeholder="Email address" className="demo-input" />
  <span className="input-icon">✉️</span>
</div>`
    }
  ];

  return (
    <div className="input-demo">
      <h2>Input Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The Input component provides a flexible and customizable text input interface
          with support for different types, states, and styles. Below are various
          examples showing different ways to use and customize the component.
        </p>
      </div>

      {variations.map((variation, index) => (
        <div key={index} className="demo-variation">
          <h3>{variation.title}</h3>
          <p>{variation.description}</p>

          <div className="demo-preview">
            <h4>Live Preview</h4>
            <div className="preview-container">
              {variation.component}
            </div>
          </div>

          <div className="demo-code">
            <h4>Code Example</h4>
            <CodeBlock code={variation.code} language="typescript" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <p>
          Include these CSS styles in your project to use the input component:
        </p>
        <CodeBlock
          code={`.demo-input {
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--bg-color);
  transition: all 0.2s;
  width: 100%;
}

.demo-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-shadow);
}

.demo-input:disabled {
  background-color: var(--hover-color);
  cursor: not-allowed;
  opacity: 0.6;
}

.demo-input[readonly] {
  background-color: var(--hover-color);
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon .input-icon {
  position: absolute;
  font-size: 16px;
  color: var(--secondary-text);
  padding: 0 12px;
}

.input-with-icon .input-icon:first-child + .demo-input {
  padding-left: 36px;
}

.input-with-icon .input-icon:last-child {
  right: 0;
}

.input-with-icon .demo-input {
  padding-right: 36px;
}

.input-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-value {
  margin-top: 8px;
  font-size: 14px;
  color: var(--secondary-text);
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default InputDemo; 