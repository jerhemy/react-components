import './GlobalSearch.css';

import React, { useEffect, useRef, useState } from 'react';

// Define the structure of a search result
interface SearchResult {
    category: string;
    items: { label: string; value: any }[];
}

// Define the props for the GlobalSearch component
interface GlobalSearchProps {
    data: any[];
    searchProperty: string;
    categoryProperty: string;
}

// GlobalSearch component definition
const GlobalSearch: React.FC<GlobalSearchProps> = ({ data, searchProperty, categoryProperty }) => {
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
        console.log('Search query:', searchQuery);

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

            console.log('Filtered results:', filteredResults);
            setResults(filteredResults);
            setHighlightedIndex(null);
        } else {
            setResults([]);
            setHighlightedIndex(null);
        }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log('Key pressed:', e.key);
        if (results.length === 0) return;

        const allItems = results.flatMap(result => result.items);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            console.log('ArrowDown pressed');
            setHighlightedIndex(prev => (prev === null || prev === allItems.length - 1 ? 0 : prev + 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            console.log('ArrowUp pressed');
            setHighlightedIndex(prev => (prev === null || prev === 0 ? allItems.length - 1 : prev - 1));
        } else if (e.key === 'Enter' && highlightedIndex !== null) {
            e.preventDefault();
            console.log('Enter pressed');
            const selectedItem = allItems[highlightedIndex];
            console.log('Selected item:', selectedItem);
            setQuery(selectedItem.label);
            setResults([]);
        }
    };

    // Handle item click
    const handleItemClick = (item: { label: string; value: any }) => {
        console.log('Selected item:', item);
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

    // Render the component
    return (
        <div className="global-search" style={{ position: 'relative' }}>
            <div className="global-search-input-container">
                <input
                    type="text"
                    value={query}
                    onChange={handleSearch}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="global-search-input"
                />
                {query && (
                    <button className="clear-button" onClick={handleClear} aria-label="Clear search">
                        &times;
                    </button>
                )}
            </div>
            {results.length > 0 && (
                <div className="global-search-dropdown" ref={dropdownRef}>
                    {results.map((result, categoryIndex) => (
                        <div key={result.category} className="global-search-category">
                            <strong>{result.category}</strong>
                            <ul>
                                {result.items.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`global-search-item ${highlightedIndex === index ? 'highlighted' : ''}`}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
            {highlightedIndex !== null && (
                <div className="global-search-highlight">
                    {console.log('Global Index:', highlightedIndex, 'Highlighted Index:', highlightedIndex)}
                </div>
            )}
        </div>
    );
};

export default GlobalSearch; 