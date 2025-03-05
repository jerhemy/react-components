import './JsonTreeViewerDemo.css';

import CodeBlock from '../CodeBlock/CodeBlock';
import JsonTreeViewer from './JsonTreeViewer';
import React from 'react';

const sampleJson = {
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
              name: 'project1.doc',
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
          size: '3.8MB',
        },
      ],
    },
  ],
};

const JsonTreeViewerDemo: React.FC = () => {
  const variations = [
    {
      title: 'Basic JSON Tree Viewer',
      description: 'A simple tree viewer for JSON data with collapsible nodes.',
      preview: (
        <JsonTreeViewer data={sampleJson} />
      ),
      code: `import { JsonTreeViewer } from './JsonTreeViewer';

const data = {
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
};

const MyComponent = () => {
  return <JsonTreeViewer data={data} />;
};`,
    },
    {
      title: 'Deeply Nested JSON',
      description: 'Handling deeply nested JSON structures with folder-like organization.',
      preview: (
        <JsonTreeViewer data={nestedJson} />
      ),
      code: `import { JsonTreeViewer } from './JsonTreeViewer';

const nestedData = {
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
      ],
    },
  ],
};

const MyComponent = () => {
  return <JsonTreeViewer data={nestedData} />;
};`,
    },
    {
      title: 'Custom Theme',
      description: 'JSON tree viewer with custom colors and styling.',
      preview: (
        <JsonTreeViewer
          data={sampleJson}
          theme={{
            backgroundColor: 'var(--bg-color)',
            textColor: 'var(--text-color)',
            keyColor: 'var(--primary-color)',
            stringColor: 'var(--success-text)',
            numberColor: 'var(--warning-text)',
            booleanColor: 'var(--error-text)',
          }}
        />
      ),
      code: `import { JsonTreeViewer } from './JsonTreeViewer';

const MyComponent = () => {
  return (
    <JsonTreeViewer
      data={data}
      theme={{
        backgroundColor: 'var(--bg-color)',
        textColor: 'var(--text-color)',
        keyColor: 'var(--primary-color)',
        stringColor: 'var(--success-text)',
        numberColor: 'var(--warning-text)',
        booleanColor: 'var(--error-text)',
      }}
    />
  );
};`,
    },
    {
      title: 'Initial Expanded Depth',
      description: 'Control which levels are initially expanded in the tree.',
      preview: (
        <JsonTreeViewer
          data={nestedJson}
          defaultExpandedDepth={2}
        />
      ),
      code: `import { JsonTreeViewer } from './JsonTreeViewer';

const MyComponent = () => {
  return (
    <JsonTreeViewer
      data={data}
      defaultExpandedDepth={2}
    />
  );
};`,
    },
  ];

  return (
    <div className="jsontreeviewer-demo">
      <h2>JSON Tree Viewer Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The JSON Tree Viewer component provides an interactive way to visualize and
          explore JSON data structures. It supports features like collapsible nodes,
          custom themes, and controlled expansion levels.
        </p>
      </div>

      {variations.map((variation, index) => (
        <div key={index} className="demo-variation">
          <h3>{variation.title}</h3>
          <p>{variation.description}</p>

          <div className="demo-preview">
            <h4>Preview</h4>
            <div className="preview-container">
              {variation.preview}
            </div>
          </div>

          <div className="demo-code">
            <h4>Code</h4>
            <CodeBlock code={variation.code} language="tsx" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <CodeBlock
          code={`/* Add these styles to your CSS file */
.json-tree {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 16px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.json-tree-node {
  margin-left: 24px;
}

.json-tree-key {
  color: var(--primary-color);
  margin-right: 8px;
}

.json-tree-value {
  color: var(--text-color);
}

.json-tree-value.string {
  color: var(--success-text);
}

.json-tree-value.number {
  color: var(--warning-text);
}

.json-tree-value.boolean {
  color: var(--error-text);
}

.json-tree-toggle {
  cursor: pointer;
  user-select: none;
  margin-right: 4px;
}

.json-tree-toggle:hover {
  opacity: 0.8;
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default JsonTreeViewerDemo; 