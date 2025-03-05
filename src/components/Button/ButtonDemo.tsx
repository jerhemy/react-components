import './ButtonDemo.css';

import Button from './Button';
import CodeBlock from '../CodeBlock/CodeBlock';
import React from 'react';

const ButtonDemo: React.FC = () => {
  return (
    <div className="component-page">
      <h1>Button</h1>
      <p className="component-description">
        Interactive button component with multiple variants.
      </p>

      <div className="example-container">
        <div className="example-preview">
          <div className="button-group">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </div>
        <CodeBlock
          code={`import { Button } from './Button';

<Button variant="primary">Primary Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>`}
          language="typescript"
        />
      </div>

      <div className="example-container">
        <div className="example-preview">
          <div className="button-group">
            <Button variant="primary" disabled>Primary Button</Button>
            <Button variant="secondary" disabled>Secondary Button</Button>
            <Button variant="outline" disabled>Outline Button</Button>
          </div>
        </div>
        <CodeBlock
          code={`<Button variant="primary" disabled>Primary Button</Button>
<Button variant="secondary" disabled>Secondary Button</Button>
<Button variant="outline" disabled>Outline Button</Button>`}
          language="typescript"
        />
      </div>

      <div className="example-container">
        <div className="example-preview">
          <div className="button-group">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary">Default</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </div>
        <CodeBlock
          code={`<Button variant="primary" size="sm">Small</Button>
<Button variant="primary">Default</Button>
<Button variant="primary" size="lg">Large</Button>`}
          language="typescript"
        />
      </div>

      <div className="example-container">
        <div className="example-preview">
          <div className="button-group">
            <Button variant="primary">
              <span className="button-icon">+</span>
              Add Item
            </Button>
            <Button variant="outline">
              <span className="button-icon">🗑️</span>
              Delete
            </Button>
          </div>
        </div>
        <CodeBlock
          code={`<Button variant="primary">
  <span className="button-icon">+</span>
  Add Item
</Button>
<Button variant="outline">
  <span className="button-icon">🗑️</span>
  Delete
</Button>`}
          language="typescript"
        />
      </div>

      <div className="api-section">
        <h2>API</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>variant</code></td>
              <td><code>'primary' | 'secondary' | 'outline'</code></td>
              <td><code>'primary'</code></td>
              <td>The visual style variant of the button</td>
            </tr>
            <tr>
              <td><code>size</code></td>
              <td><code>'sm' | 'md' | 'lg'</code></td>
              <td><code>'md'</code></td>
              <td>The size of the button</td>
            </tr>
            <tr>
              <td><code>disabled</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Whether the button is disabled</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ButtonDemo; 