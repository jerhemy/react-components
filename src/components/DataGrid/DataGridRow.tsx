import { CellRendererParams, Column } from './DataGrid';
import React, { useState } from 'react';

interface DataGridRowProps {
    data: any;
    columns: Column[];
    rowIndex: number;
    rowHeight: number;
    onClick?: () => void;
    columnWidths?: { [key: string]: number | string };
}

const DataGridRow: React.FC<DataGridRowProps> = ({
    data,
    columns,
    rowIndex,
    rowHeight,
    onClick,
    columnWidths = {}
}) => {
    const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});
    const [editedData, setEditedData] = useState(data);

    const isEven = rowIndex % 2 === 0;

    const handleDoubleClick = (field: string) => {
        if (rowIndex === 0 || columns.find(col => col.field === field)?.editable) {
            setEditMode(prev => ({ ...prev, [field]: true }));
        }
    };

    const handleBlur = (field: string) => {
        if (editMode[field]) {
            console.log('Row data updated:', editedData);
            setEditMode(prev => ({ ...prev, [field]: false }));
        }
    };

    const handleChange = (field: string, value: string) => {
        setEditedData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div
            className={`data-grid-row ${isEven ? 'even' : 'odd'}`}
            style={{ height: rowHeight }}
            onClick={onClick}
        >
            {columns.map((column) => {
                const value = data[column.field];
                const cellParams: CellRendererParams = {
                    value,
                    data,
                    rowIndex,
                    colDef: column
                };

                return (
                    <div
                        key={column.field}
                        className={`data-grid-cell ${column.cellClass || ''}`}
                        style={{
                            width: columnWidths[column.field] || column.width || 'auto',
                            flex: column.resizable === false && !column.width ? 1 : undefined
                        }}
                        onDoubleClick={() => handleDoubleClick(column.field)}
                    >
                        {editMode[column.field] ? (
                            <input
                                type="text"
                                value={editedData[column.field]}
                                onChange={(e) => handleChange(column.field, e.target.value)}
                                onBlur={() => handleBlur(column.field)}
                                autoFocus
                            />
                        ) : (
                            column.cellRenderer ? (
                                column.cellRenderer(cellParams)
                            ) : (
                                <span className="data-grid-cell-value">{value !== undefined ? String(value) : ''}</span>
                            )
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default DataGridRow; 