import './DataGrid.css';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import DataGridFilter from './DataGridFilter';
import DataGridHeader from './DataGridHeader';
import DataGridPagination from './DataGridPagination';
import DataGridRow from './DataGridRow';

// Define the structure of a column in the DataGrid
export interface Column {
    field: string;
    headerName: string;
    width?: number | string;
    sortable?: boolean;
    filterable?: boolean;
    resizable?: boolean;
    cellRenderer?: (params: CellRendererParams) => React.ReactNode;
    headerRenderer?: (params: HeaderRendererParams) => React.ReactNode;
    pinned?: 'left' | 'right';
    flex?: number;
    cellClass?: string;
    headerClass?: string;
}

// Define parameters for cell renderer function
export interface CellRendererParams {
    value: any;
    data: RowData;
    rowIndex: number;
    colDef: Column;
}

// Define parameters for header renderer function
export interface HeaderRendererParams {
    column: Column;
    displayName: string;
}

// Define the structure for sorting configuration
export interface SortModel {
    colId: string;
    sort: 'asc' | 'desc';
}

// Define the structure for filtering configuration
export interface FilterModel {
    [key: string]: {
        filterType: 'text' | 'number' | 'date';
        type: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
        filter: string;
    };
}

// Define a type for row data
interface RowData {
    [key: string]: any;
}

// Define the props for the DataGrid component
export interface DataGridProps {
    columnDefs: Column[];
    rowData: RowData[];
    rowHeight?: number;
    headerHeight?: number;
    pagination?: boolean;
    paginationPageSize?: number;
    className?: string;
    onRowClick?: (data: RowData, index: number) => void;
    defaultSortModel?: SortModel;
    defaultFilterModel?: FilterModel;
    allowHorizontalScroll?: boolean;
}

