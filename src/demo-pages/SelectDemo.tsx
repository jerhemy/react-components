import './SelectDemo.css';

import React, { useState } from 'react';

import CodeBlock from '../components/CodeBlock/CodeBlock';
import Select from '../components/Select/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'mango', label: 'Mango' },
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

// Sample data for custom mapping
const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', role: 'User' },
];

// Sample data for custom rendering
const products = [
  {
    id: 'p1',
    name: 'Laptop Pro',
    price: 999.99,
    stock: 12,
    category: 'Electronics'
  },
  {
    id: 'p2',
    name: 'Wireless Mouse',
    price: 29.99,
    stock: 45,
    category: 'Accessories'
  },
  {
    id: 'p3',
    name: 'HD Monitor',
    price: 299.99,
    stock: 8,
    category: 'Electronics'
  },
  {
    id: 'p4',
    name: 'Keyboard',
    price: 59.99,
    stock: 23,
    category: 'Accessories'
  },
];

// Custom renderer for products
interface ProductOptionProps {
  option: {
    name: string;
    price: number;
    stock: number;
    category: string;
  };
}

const ProductOption: React.FC<ProductOptionProps> = ({ option }) => (
  <div className="product-option">
    <div className="product-name">{option.name}</div>
    <div className="product-details">
      <span className="product-price">\${option.price}</span>
      <span className="product-stock">Stock: {option.stock}</span>
      <span className="product-category">{option.category}</span>
    </div>
  </div>
);

const ValueDisplay: React.FC<{ label: string; value: string | string[] | any | any[] }> = ({ label, value }) => {
  const formatValue = (val: any): string => {
    if (typeof val === 'object' && val !== null) {
      return JSON.stringify(val, null, 2);
    }
    return String(val);
  };

  const displayValue = Array.isArray(value)
    ? `[${value.map(formatValue).join(', ')}]`
    : formatValue(value);

  return (
    <div className="value-display">
      <span className="value-label">{label}:</span>
      <code className="value-code">
        {displayValue}
      </code>
    </div>
  );
};

/**
 * Demo page for the Select component
 */
const SelectDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState<string>('');
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [groupedValue, setGroupedValue] = useState<string>('');
  const [chipsValue, setChipsValue] = useState<string[]>([]);
  const [customMappingValue, setCustomMappingValue] = useState<any>(null);
  const [customRenderingValue, setCustomRenderingValue] = useState<any>(null);

  const variations = [
    {
      title: 'Basic Select',
      description: 'An enhanced select component with a modern look and improved user experience.',
      preview: (
        <>
          <Select
            options={options}
            value={basicValue}
            onChange={(value) => setBasicValue(value as string)}
            placeholder="Choose a fruit"
          />
          <ValueDisplay label="Selected Value" value={basicValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      options={options}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Choose a fruit"
    />
  );
};`,
    },
    {
      title: 'Multiple Selection',
      description: 'Select multiple options with checkboxes.',
      preview: (
        <>
          <Select
            options={options}
            value={multiValue}
            onChange={(value) => setMultiValue(value as string[])}
            placeholder="Choose multiple fruits"
            isMulti
          />
          <ValueDisplay label="Selected Values" value={multiValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const MyComponent = () => {
  const [multiValue, setMultiValue] = useState<string[]>([]);

  return (
    <Select
      options={options}
      value={multiValue}
      onChange={(value) => setMultiValue(value)}
      placeholder="Choose multiple fruits"
      isMulti
    />
  );
};`,
    },
    {
      title: 'Searchable Select',
      description: 'Search through options with built-in filtering.',
      preview: (
        <>
          <Select
            options={options}
            value={searchValue}
            onChange={(value) => setSearchValue(value as string)}
            placeholder="Search and select a fruit"
            isSearchable
          />
          <ValueDisplay label="Selected Value" value={searchValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      options={options}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Search and select a fruit"
      isSearchable
    />
  );
};`,
    },
    {
      title: 'Grouped Options',
      description: 'Options organized into groups for better organization.',
      preview: (
        <>
          <Select
            options={groupedOptions}
            value={groupedValue}
            onChange={(value) => setGroupedValue(value as string)}
            placeholder="Choose an item"
            isSearchable
          />
          <ValueDisplay label="Selected Value" value={groupedValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
    ],
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
];

const MyComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Select
      options={groupedOptions}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Choose an item"
      isSearchable
    />
  );
};`,
    },
    {
      title: 'Multiple Selection with Chips',
      description: 'Select multiple options with a modern chips interface for better visibility and interaction.',
      preview: (
        <>
          <Select
            options={options}
            value={chipsValue}
            onChange={(value) => setChipsValue(value as string[])}
            placeholder="Choose multiple fruits"
            isMulti
            useChips
            isSearchable
          />
          <ValueDisplay label="Selected Values" value={chipsValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const MyComponent = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Select
      options={options}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Choose multiple fruits"
      isMulti
      useChips
      isSearchable
    />
  );
};`,
    },
    {
      title: 'Custom Property Mapping',
      description: 'Use custom properties from data objects for value and label.',
      preview: (
        <>
          <Select
            options={users}
            value={customMappingValue}
            onChange={(value) => setCustomMappingValue(value)}
            placeholder="Select a user"
            valueKey="id"
            labelKey="name"
            isSearchable
          />
          <ValueDisplay label="Selected Value" value={customMappingValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      options={users}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Select a user"
      valueKey="id"
      labelKey="name"
      isSearchable
    />
  );
};`,
    },
    {
      title: 'Custom Option Rendering',
      description: 'Customize how options are displayed in the dropdown using a render function.',
      preview: (
        <>
          <Select
            options={products}
            value={customRenderingValue}
            onChange={(value) => setCustomRenderingValue(value)}
            placeholder="Select a product"
            valueKey="id"
            labelKey="name"
            isSearchable
            renderOption={(option) => <ProductOption option={option} />}
          />
          <ValueDisplay label="Selected Value" value={customRenderingValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

interface ProductOptionProps {
  option: {
    name: string;
    price: number;
    stock: number;
    category: string;
  };
}

const ProductOption: React.FC<ProductOptionProps> = ({ option }) => (
  <div className="product-option">
    <div className="product-name">{option.name}</div>
    <div className="product-details">
      <span className="product-price">\${option.price}</span>
      <span className="product-stock">Stock: {option.stock}</span>
      <span className="product-category">{option.category}</span>
    </div>
  </div>
);

const products = [
  { 
    id: 'p1', 
    name: 'Laptop Pro', 
    price: 999.99,
    stock: 12,
    category: 'Electronics'
  },
  // ... more products
];

const MyComponent = () => {
  const [value, setValue] = useState(null);

  return (
    <Select
      options={products}
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Select a product"
      valueKey="id"
      labelKey="name"
      isSearchable
      renderOption={(option) => <ProductOption option={option} />}
    />
  );
};`,
    },
  ];

  return (
    <div className="select-demo">
      <h2>Select Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The Select component is an enhanced select component that provides advanced features
          like search, multi-select, grouped options, custom rendering, and more. It offers a modern user interface
          with improved interaction patterns.
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
            <CodeBlock code={variation.code} language="typescript" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <CodeBlock
          code={`/* Select Component CSS */
.select-container {
  position: relative;
  width: 100%;
}

.select-container.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.select-input {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  padding: 8px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  cursor: pointer;
  transition: all 0.2s;
  min-height: 40px;
}

.select-input:hover:not(.disabled) {
  border-color: var(--primary-color);
}

.select-input.open {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-shadow);
}

.select-value {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--text-color);
}

.select-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.with-chips .select-input {
  min-height: 40px;
  height: auto;
  padding: 4px 8px;
}

.with-chips .select-search {
  min-width: 60px;
  width: auto;
  flex: 0 1 auto;
  margin: 2px;
}

.select-search {
  border: none;
  outline: none;
  background: transparent;
  color: var(--text-color);
  font-size: inherit;
  font-family: inherit;
  min-width: 0;
  padding: 2px;
}

.select-arrow {
  margin-left: 8px;
  color: var(--text-color);
  transition: transform 0.2s;
  flex-shrink: 0;
}

.select-input.open .select-arrow {
  transform: rotate(180deg);
}

.select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  max-height: 250px;
  overflow-y: auto;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.select-group {
  padding: 0;
}

.select-group-label {
  padding: 8px 12px;
  font-weight: 500;
  color: var(--text-color);
  background: var(--hover-color);
  border-bottom: 1px solid var(--border-color);
}

.select-option {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-color);
}

.select-option:hover {
  background: var(--hover-color);
}

.select-option.selected {
  background: var(--selected-color);
  color: var(--primary-color);
}

.select-checkbox {
  margin: 0;
}

.select-message {
  padding: 12px;
  text-align: center;
  color: var(--text-color);
}

.select-message.error {
  color: var(--error-color);
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default SelectDemo; 