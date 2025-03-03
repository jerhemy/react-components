import '../styles/SelectDemo.css';

import Select, { Option } from './Select';

import { useState } from 'react';

// SelectDemo component to showcase different variations of the Select component
const SelectDemo = () => {
    // Sample options for the select components
    const colorOptions: Option[] = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'purple', label: 'Purple' },
        { value: 'orange', label: 'Orange' },
        { value: 'pink', label: 'Pink' },
    ];

    // More complex options for demonstrating search functionality
    const countryOptions: Option[] = [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
        { value: 'au', label: 'Australia' },
        { value: 'de', label: 'Germany' },
        { value: 'fr', label: 'France' },
        { value: 'jp', label: 'Japan' },
        { value: 'cn', label: 'China' },
        { value: 'br', label: 'Brazil' },
        { value: 'in', label: 'India' },
    ];

    // State for the different select components
    const [singleValue, setSingleValue] = useState<Option | null>(null);
    const [multiValue, setMultiValue] = useState<Option[]>([]);
    const [searchableValue, setSearchableValue] = useState<Option | null>(null);
    const [nonClearableValue, setNonClearableValue] = useState<Option | null>(null);

    // Render the demo component
    return (
        <div className="select-demo">
            <h1>React Select Component Demo</h1>

            {/* Basic single-select example */}
            <div className="demo-section">
                <h2>Basic Select</h2>
                <p>A simple single-select dropdown.</p>
                <Select
                    options={colorOptions}
                    onChange={(option) => setSingleValue(option as Option)}
                    value={singleValue}
                    placeholder="Choose a color..."
                />
                <div className="value-display">
                    Selected value: {singleValue ? JSON.stringify(singleValue) : 'none'}
                </div>
            </div>

            {/* Multi-select example */}
            <div className="demo-section">
                <h2>Multi Select</h2>
                <p>Select multiple options with tags.</p>
                <Select
                    options={colorOptions}
                    isMulti={true}
                    onChange={(options) => setMultiValue(options as Option[])}
                    value={multiValue}
                    placeholder="Choose multiple colors..."
                />
                <div className="value-display">
                    Selected values: {multiValue.length > 0 ? JSON.stringify(multiValue) : 'none'}
                </div>
            </div>

            {/* Searchable select example */}
            <div className="demo-section">
                <h2>Searchable Select</h2>
                <p>Type to search through a larger list of options.</p>
                <Select
                    options={countryOptions}
                    onChange={(option) => setSearchableValue(option as Option)}
                    value={searchableValue}
                    isSearchable={true}
                    placeholder="Search for a country..."
                />
                <div className="value-display">
                    Selected value: {searchableValue ? JSON.stringify(searchableValue) : 'none'}
                </div>
            </div>

            {/* Non-clearable select example */}
            <div className="demo-section">
                <h2>Non-Clearable Select</h2>
                <p>A select without the clear button.</p>
                <Select
                    options={colorOptions}
                    onChange={(option) => setNonClearableValue(option as Option)}
                    value={nonClearableValue}
                    isClearable={false}
                    placeholder="Choose a color (can't clear)..."
                />
                <div className="value-display">
                    Selected value: {nonClearableValue ? JSON.stringify(nonClearableValue) : 'none'}
                </div>
            </div>
        </div>
    );
};

export default SelectDemo; 