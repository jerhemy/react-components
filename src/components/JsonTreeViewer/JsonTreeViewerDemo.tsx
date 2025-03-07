import './JsonTreeViewerDemo.css';

import React, { useCallback, useEffect, useState } from 'react';

import CodeBlock from '../CodeBlock/CodeBlock';
import JsonTreeViewer from './JsonTreeViewer';

// Sample JSON data
const initialSampleJson = {
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
  },
  contacts: [
    { type: 'email', value: 'john@example.com' },
    { type: 'phone', value: '+1-555-123-4567' },
  ],
  preferences: {
    theme: 'dark',
    notifications: {
      email: true,
      push: false,
    },
  },
};

// Sample nested JSON data
const nestedJson = {
  id: 1,
  type: 'root',
  children: [
    {
      id: 2,
      type: 'folder',
      name: 'Documents',
      children: [
        {
          id: 3,
          type: 'file',
          name: 'report.pdf',
          size: '2.5MB',
        },
        {
          id: 4,
          type: 'folder',
          name: 'Projects',
          children: [
            {
              id: 5,
              type: 'file',
              name: 'project1.docx',
              size: '1.2MB',
            },
          ],
        },
      ],
    },
    {
      id: 6,
      type: 'folder',
      name: 'Pictures',
      children: [
        {
          id: 7,
          type: 'file',
          name: 'vacation.jpg',
          size: '3.1MB',
        },
      ],
    },
  ],
} as any; // Cast to any to avoid type errors with the JsonValue type

// Demo component for JsonTreeViewer
const JsonTreeViewerDemo: React.FC = () => {
  // State for the sample JSON data that will be updated
  const [sampleJson, setSampleJson] = useState(initialSampleJson);

  // State for flash configuration
  const [enableFlash, setEnableFlash] = useState(true);
  const [flashColor, setFlashColor] = useState('#ffff99');
  const [flashDuration, setFlashDuration] = useState(1000);

  // Function to update random values in the JSON
  const updateRandomValues = useCallback(() => {
    setSampleJson(prevJson => {
      // Create a deep copy of the previous JSON
      const newJson = JSON.parse(JSON.stringify(prevJson));

      // Update some random values
      newJson.age = Math.floor(Math.random() * 50) + 20; // Random age between 20-70
      newJson.address.city = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][Math.floor(Math.random() * 5)];
      newJson.contacts[0].value = `john${Math.floor(Math.random() * 100)}@example.com`;
      newJson.preferences.notifications.push = !newJson.preferences.notifications.push;

      return newJson;
    });
  }, []);

  // Auto-update the JSON every 5 seconds for demonstration
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (document.visibilityState === 'visible') {
        updateRandomValues();
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [updateRandomValues]);

  return (
    <div className="json-tree-viewer-demo">
      <h1>JSON Tree Viewer</h1>

      <section className="demo-section">
        <h2>Overview</h2>
        <p>
          The JsonTreeViewer component provides an interactive tree view for JSON data.
          It supports collapsible nodes, syntax highlighting, and now features highlighting
          of changed values when data is updated.
        </p>
      </section>

      <section className="demo-section">
        <h2>Basic Example with Change Highlighting</h2>
        <p>
          This example demonstrates the JSON Tree Viewer with change highlighting.
          Values that change will flash with the specified color and duration.
          The data updates automatically every 5 seconds, or you can click the button to update it manually.
        </p>

        <div className="flash-controls">
          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={enableFlash}
                onChange={(e) => setEnableFlash(e.target.checked)}
              />
              Enable Flash Highlighting
            </label>
          </div>

          <div className="control-group">
            <label>Flash Color:</label>
            <input
              type="color"
              value={flashColor}
              onChange={(e) => setFlashColor(e.target.value)}
              disabled={!enableFlash}
            />
          </div>

          <div className="control-group">
            <label>Flash Duration (ms):</label>
            <input
              type="range"
              min="200"
              max="3000"
              step="100"
              value={flashDuration}
              onChange={(e) => setFlashDuration(parseInt(e.target.value))}
              disabled={!enableFlash}
            />
            <span>{flashDuration}ms</span>
          </div>

          <button className="update-button" onClick={updateRandomValues}>
            Update Random Values
          </button>
        </div>

        <div className="demo-container">
          <JsonTreeViewer
            data={sampleJson}
            initialExpandedDepth={2}
            enableFlash={enableFlash}
            flashColor={flashColor}
            flashDuration={flashDuration}
          />
        </div>

        <CodeBlock code={`import JsonTreeViewer from './JsonTreeViewer';

// Your JSON data
const data = {
  name: 'John Doe',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA'
  },
  // ... more data
};

// Component with change highlighting
const MyComponent = () => {
  return (
    <JsonTreeViewer 
      data={data} 
      initialExpandedDepth={2}
      enableFlash={true}
      flashColor="#ffff99"
      flashDuration={1000}
    />
  );
};`} language="tsx" />
      </section>

      <section className="demo-section">
        <h2>Nested Example</h2>
        <p>
          This example shows a more deeply nested JSON structure.
        </p>

        <div className="demo-container">
          <JsonTreeViewer data={nestedJson} initialExpandedDepth={1} />
        </div>

        <CodeBlock code={`<JsonTreeViewer 
  data={nestedJson} 
  initialExpandedDepth={1} 
/>`} language="tsx" />
      </section>

      <section className="demo-section">
        <h2>API Reference</h2>

        <table className="api-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>data</td>
              <td>object | array</td>
              <td>Required</td>
              <td>The JSON data to display</td>
            </tr>
            <tr>
              <td>initialExpandedDepth</td>
              <td>number</td>
              <td>1</td>
              <td>How many levels to expand initially</td>
            </tr>
            <tr>
              <td>name</td>
              <td>string</td>
              <td>null</td>
              <td>Optional name for the root node</td>
            </tr>
            <tr>
              <td>isRoot</td>
              <td>boolean</td>
              <td>true</td>
              <td>Whether this is the root node</td>
            </tr>
            <tr>
              <td>enableFlash</td>
              <td>boolean</td>
              <td>true</td>
              <td>Whether to highlight values when they change</td>
            </tr>
            <tr>
              <td>flashColor</td>
              <td>string</td>
              <td>'#ffff99'</td>
              <td>Color for the flash highlight</td>
            </tr>
            <tr>
              <td>flashDuration</td>
              <td>number</td>
              <td>1000</td>
              <td>Duration of the flash animation in milliseconds</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default JsonTreeViewerDemo; 