import { Column, SortModel } from './DataGrid';
import React, { useEffect, useRef, useState } from 'react';

interface DataGridHeaderProps {
    column: Column;
    sortModel: SortModel | null;
    onSort?: () => void;
    onFilter?: (e: React.MouseEvent) => void;
    onResize?: (width: number) => void;
    style?: React.CSSProperties;
}

const DataGridHeader: React.FC<DataGridHeaderProps> = ({
    column,
    sortModel,
    onSort,
    onFilter,
    onResize,
    style
}) => {
    const [isResizing, setIsResizing] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const startXRef = useRef<number>(0);
    const startWidthRef = useRef<number>(0);
    const isResizingRef = useRef(false);

    const isSorted = sortModel && sortModel.colId === column.field;
    const sortDirection = isSorted ? sortModel.sort : null;

    const renderSortIcon = () => {
        if (column.sortable === false) return null;

        return (
            <div className="data-grid-sort-icon">
                {sortDirection === 'asc' && <span>▲</span>}
                {sortDirection === 'desc' && <span>▼</span>}
                {!sortDirection && <span className="unsorted">⇅</span>}
            </div>
        );
    };

    const renderFilterIcon = () => {
        if (column.filterable === false) return null;

        return (
            <div className="data-grid-filter-icon">
                <span>🔍</span>
            </div>
        );
    };

    const handleHeaderClick = (e: React.MouseEvent) => {
        if (onSort && !isResizing) {
            onSort();
        }
    };

    const handleFilterClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onFilter) {
            onFilter(e);
        }
    };

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();

        if (!headerRef.current || !onResize) return;

        console.log('Resize started');
        setIsResizing(true);
        isResizingRef.current = true;
        startXRef.current = e.clientX;
        startWidthRef.current = headerRef.current.offsetWidth;

        document.addEventListener('mousemove', handleResizeMouseMove);
        document.addEventListener('mouseup', handleResizeMouseUp);
        console.log('Event listeners attached');
    };

    const handleResizeMouseMove = (e: MouseEvent) => {
        console.log('Mouse move detected, isResizingRef:', isResizingRef.current);
        if (!isResizingRef.current || !headerRef.current || !onResize) return;

        const width = startWidthRef.current + (e.clientX - startXRef.current);
        console.log('Resizing... New width:', width);

        if (width >= 50) {
            headerRef.current.style.width = `${width}px`;
            onResize(width);
        }
    };

    const handleResizeMouseUp = (e: MouseEvent) => {
        if (!isResizingRef.current || !headerRef.current || !onResize) return;

        console.log('Resize ended');
        setIsResizing(false);
        isResizingRef.current = false;
        document.removeEventListener('mousemove', handleResizeMouseMove);
        document.removeEventListener('mouseup', handleResizeMouseUp);

        const width = headerRef.current.offsetWidth;
        console.log('Final width set:', width);
        onResize(width);
    };

    useEffect(() => {
        console.log('isResizing state changed:', isResizing);
    }, [isResizing]);

    return (
        <div
            ref={headerRef}
            className={`data-grid-header-cell ${column.headerClass || ''} ${isSorted ? 'sorted' : ''}`}
            style={style}
            onClick={handleHeaderClick}
        >
            <div className="data-grid-header-content">
                {column.headerRenderer ? (
                    column.headerRenderer({ column, displayName: column.headerName })
                ) : (
                    <span className="data-grid-header-text">{column.headerName}</span>
                )}
            </div>
            <div className="data-grid-header-actions" style={{ position: 'relative' }}>
                {renderSortIcon()}
                {column.filterable !== false && (
                    <div className="data-grid-filter-button" onClick={handleFilterClick}>
                        {renderFilterIcon()}
                    </div>
                )}
            </div>
            {column.resizable !== false && onResize && (
                <div
                    className="data-grid-resize-handle"
                    onMouseDown={handleResizeMouseDown}
                    onClick={(e) => e.stopPropagation()}
                />
            )}
        </div>
    );
};

export default DataGridHeader; 