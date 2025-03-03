/**
 * DataGridDemo.tsx
 * 
 * This component demonstrates the usage and features of the DataGrid component.
 * It showcases sorting, filtering, pagination, custom cell renderers, and other
 * grid functionalities with sample data.
 */

import './DataGridDemo.css';

import CodeBlock from './CodeBlock/CodeBlock';
import DataGrid from './DataGrid/DataGrid';
import React from 'react';

/**
 * Interface for the row data structure
 */
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

/**
 * Generates sample data for the grid demonstration
 * @param count - Number of data rows to generate
 * @returns Array of objects with random data for demonstration
 */
const generateData = (count: number): User[] => {
  const roles = ['Admin', 'User', 'Editor', 'Viewer', 'Manager'];
  const names = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Diana', 'Edward', 'Fiona'];
  const surnames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];

  const data: User[] = [];
  for (let i = 1; i <= count; i++) {
    const name = `${names[Math.floor(Math.random() * names.length)]} ${surnames[Math.floor(Math.random() * surnames.length)]}`;
    data.push({
      id: i,
      name: name,
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      status: Math.random() > 0.3 ? 'Active' : 'Inactive',
      lastLogin: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString().split('T')[0]
    });
  }
  return data;
};

/**
 * Main DataGridDemo component that showcases the DataGrid functionality
 */
const DataGridDemo: React.FC = () => {
  const variations = [
    {
      title: 'Basic Data Grid',
      description: 'A simple data grid with basic functionality.',
      preview: (
        <DataGrid
          columnDefs={[
            { field: 'name', headerName: 'Name' },
            { field: 'email', headerName: 'Email' },
            { field: 'role', headerName: 'Role' }
          ]}
          rowData={generateData(10)}
        />
      ),
      code: `import { DataGrid } from './DataGrid';

const MyComponent = () => {
  return (
    <DataGrid
      columnDefs={[
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'role', headerName: 'Role' }
      ]}
      rowData={data}
    />
  );
};`
    },
    {
      title: 'Sortable Columns',
      description: 'A data grid with sortable columns.',
      preview: (
        <DataGrid
          columnDefs={[
            { field: 'name', headerName: 'Name', sortable: true },
            { field: 'email', headerName: 'Email', sortable: true },
            { field: 'role', headerName: 'Role', sortable: true }
          ]}
          rowData={generateData(10)}
        />
      ),
      code: `import { DataGrid } from './DataGrid';

const MyComponent = () => {
  return (
    <DataGrid
      columnDefs={[
        { field: 'name', headerName: 'Name', sortable: true },
        { field: 'email', headerName: 'Email', sortable: true },
        { field: 'role', headerName: 'Role', sortable: true }
      ]}
      rowData={data}
    />
  );
};`
    },
    {
      title: 'Custom Cell Rendering',
      description: 'A data grid with custom cell rendering for specific columns.',
      preview: (
        <DataGrid
          columnDefs={[
            { field: 'name', headerName: 'Name' },
            {
              field: 'status',
              headerName: 'Status',
              cellRenderer: (params) => (
                <span className={`status-badge ${params.value.toLowerCase()}`}>
                  {params.value}
                </span>
              )
            },
            {
              field: 'lastLogin',
              headerName: 'Last Login',
              cellRenderer: (params) => new Date(params.value).toLocaleDateString()
            }
          ]}
          rowData={generateData(10)}
        />
      ),
      code: `import { DataGrid } from './DataGrid';

const MyComponent = () => {
  return (
    <DataGrid
      columnDefs={[
        { field: 'name', headerName: 'Name' },
        { 
          field: 'status', 
          headerName: 'Status',
          cellRenderer: (params) => (
            <span className={\`status-badge \${params.value.toLowerCase()}\`}>
              {params.value}
            </span>
          )
        },
        {
          field: 'lastLogin',
          headerName: 'Last Login',
          cellRenderer: (params) => new Date(params.value).toLocaleDateString()
        }
      ]}
      rowData={data}
    />
  );
};`
    },
    {
      title: 'Paginated Data Grid',
      description: 'A data grid with pagination support.',
      preview: (
        <DataGrid
          columnDefs={[
            { field: 'name', headerName: 'Name' },
            { field: 'email', headerName: 'Email' },
            { field: 'role', headerName: 'Role' }
          ]}
          rowData={generateData(100)}
          pagination={true}
          paginationPageSize={5}
        />
      ),
      code: `import { DataGrid } from './DataGrid';

const MyComponent = () => {
  return (
    <DataGrid
      columnDefs={[
        { field: 'name', headerName: 'Name' },
        { field: 'email', headerName: 'Email' },
        { field: 'role', headerName: 'Role' }
      ]}
      rowData={data}
      pagination={true}
      paginationPageSize={5}
    />
  );
};`
    }
  ];

  return (
    <div className="datagrid-demo">
      <h2>DataGrid Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The DataGrid component is a powerful and flexible data table component that
          supports features like sorting, filtering, pagination, and custom cell rendering.
          It's designed to handle large datasets efficiently while maintaining a smooth
          user experience.
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
.data-grid {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.data-grid th,
.data-grid td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.data-grid th {
  background-color: var(--hover-color);
  font-weight: 600;
  color: var(--heading-color);
}

.data-grid tr:hover {
  background-color: var(--hover-color);
}

.data-grid-pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.active {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.status-badge.inactive {
  background-color: var(--warning-bg);
  color: var(--warning-text);
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default DataGridDemo; 