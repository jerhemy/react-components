/**
 * DataGridDemo.tsx
 * 
 * This component demonstrates the usage and features of the DataGrid component.
 * It showcases sorting, filtering, pagination, custom cell renderers, and other
 * grid functionalities with sample data.
 */

import './DataGridDemo.css';

import DataGrid, { CellRendererParams, Column } from './DataGrid';
import React, { useState } from 'react';

/**
 * Interface for the row data structure
 */
interface DemoRowData {
    id: number;
    name: string;
    age: number;
    email: string;
    country: string;
    salary: number;
    isActive: boolean;
    joinDate: string;
}

/**
 * Generates sample data for the grid demonstration
 * @param count - Number of data rows to generate
 * @returns Array of objects with random data for demonstration
 */
const generateData = (count: number): DemoRowData[] => {
    const data: DemoRowData[] = [];
    for (let i = 1; i <= count; i++) {
        data.push({
            id: i,
            name: `Person ${i}`,
            age: Math.floor(Math.random() * 50) + 18,
            email: `person${i}@example.com`,
            country: ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'France', 'Japan'][Math.floor(Math.random() * 7)],
            salary: Math.floor(Math.random() * 100000) + 30000,
            isActive: Math.random() > 0.3,
            joinDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365 * 5)).toISOString().split('T')[0]
        });
    }
    return data;
};

/**
 * Custom cell renderer for boolean values
 * Displays "Active" or "Inactive" with appropriate styling based on the value
 * @param params - Cell renderer parameters containing the cell value
 * @returns JSX element with styled boolean representation
 */
const BooleanCellRenderer = (params: CellRendererParams) => {
    return (
        <div className={`boolean-cell ${params.value ? 'active' : 'inactive'}`}>
            {params.value ? 'Active' : 'Inactive'}
        </div>
    );
};

/**
 * Custom cell renderer for currency values
 * Formats numbers as currency with dollar sign and thousands separators
 * @param params - Cell renderer parameters containing the cell value
 * @returns JSX element with formatted currency value
 */
const CurrencyCellRenderer = (params: CellRendererParams) => {
    return (
        <div className="currency-cell">
            ${params.value.toLocaleString()}
        </div>
    );
};

/**
 * Main DataGridDemo component that showcases the DataGrid functionality
 */
const DataGridDemo = () => {
    // Initialize with 100 rows of sample data
    const [rowData] = useState<DemoRowData[]>(generateData(100));

    // State to track the currently selected row
    const [selectedRow, setSelectedRow] = useState<DemoRowData | null>(null);

    // Configuration state for column features that can be toggled
    const [columnConfig, setColumnConfig] = useState({
        sortable: true,
        filterable: true,
        resizable: true
    });

    /**
     * Column definitions for the DataGrid
     * Each column has configuration for field mapping, header text, width/flex,
     * and feature flags (sortable, filterable, resizable)
     */
    const columnDefs: Column[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 70,
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable
        },
        {
            field: 'name',
            headerName: 'Name',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            flex: 1
        },
        {
            field: 'age',
            headerName: 'Age',
            width: 80,
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable
        },
        {
            field: 'email',
            headerName: 'Email',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            flex: 1.5
        },
        {
            field: 'country',
            headerName: 'Country',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            flex: 1
        },
        {
            field: 'salary',
            headerName: 'Salary',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            cellRenderer: CurrencyCellRenderer, // Custom renderer for currency formatting
            flex: 1
        },
        {
            field: 'isActive',
            headerName: 'Status',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            cellRenderer: BooleanCellRenderer, // Custom renderer for boolean values
            width: 100
        },
        {
            field: 'joinDate',
            headerName: 'Join Date',
            sortable: columnConfig.sortable,
            filterable: columnConfig.filterable,
            resizable: columnConfig.resizable,
            flex: 1
        }
    ];

    /**
     * Handler for row click events
     * Updates the selectedRow state with the data from the clicked row
     * @param data - Data object from the clicked row
     * @param index - Index of the clicked row (not used in this implementation)
     */
    const handleRowClick = (data: Record<string, unknown>, index: number) => {
        // We cast to DemoRowData since we know the structure of our data
        setSelectedRow(data as DemoRowData);
        // index is not used in this implementation but is required by the interface
    };

    /**
     * Toggles a specific column configuration option (sortable, filterable, resizable)
     * @param option - The configuration option to toggle
     */
    const toggleOption = (option: keyof typeof columnConfig) => {
        setColumnConfig(prev => ({
            ...prev,
            [option]: !prev[option]
        }));
    };

    return (
        <div className="data-grid-demo">
            <h1>React DataGrid Demo</h1>
            <p className="description">
                A feature-rich data grid component with sorting, filtering, and pagination capabilities.
            </p>

            {/* Column configuration toggles */}
            <div className="column-options">
                <h2>Column Options</h2>
                <div className="option-toggles">
                    <label>
                        <input
                            type="checkbox"
                            checked={columnConfig.sortable}
                            onChange={() => toggleOption('sortable')}
                        />
                        Enable Sorting
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnConfig.filterable}
                            onChange={() => toggleOption('filterable')}
                        />
                        Enable Filtering
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={columnConfig.resizable}
                            onChange={() => toggleOption('resizable')}
                        />
                        Enable Resizing
                    </label>
                </div>
            </div>

            {/* Main DataGrid component with configuration */}
            <div className="grid-container">
                <DataGrid
                    columnDefs={columnDefs}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={10}
                    onRowClick={handleRowClick}
                    defaultSortModel={{ colId: 'id', sort: 'asc' }}
                    allowHorizontalScroll={true}
                />
            </div>

            {/* Display details of the selected row when available */}
            {selectedRow && (
                <div className="selected-row-details">
                    <h2>Selected Row Details</h2>
                    <pre>{JSON.stringify(selectedRow, null, 2)}</pre>
                </div>
            )}

            {/* List of features demonstrated in this component */}
            <div className="features-list">
                <h2>Features</h2>
                <ul>
                    <li>Column sorting (click on column headers) {columnConfig.sortable ? '✅' : '❌'}</li>
                    <li>Column filtering (click on filter icon) {columnConfig.filterable ? '✅' : '❌'}</li>
                    <li>Column resizing (drag column edge) {columnConfig.resizable ? '✅' : '❌'}</li>
                    <li>Pagination with customizable page size</li>
                    <li>Custom cell renderers</li>
                    <li>Row selection</li>
                    <li>Responsive design</li>
                    <li>Customizable column widths</li>
                </ul>
            </div>
        </div>
    );
};

export default DataGridDemo; 