// DataGrid component definition
const DataGrid: React.FC<DataGridProps> = ({
    columnDefs,
    rowData = [],
    rowHeight = 40,
    headerHeight = 50,
    pagination = true,
    paginationPageSize = 10,
    className = '',
    onRowClick,
    defaultSortModel,
    defaultFilterModel,
    allowHorizontalScroll = false
}) => {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // State for sorting
    const [sortModel, setSortModel] = useState<SortModel | null>(defaultSortModel || null);
    // State for filtering
    const [filterModel, setFilterModel] = useState<FilterModel>(defaultFilterModel || {});
    // State for showing filter popup
    const [showFilter, setShowFilter] = useState<string | null>(null);
    // State for column widths
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(() => {
        // Initialize column widths based on content length
        const initialWidths: { [key: string]: number } = {};
        columnDefs.forEach(column => {
            const maxContentLength = Math.max(...rowData.map(row => String(row[column.field]).length));
            const estimatedWidth = Math.min(Math.max(maxContentLength * 8, 50), 300); // Estimate width with min 50px and max 300px
            initialWidths[column.field] = estimatedWidth;
        });
        return initialWidths;
    });

    // Apply sorting to the data
    const sortData = useCallback((data: RowData[], sortModel: SortModel | null): RowData[] => {
        if (!sortModel) return data;

        return [...data].sort((a, b) => {
            const valueA = a[sortModel.colId];
            const valueB = b[sortModel.colId];

            if (valueA === valueB) return 0;

            const comparison = valueA < valueB ? -1 : 1;
            return sortModel.sort === 'asc' ? comparison : -comparison;
        });
    }, []);

    // Apply filtering to the data
    const filterData = useCallback((data: RowData[], filterModel: FilterModel): RowData[] => {
        if (Object.keys(filterModel).length === 0) return data;

        return data.filter(row => {
            return Object.entries(filterModel).every(([field, filterConfig]) => {
                const cellValue = String(row[field] || '').toLowerCase();
                const filterValue = filterConfig.filter.toLowerCase();

                // Apply different filter types
                switch (filterConfig.type) {
                    case 'contains':
                        return cellValue.includes(filterValue);
                    case 'equals':
                        return cellValue === filterValue;
                    case 'startsWith':
                        return cellValue.startsWith(filterValue);
                    case 'endsWith':
                        return cellValue.endsWith(filterValue);
                    case 'greaterThan':
                        return Number(cellValue) > Number(filterValue);
                    case 'lessThan':
                        return Number(cellValue) < Number(filterValue);
                    default:
                        return true;
                }
            });
        });
    }, []);

    // Process data with sorting and filtering
    const processedData = useMemo(() => {
        let result = [...rowData];
        result = filterData(result, filterModel);
        result = sortData(result, sortModel);
        return result;
    }, [rowData, sortModel, filterModel, sortData, filterData]);

    // Calculate pagination
    const paginatedData = useMemo(() => {
        if (!pagination) return processedData;

        const startIndex = (currentPage - 1) * paginationPageSize;
        return processedData.slice(startIndex, startIndex + paginationPageSize);
    }, [processedData, pagination, currentPage, paginationPageSize]);

    // Calculate total pages for pagination
    const totalPages = useMemo(() => {
        return Math.ceil(processedData.length / paginationPageSize);
    }, [processedData, paginationPageSize]);

    // Reset to first page when filter or sort changes
    useEffect(() => {
        setCurrentPage(1);
    }, [sortModel, filterModel]);

    // Handle sorting when a column header is clicked
    const handleSort = (colId: string) => {
        const column = columnDefs.find(col => col.field === colId);
        if (!column || column.sortable === false) return;

        setSortModel(prevSort => {
            if (prevSort && prevSort.colId === colId) {
                if (prevSort.sort === 'asc') {
                    return { colId, sort: 'desc' };
                } else {
                    return null;
                }
            } else {
                return { colId, sort: 'asc' };
            }
        });
    };

    // Handle filtering
    const handleFilter = (colId: string, filterType: 'text' | 'number' | 'date', type: string, value: string) => {
        const column = columnDefs.find(col => col.field === colId);
        if (!column || column.filterable === false) return;

        setFilterModel(prev => {
            if (value === '') {
                const newModel: FilterModel = { ...prev };
                delete newModel[colId];
                return newModel;
            }

            return {
                ...prev,
                [colId]: {
                    filterType,
                    type: type as 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan',
                    filter: value
                }
            };
        });
    };

    // Toggle filter popup
    const toggleFilter = (colId: string, event: React.MouseEvent<HTMLElement>) => {
        const column = columnDefs.find(col => col.field === colId);
        if (!column || column.filterable === false) return;

        // Position the filter popup
        const filterContainer = document.querySelector('.data-grid-filter-container');
        if (filterContainer) {
            const rect = event.currentTarget.getBoundingClientRect();
            filterContainer.setAttribute('style', `position: absolute; top: ${rect.bottom}px; left: ${rect.left}px; z-index: 10;`);
        }

        setShowFilter(prev => prev === colId ? null : colId);
    };

    // Handle column resizing
    const handleColumnResize = (colId: string, newWidth: number) => {
        const column = columnDefs.find(col => col.field === colId);
        if (!column || column.resizable === false) return;

        console.log('Resizing column:', colId, 'New width:', newWidth);
        setColumnWidths(prev => {
            const updatedWidths: Record<string, number> = { ...prev };
            updatedWidths[colId] = newWidth;
            console.log('Updated column widths:', updatedWidths);

            // Adjust container width if horizontal scrolling is allowed
            if (allowHorizontalScroll) {
                const sum: number = Object.values(updatedWidths).reduce((acc: number, width: number) => acc + width, 0);
                const container = document.querySelector('.data-grid-container') as HTMLElement;
                if (container) {
                    container.style.minWidth = `${sum}px`;
                }
            }

            return updatedWidths;
        });
    };

    // Render the DataGrid component
    return (
        <div className={`data-grid ${className}`} style={{ overflowX: allowHorizontalScroll ? 'auto' : 'hidden' }}>
            <div style={{ overflowX: allowHorizontalScroll ? 'auto' : 'hidden' }}>
                <div className="data-grid-container" style={{ minWidth: allowHorizontalScroll ? 'fit-content' : 'auto' }}>
                    {/* Render header row */}
                    <div className="data-grid-header" style={{ height: headerHeight }}>
                        {columnDefs.map((column) => (
                            <DataGridHeader
                                key={column.field}
                                column={column}
                                sortModel={sortModel}
                                onSort={column.sortable !== false ? () => handleSort(column.field) : undefined}
                                onFilter={column.filterable !== false ? (e: React.MouseEvent<Element>) => toggleFilter(column.field, e as React.MouseEvent<HTMLElement>) : undefined}
                                onResize={column.resizable !== false ? (width: number) => handleColumnResize(column.field, width) : undefined}
                                style={{
                                    width: columnWidths[column.field] || column.width || 'auto',
                                    flex: column.resizable === false && !column.width ? 1 : undefined
                                }}
                            />
                        ))}
                    </div>

                    {/* Render filter popup if a column is selected for filtering */}
                    {showFilter && (
                        <div className="data-grid-filter-container">
                            <DataGridFilter
                                column={columnDefs.find(col => col.field === showFilter)!}
                                onFilter={(type, value) => handleFilter(showFilter, 'text', type, value)}
                                currentFilter={filterModel[showFilter]}
                                onClose={() => setShowFilter(null)}
                            />
                        </div>
                    )}

                    {/* Render data rows */}
                    <div className="data-grid-body">
                        {paginatedData.length === 0 ? (
                            <div className="data-grid-no-rows">No rows to show</div>
                        ) : (
                            paginatedData.map((row, rowIndex) => (
                                <DataGridRow
                                    key={rowIndex}
                                    data={row}
                                    columns={columnDefs}
                                    rowIndex={rowIndex}
                                    rowHeight={rowHeight}
                                    onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                                    columnWidths={columnWidths}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Render pagination if enabled */}
            {pagination && processedData.length > 0 && (
                <DataGridPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalRows={processedData.length}
                    pageSize={paginationPageSize}
                />
            )}
        </div>
    );
};

export default DataGrid;