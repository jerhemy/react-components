import './SelectDemo.css';

import React, { useState } from 'react';

import CodeBlock from '../components/CodeBlock/CodeBlock';
import Select, { SelectOption } from '../components/Select/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' }
];

const groupedOptions = [
  {
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' }
    ]
  },
  {
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'cucumber', label: 'Cucumber' }
    ]
  }
];

const users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com' }
];

const products = [
  {
    id: '1',
    name: 'Smartphone X',
    price: 999,
    stock: 50,
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Wireless Headphones',
    price: 199,
    stock: 100,
    category: 'Audio'
  }
];

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
      <span className="product-price">${option.price}</span>
      <span className="product-stock">Stock: {option.stock}</span>
      <span className="product-category">{option.category}</span>
    </div>
  </div>
);

const ValueDisplay: React.FC<{ label: string; value: any }> = ({ label, value }) => {
  const formatValue = (val: any): string => {
    if (val === null || val === undefined) return 'null';

    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        return `[${val.map(formatValue).join(', ')}]`;
      }

      // Handle SelectOption objects
      if (val.data !== undefined) {
        return JSON.stringify(val.data, null, 2);
      }

      return JSON.stringify(val, null, 2);
    }

    return String(val);
  };

  return (
    <div className="value-display">
      <div className="value-label">{label}:</div>
      <pre className="value-content">{formatValue(value)}</pre>
    </div>
  );
};

// Add CSS for ValueDisplay
const valueDisplayStyles = `
.value-display {
  margin-top: 16px;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 4px;
  border: 1px solid #e9ecef;
}

.value-label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #495057;
}

.value-content {
  background-color: #fff;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #e9ecef;
  overflow: auto;
  max-height: 200px;
  margin: 0;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
  word-break: break-all;
}

.select-demo {
  max-width: 800px;
  margin: 0 auto;
}

.demo-variation {
  margin-bottom: 40px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
}

.demo-variation-header {
  padding: 16px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.demo-variation-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.demo-variation-description {
  margin: 0;
  color: #6c757d;
}

.demo-variation-preview {
  padding: 24px;
}

.demo-variation-code {
  border-top: 1px solid #e9ecef;
}
`;

/**
 * Demo page for the Select component
 */
const SelectDemo: React.FC = () => {
  const [basicValue, setBasicValue] = useState<any>(null);
  const [multiValue, setMultiValue] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<any>(null);
  const [groupedValue, setGroupedValue] = useState<any>(null);
  const [chipsValue, setChipsValue] = useState<any[]>([]);
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
            onChange={setBasicValue}
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
  const [value, setValue] = useState<any>(null);

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
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
            onChange={setMultiValue}
            placeholder="Choose multiple fruits"
            isMulti
          />
          <ValueDisplay label="Selected Values" value={multiValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
];

const MyComponent = () => {
  const [multiValue, setMultiValue] = useState<any[]>([]);

  return (
    <Select
      options={options}
      value={multiValue}
      onChange={setMultiValue}
      placeholder="Choose multiple fruits"
      isMulti
    />
  );
};`,
    },
    {
      title: 'Searchable Select',
      description: 'A select component with search functionality.',
      preview: (
        <>
          <Select
            options={options}
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search and select a fruit"
            isSearchable
          />
          <ValueDisplay label="Selected Value" value={searchValue} />
        </>
      ),
      code: `import { Select } from '@/components/Select/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'blueberry', label: 'Blueberry' },
  { value: 'kiwi', label: 'Kiwi' },
];

const MyComponent = () => {
  const [value, setValue] = useState<any>(null);

  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
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
            onChange={(value) => setGroupedValue(value)}
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
  const [value, setValue] = useState<string | null>(null);

  return (
    <Select
      options={groupedOptions}
      value={value}
      onChange={setValue}
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
            onChange={(value) => setChipsValue(value as SelectOption[])}
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
  const [value, setValue] = useState<SelectOption[]>([]);

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
            onChange={(value) => setCustomMappingValue(value as SelectOption)}
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
  const [value, setValue] = useState<SelectOption | null>(null);

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
            onChange={(value) => setCustomRenderingValue(value as SelectOption)}
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
  const [value, setValue] = useState<SelectOption | null>(null);

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
      <style>{valueDisplayStyles}</style>
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
          <div className="demo-variation-header">
            <h3 className="demo-variation-title">{variation.title}</h3>
            <p className="demo-variation-description">{variation.description}</p>
          </div>
          <div className="demo-variation-preview">
            {variation.preview}
          </div>
          <div className="demo-variation-code">
            <CodeBlock code={variation.code} language="tsx" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectDemo; 