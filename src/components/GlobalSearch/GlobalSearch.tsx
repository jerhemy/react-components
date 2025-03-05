import './GlobalSearch.css';

import React, { useEffect, useRef, useState } from 'react';

// Define the structure of a search result
interface SearchResult {
    category: string;
    items: { label: string; value: any }[];
}

// Define the display mode type
type DisplayMode = 'grouped' | 'flat';

// Define custom render function types
interface RenderFunctions {
    renderIcon?: () => React.ReactNode;
    renderItem?: (item: { label: string; value: any }) => React.ReactNode;
    renderCategory?: (category: string) => React.ReactNode;
}

// Define the props for the GlobalSearch component
interface GlobalSearchProps {
    data: any[];
    searchProperty: string;
    categoryProperty: string;
    displayMode?: DisplayMode;
    renderFunctions?: RenderFunctions;
    placeholder?: string;
}

// GlobalSearch component definition
const GlobalSearch: React.FC<GlobalSearchProps> = ({
    data,
    searchProperty,
    categoryProperty,
    displayMode = 'grouped',
    renderFunctions = {},
    placeholder = 'Search...'
}) => {
    // State for the search query
    const [query, setQuery] = useState('');
    // State for the search results
    const [results, setResults] = useState<SearchResult[]>([]);
    // State for the highlighted index in the dropdown
    const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
    // Ref for the dropdown element
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // Handle search input changes
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        if (searchQuery.length > 0) {
            // Filter results based on the search query
            const filteredResults: SearchResult[] = data.reduce((acc, item) => {
                const searchValue = item[searchProperty];
                const categoryValue = item[categoryProperty];
                if (searchValue && String(searchValue).toLowerCase().includes(searchQuery)) {
                    const category = acc.find((cat: SearchResult) => cat.category === categoryValue);
                    if (category) {
                        category.items.push({ label: String(searchValue), value: item });
                    } else {
                        acc.push({ category: categoryValue, items: [{ label: String(searchValue), value: item }] });
                    }
                }
                return acc;
            }, [] as SearchResult[]);

            setResults(filteredResults);
            setHighlightedIndex(null);
        } else {
            setResults([]);
            setHighlightedIndex(null);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (results.length === 0) return;

        const allItems = results.flatMap(result => result.items);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev === null || prev === allItems.length - 1 ? 0 : prev + 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex(prev => (prev === null || prev === 0 ? allItems.length - 1 : prev - 1));
        } else if (e.key === 'Enter' && highlightedIndex !== null) {
            e.preventDefault();
            const selectedItem = allItems[highlightedIndex];
            setQuery(selectedItem.label);
            setResults([]);
        }
    };

    // Handle item click
    const handleItemClick = (item: { label: string; value: any }) => {
        setQuery(item.label);
        setResults([]);
    };

    // Clear the search input
    const handleClear = () => {
        setQuery('');
        setResults([]);
        setHighlightedIndex(null);
    };

    // Scroll the highlighted item into view
    useEffect(() => {
        if (dropdownRef.current && highlightedIndex !== null) {
            const highlightedItem = dropdownRef.current.querySelectorAll('.global-search-item')[highlightedIndex];
            highlightedItem?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex]);

    // Render the dropdown content based on display mode
    const renderDropdownContent = () => {
        if (displayMode === 'flat') {
            const allItems = results.flatMap((result, categoryIndex) =>
                result.items.map(item => ({
                    ...item,
                    label: `${result.category} • ${item.label}`,
                    originalIndex: categoryIndex
                }))
            );

            return (
                <ul className="global-search-flat-list">
                    {allItems.map((item, index) => (
                        <li
                            key={index}
                            className={`global-search-item ${highlightedIndex === index ? 'highlighted' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {renderFunctions.renderItem ? renderFunctions.renderItem(item) : item.label}
                        </li>
                    ))}
                </ul>
            );
        }

        return results.map((result, categoryIndex) => (
            <div key={result.category} className="global-search-category">
                {renderFunctions.renderCategory ? (
                    renderFunctions.renderCategory(result.category)
                ) : (
                    <strong>{result.category}</strong>
                )}
                <ul>
                    {result.items.map((item, index) => (
                        <li
                            key={index}
                            className={`global-search-item ${highlightedIndex === index ? 'highlighted' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            {renderFunctions.renderItem ? renderFunctions.renderItem(item) : item.label}
                        </li>
                    ))}
                </ul>
            </div>
        ));
    };

    // Render the component
    return (
        <div className="global-search" style={{ position: 'relative' }}>
            <div className="global-search-input-container">
                {renderFunctions.renderIcon && (
                    <div className="global-search-icon">
                        {renderFunctions.renderIcon()}
                    </div>
                )}
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className={`global-search-input ${renderFunctions.renderIcon ? 'with-icon' : ''}`}
                />
                {query && (
                    <button className="clear-button" onClick={handleClear} aria-label="Clear search">
                        &times;
                    </button>
                )}
            </div>
            {results.length > 0 && (
                <div className={`global-search-dropdown ${displayMode === 'flat' ? 'flat' : 'grouped'}`} ref={dropdownRef}>
                    {renderDropdownContent()}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch; 