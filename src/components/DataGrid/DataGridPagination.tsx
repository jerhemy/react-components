import React from 'react';

interface DataGridPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalRows: number;
    pageSize: number;
}

const DataGridPagination: React.FC<DataGridPaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalRows,
    pageSize
}) => {
    const startRow = (currentPage - 1) * pageSize + 1;
    const endRow = Math.min(currentPage * pageSize, totalRows);

    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handleFirstPage = () => {
        onPageChange(1);
    };

    const handleLastPage = () => {
        onPageChange(totalPages);
    };

    const renderPageButtons = () => {
        const buttons = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={`data-grid-page-button ${currentPage === i ? 'active' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            }
        } else {
            buttons.push(
                <button
                    key={1}
                    className={`data-grid-page-button ${currentPage === 1 ? 'active' : ''}`}
                    onClick={() => onPageChange(1)}
                >
                    1
                </button>
            );

            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(totalPages - 1, currentPage + 1);

            if (endPage - startPage < 2) {
                if (startPage === 2) {
                    endPage = Math.min(4, totalPages - 1);
                } else if (endPage === totalPages - 1) {
                    startPage = Math.max(2, totalPages - 3);
                }
            }

            if (startPage > 2) {
                buttons.push(<span key="ellipsis1" className="data-grid-page-ellipsis">...</span>);
            }

            for (let i = startPage; i <= endPage; i++) {
                buttons.push(
                    <button
                        key={i}
                        className={`data-grid-page-button ${currentPage === i ? 'active' : ''}`}
                        onClick={() => onPageChange(i)}
                    >
                        {i}
                    </button>
                );
            }

            if (endPage < totalPages - 1) {
                buttons.push(<span key="ellipsis2" className="data-grid-page-ellipsis">...</span>);
            }

            buttons.push(
                <button
                    key={totalPages}
                    className={`data-grid-page-button ${currentPage === totalPages ? 'active' : ''}`}
                    onClick={() => onPageChange(totalPages)}
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="data-grid-pagination">
            <div className="data-grid-pagination-info">
                Showing {startRow} to {endRow} of {totalRows} entries
            </div>
            <div className="data-grid-pagination-controls">
                <button
                    className="data-grid-pagination-button first"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                >
                    ⟪
                </button>
                <button
                    className="data-grid-pagination-button prev"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>

                <div className="data-grid-pagination-pages">
                    {renderPageButtons()}
                </div>

                <button
                    className="data-grid-pagination-button next"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    ▶
                </button>
                <button
                    className="data-grid-pagination-button last"
                    onClick={handleLastPage}
                    disabled={currentPage === totalPages}
                >
                    ⟫
                </button>
            </div>
        </div>
    );
};

export default DataGridPagination; 