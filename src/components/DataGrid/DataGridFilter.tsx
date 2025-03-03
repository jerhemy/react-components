import { Column, FilterModel } from './DataGrid';
import React, { useEffect, useState } from 'react';

interface DataGridFilterProps {
    column: Column;
    onFilter: (type: string, value: string) => void;
    currentFilter?: FilterModel[string];
    onClose: () => void;
}

const DataGridFilter: React.FC<DataGridFilterProps> = ({
    column,
    onFilter,
    currentFilter,
    onClose
}) => {
    const [filterType, setFilterType] = useState<string>(
        currentFilter ? currentFilter.type : 'contains'
    );
    const [filterValue, setFilterValue] = useState<string>(
        currentFilter ? currentFilter.filter : ''
    );

    useEffect(() => {
        const input = document.getElementById(`filter-input-${column.field}`);
        if (input) {
            input.focus();
        }
    }, [column.field]);

    const handleFilterTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newType = e.target.value;
        setFilterType(newType);
        onFilter(newType, filterValue);
    };

    const handleFilterValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setFilterValue(newValue);
        onFilter(filterType, newValue);
    };

    const handleClear = () => {
        setFilterValue('');
        onFilter(filterType, '');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <div className="data-grid-filter" onKeyDown={handleKeyDown} style={{ position: 'absolute', top: '30px', left: 0, zIndex: 10 }}>
            <div className="data-grid-filter-header">
                <span>Filter: {column.headerName}</span>
                <button className="data-grid-filter-close" onClick={onClose}>×</button>
            </div>
            <div className="data-grid-filter-content">
                <div className="data-grid-filter-type">
                    <select value={filterType} onChange={handleFilterTypeChange}>
                        <option value="contains">Contains</option>
                        <option value="equals">Equals</option>
                        <option value="startsWith">Starts with</option>
                        <option value="endsWith">Ends with</option>
                        <option value="greaterThan">Greater than</option>
                        <option value="lessThan">Less than</option>
                    </select>
                </div>
                <div className="data-grid-filter-input">
                    <input
                        id={`filter-input-${column.field}`}
                        type="text"
                        value={filterValue}
                        onChange={handleFilterValueChange}
                        placeholder="Filter value..."
                    />
                </div>
                <div className="data-grid-filter-actions">
                    <button className="data-grid-filter-clear" onClick={handleClear}>
                        Clear
                    </button>
                    <button className="data-grid-filter-apply" onClick={onClose}>
                        Apply
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DataGridFilter; 