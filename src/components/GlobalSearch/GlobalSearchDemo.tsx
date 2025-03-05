import './GlobalSearchDemo.css';

import React, { useState } from 'react';

import CodeBlock from '../CodeBlock/CodeBlock';
import GlobalSearch from './GlobalSearch';

interface Person {
  name: string;
  age: number;
  joinDate: string;
  department: string;
  email?: string;
  skills?: string[];
  location?: string;
  avatar?: string;
}

type DisplayMode = 'grouped' | 'flat';

const GlobalSearchDemo: React.FC = () => {
  // Sample data for the demo
  const [people] = useState<Person[]>([
    // Original entries
    { name: 'John Doe', age: 30, joinDate: '2021-01-15', department: 'Engineering', email: 'john.doe@example.com', skills: ['JavaScript', 'React', 'Node.js'], location: 'New York' },
    { name: 'Jane Smith', age: 25, joinDate: '2020-06-23', department: 'Marketing', email: 'jane.smith@example.com', skills: ['Content Writing', 'SEO', 'Social Media'], location: 'San Francisco' },
    { name: 'Alice Johnson', age: 35, joinDate: '2019-11-02', department: 'Sales', email: 'alice.johnson@example.com', skills: ['Negotiation', 'CRM', 'Presentation'], location: 'Chicago' },
    { name: 'Bob Brown', age: 28, joinDate: '2022-03-14', department: 'Engineering', email: 'bob.brown@example.com', skills: ['Python', 'Django', 'AWS'], location: 'Seattle' },
    { name: 'Charlie Black', age: 40, joinDate: '2018-07-19', department: 'HR', email: 'charlie.black@example.com', skills: ['Recruitment', 'Training', 'Conflict Resolution'], location: 'Boston' },
    { name: 'Diana White', age: 32, joinDate: '2020-09-05', department: 'Marketing', email: 'diana.white@example.com', skills: ['Graphic Design', 'Branding', 'Analytics'], location: 'Los Angeles' },
    { name: 'Edward Green', age: 45, joinDate: '2017-04-30', department: 'Finance', email: 'edward.green@example.com', skills: ['Accounting', 'Budgeting', 'Financial Analysis'], location: 'Miami' },
    { name: 'Fiona Blue', age: 29, joinDate: '2021-08-12', department: 'Engineering', email: 'fiona.blue@example.com', skills: ['Java', 'Spring', 'Microservices'], location: 'Austin' },
    { name: 'George Gray', age: 38, joinDate: '2019-02-28', department: 'Sales', email: 'george.gray@example.com', skills: ['B2B Sales', 'Account Management', 'Lead Generation'], location: 'Denver' },
    { name: 'Hannah Red', age: 27, joinDate: '2022-01-10', department: 'Design', email: 'hannah.red@example.com', skills: ['UI/UX', 'Figma', 'Prototyping'], location: 'Portland' },

    // Duplicate names in different departments
    { name: 'John Doe', age: 42, joinDate: '2019-03-20', department: 'Sales', email: 'john.doe.sales@example.com', skills: ['Sales Strategy', 'Client Relations', 'Market Analysis'], location: 'Houston' },
    { name: 'John Doe', age: 35, joinDate: '2020-11-15', department: 'Marketing', email: 'john.doe.marketing@example.com', skills: ['Digital Marketing', 'Content Strategy', 'Analytics'], location: 'Chicago' },
    { name: 'Jane Smith', age: 31, joinDate: '2018-08-01', department: 'HR', email: 'jane.smith.hr@example.com', skills: ['Employee Relations', 'Talent Acquisition', 'Training'], location: 'Boston' },
    { name: 'Jane Smith', age: 28, joinDate: '2021-04-12', department: 'Finance', email: 'jane.smith.finance@example.com', skills: ['Financial Planning', 'Risk Analysis', 'Reporting'], location: 'New York' },
    { name: 'Alice Johnson', age: 33, joinDate: '2020-02-15', department: 'Engineering', email: 'alice.johnson.eng@example.com', skills: ['Full Stack', 'Cloud Architecture', 'DevOps'], location: 'Seattle' },
    { name: 'Bob Brown', age: 39, joinDate: '2017-09-30', department: 'Marketing', email: 'bob.brown.marketing@example.com', skills: ['Brand Strategy', 'Market Research', 'Campaign Management'], location: 'Los Angeles' },
    { name: 'Charlie Black', age: 36, joinDate: '2019-06-25', department: 'Engineering', email: 'charlie.black.eng@example.com', skills: ['Mobile Development', 'UI Architecture', 'Testing'], location: 'San Francisco' },
    { name: 'Diana White', age: 29, joinDate: '2021-07-08', department: 'Sales', email: 'diana.white.sales@example.com', skills: ['Account Management', 'Sales Operations', 'Business Development'], location: 'Miami' },
    { name: 'Edward Green', age: 41, joinDate: '2018-12-03', department: 'Design', email: 'edward.green.design@example.com', skills: ['Product Design', 'Design Systems', 'User Research'], location: 'Portland' },
    { name: 'Fiona Blue', age: 34, joinDate: '2020-05-18', department: 'HR', email: 'fiona.blue.hr@example.com', skills: ['HR Operations', 'Performance Management', 'Employee Engagement'], location: 'Denver' }
  ]);

  // State for search property and category property
  const [searchProperty, setSearchProperty] = useState<keyof Person>('name');
  const [categoryProperty, setCategoryProperty] = useState<keyof Person>('department');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('grouped');

  // Available properties for search and categorization
  const availableProperties: Array<{ label: string; value: keyof Person }> = [
    { label: 'Name', value: 'name' },
    { label: 'Department', value: 'department' },
    { label: 'Email', value: 'email' },
    { label: 'Location', value: 'location' }
  ];

  // Handle search property change
  const handleSearchPropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchProperty(e.target.value as keyof Person);
  };

  // Handle category property change
  const handleCategoryPropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryProperty(e.target.value as keyof Person);
  };

  // Handle display mode change
  const handleDisplayModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayMode(e.target.value as DisplayMode);
  };

  // Basic example data
  const basicData = [
    { name: 'John Doe', department: 'Engineering' },
    { name: 'Jane Smith', department: 'Marketing' },
    { name: 'Alice Johnson', department: 'Sales' }
  ];

  // Example with custom icon
  const searchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );

  // Example with custom item rendering
  const customItemRenderFunctions = {
    renderItem: (item: { label: string; value: Person }) => (
      <div className="item-content">
        <div className="item-title">{item.label}</div>
        <div className="item-subtitle">{item.value.email}</div>
      </div>
    )
  };

  // Example with custom category rendering
  const customCategoryRenderFunctions = {
    renderCategory: (category: string) => (
      <div className="custom-category">
        <span className="category-icon">📁</span>
        <strong>{category}</strong>
      </div>
    )
  };

  // Example with all custom rendering
  const fullCustomRenderFunctions = {
    renderIcon: () => searchIcon,
    renderItem: (item: { label: string; value: Person }) => (
      <div className="item-content">
        <div className="item-title">{item.label}</div>
        <div className="item-subtitle">{item.value.email}</div>
      </div>
    ),
    renderCategory: (category: string) => (
      <div className="custom-category">
        <span className="category-icon">📁</span>
        <strong>{category}</strong>
      </div>
    )
  };

  // Code examples for each variation
  const variations = [
    {
      title: 'Basic Search',
      description: 'A simple search component with default rendering.',
      component: (
        <GlobalSearch
          data={basicData}
          searchProperty="name"
          categoryProperty="department"
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const data = [
  { name: 'John Doe', department: 'Engineering' },
  { name: 'Jane Smith', department: 'Marketing' },
  { name: 'Alice Johnson', department: 'Sales' }
];

const BasicSearch = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
  />
);`
    },
    {
      title: 'Search with Custom Icon',
      description: 'Search component with a custom search icon.',
      component: (
        <GlobalSearch
          data={basicData}
          searchProperty="name"
          categoryProperty="department"
          renderFunctions={{ renderIcon: () => searchIcon }}
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const SearchWithIcon = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
    renderFunctions={{ renderIcon: () => <SearchIcon /> }}
  />
);`
    },
    {
      title: 'Search with Custom Item Rendering',
      description: 'Search component with custom item rendering showing additional information.',
      component: (
        <GlobalSearch
          data={people}
          searchProperty="name"
          categoryProperty="department"
          renderFunctions={customItemRenderFunctions}
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const renderFunctions = {
  renderItem: (item) => (
    <div className="item-content">
      <div className="item-title">{item.label}</div>
      <div className="item-subtitle">{item.value.email}</div>
    </div>
  )
};

const SearchWithCustomItems = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
    renderFunctions={renderFunctions}
  />
);`
    },
    {
      title: 'Search with Custom Category Rendering',
      description: 'Search component with custom category headers.',
      component: (
        <GlobalSearch
          data={people}
          searchProperty="name"
          categoryProperty="department"
          renderFunctions={customCategoryRenderFunctions}
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const renderFunctions = {
  renderCategory: (category) => (
    <div className="custom-category">
      <span className="category-icon">📁</span>
      <strong>{category}</strong>
    </div>
  )
};

const SearchWithCustomCategories = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
    renderFunctions={renderFunctions}
  />
);`
    },
    {
      title: 'Flat Mode Search',
      description: 'Search component with flat display mode showing category prefixes.',
      component: (
        <GlobalSearch
          data={people}
          searchProperty="name"
          categoryProperty="department"
          displayMode="flat"
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const FlatModeSearch = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
    displayMode="flat"
  />
);`
    },
    {
      title: 'Fully Customized Search',
      description: 'Search component with all custom rendering options enabled.',
      component: (
        <GlobalSearch
          data={people}
          searchProperty="name"
          categoryProperty="department"
          renderFunctions={fullCustomRenderFunctions}
          placeholder="Search users..."
        />
      ),
      code: `import GlobalSearch from './GlobalSearch';

const renderFunctions = {
  renderIcon: () => (
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  renderItem: (item) => (
    <div className="item-content">
      <div className="item-title">{item.label}</div>
      <div className="item-subtitle">{item.value.email}</div>
    </div>
  ),
  renderCategory: (category) => (
    <div className="custom-category">
      <span className="category-icon">📁</span>
      <strong>{category}</strong>
    </div>
  )
};

const FullyCustomizedSearch = () => (
  <GlobalSearch
    data={data}
    searchProperty="name"
    categoryProperty="department"
    renderFunctions={renderFunctions}
    placeholder="Search users..."
  />
);`
    }
  ];

  return (
    <div className="global-search-demo">
      <h2>Global Search Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The GlobalSearch component provides a flexible search interface with support for
          categorization, custom rendering, and different display modes. Below are various
          examples showing different ways to use and customize the component.
        </p>
      </div>

      {variations.map((variation, index) => (
        <div key={index} className="demo-variation">
          <h3>{variation.title}</h3>
          <p>{variation.description}</p>

          <div className="demo-preview">
            <h4>Live Preview</h4>
            <div className="preview-container">
              {variation.component}
            </div>
          </div>

          <div className="demo-code">
            <h4>Code Example</h4>
            <CodeBlock code={variation.code} language="typescript" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <p>
          To use the custom rendering features, include these CSS styles in your project:
        </p>
        <CodeBlock
          code={`/* Custom rendering styles */
.item-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-title {
  font-weight: 500;
  color: var(--text-color);
}

.item-subtitle {
  font-size: 0.75rem;
  color: var(--secondary-text);
}

.custom-category {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  font-size: 0.875rem;
  color: var(--secondary-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-icon {
  font-size: 1rem;
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default GlobalSearchDemo; 