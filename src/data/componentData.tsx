import DataGridDemo from '../components/DataGridDemo';
import FieldsetDemo from '../components/FieldsetDemo';
import FormGroupDemo from '../pages/FormGroupDemo';
import GlobalSearchDemo from '../components/GlobalSearchDemo';
import JsonTreeViewerDemo from '../components/JsonTreeViewerDemo';
import ModalDemo from '../components/ModalDemo';
import React from 'react';
import RouteTrackerDemo from '../components/RouteTrackerDemo';
import RouteProgressDemo from '../pages/RouteProgressDemo';
import SchedulerDemo from '../components/SchedulerDemo';
import SelectDemo from '../components/SelectDemo';

// Component categories for sidebar navigation
export const componentCategories = {
  gettingStarted: {
    title: 'Getting Started',
    items: [
      { id: '', label: 'Get Started' }
    ]
  },
  form: {
    title: 'Form Components',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'button', label: 'Button' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'select', label: 'Select' },
      { id: 'radio', label: 'Radio Button' },
      { id: 'icon', label: 'Icon' },
      { id: 'formGroup', label: 'Form Group' }
    ]
  },
  data: {
    title: 'Data Components',
    items: [
      { id: 'dataGrid', label: 'Data Grid' },
      { id: 'jsonViewer', label: 'JSON Viewer' },
      { id: 'table', label: 'Table' },
    ]
  },
  layout: {
    title: 'Layout Components',
    items: [
      { id: 'card', label: 'Card' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'modal', label: 'Modal' },
      { id: 'fieldset', label: 'Fieldset' },
    ]
  },
  navigation: {
    title: 'Navigation Components',
    items: [
      { id: 'menu', label: 'Menu' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'routeTracker', label: 'Route Tracker' },
      { id: 'routeProgress', label: 'Route Progress' },
    ]
  },
  misc: {
    title: 'Miscellaneous',
    items: [
      { id: 'scheduler', label: 'Scheduler' },
      { id: 'globalSearch', label: 'Global Search' },
    ]
  }
};

interface ApiProperty {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description: string;
}

interface ComponentData {
  name: string;
  description: string;
  codeExample: string;
  api: ApiProperty[];
  features: string[];
  availableIcons?: {
    [key: string]: Array<{
      name: string;
      description: string;
    }>;
  };
  usageExamples?: Array<{
    title: string;
    description: string;
    code: string;
  }>;
}

// Component data with examples, code, and API documentation
export const componentData: Record<string, ComponentData> = {
  input: {
    name: 'Input',
    description: 'Basic input component for text entry.',
    codeExample: `import { Input } from 'your-component-library/Input';

function MyComponent() {
  return (
    <Input 
      placeholder="Enter text..." 
      onChange={(e) => console.log(e.target.value)}
    />
  );
}`,
    api: [
      { name: 'value', type: 'string', description: 'Current value of the input' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback when value changes' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the input is disabled' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  button: {
    name: 'Button',
    description: 'Interactive button component with multiple variants.',
    codeExample: `import { Button } from 'your-component-library/Button';

function MyComponent() {
  return (
    <>
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </>
  );
}`,
    api: [
      { name: 'children', type: 'ReactNode', description: 'Button content' },
      { name: 'variant', type: "'primary' | 'secondary' | 'outline'", default: "'primary'", description: 'Button style variant' },
      { name: 'onClick', type: '(e: MouseEvent) => void', description: 'Click handler' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is disabled' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  jsonViewer: {
    name: 'JSON Viewer',
    description: 'Interactive component for visualizing and exploring JSON data with expandable/collapsible nodes.',
    codeExample: `import { JsonTreeViewer } from 'your-component-library/JsonTreeViewer';

const data = {
  name: "Product",
  price: 99.99,
  features: ["Fast", "Reliable", "Eco-friendly"],
  specs: {
    weight: "2.5kg",
    dimensions: {
      width: 30,
      height: 20,
      depth: 10
    }
  }
};

function MyComponent() {
  return (
    <JsonTreeViewer 
      data={data} 
      initialExpandedDepth={2}
    />
  );
}`,
    api: [
      { name: 'data', type: 'object | array', description: 'The JSON data to display' },
      { name: 'initialExpandedDepth', type: 'number', default: '1', description: 'How many levels to expand initially' },
      { name: 'theme', type: "'light' | 'dark'", default: "'light'", description: 'Color theme for the viewer' },
      { name: 'highlightChanges', type: 'boolean', default: 'true', description: 'Whether to highlight property changes with animation' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  dataGrid: {
    name: 'Data Grid',
    description: 'Powerful data grid component for displaying and manipulating tabular data with sorting, filtering, and pagination.',
    codeExample: `import { DataGrid } from 'your-component-library/DataGrid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'email', headerName: 'Email', width: 250 },
];

const rows = [
  { id: 1, name: 'John Doe', age: 35, email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', age: 28, email: 'jane@example.com' },
  { id: 3, name: 'Bob Johnson', age: 42, email: 'bob@example.com' },
];

function MyComponent() {
  return (
    <DataGrid 
      columns={columns} 
      rows={rows} 
      pageSize={5}
      checkboxSelection
    />
  );
}`,
    api: [
      { name: 'columns', type: 'array', description: 'Column definitions for the grid' },
      { name: 'rows', type: 'array', description: 'Data rows to display in the grid' },
      { name: 'pageSize', type: 'number', default: '10', description: 'Number of rows per page' },
      { name: 'checkboxSelection', type: 'boolean', default: 'false', description: 'Enable row selection with checkboxes' },
      { name: 'onRowClick', type: '(params: RowParams) => void', description: 'Callback fired when a row is clicked' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  routeTracker: {
    name: 'Route Tracker',
    description: 'Component for tracking and visualizing navigation routes in a React application.',
    codeExample: `import { RouteTracker } from 'your-component-library/RouteTracker';

function MyComponent() {
  return (
    <RouteTracker 
      showTimestamps={true}
      maxEntries={10}
    />
  );
}`,
    api: [
      { name: 'showTimestamps', type: 'boolean', default: 'true', description: 'Show timestamps for each route change' },
      { name: 'maxEntries', type: 'number', default: '20', description: 'Maximum number of route entries to display' },
      { name: 'onRouteChange', type: '(route: string) => void', description: 'Callback fired when route changes' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  globalSearch: {
    name: 'Global Search',
    description: 'Powerful search component that can be integrated across your application for unified search functionality.',
    codeExample: `import { GlobalSearch } from 'your-component-library/GlobalSearch';

function MyComponent() {
  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  return (
    <GlobalSearch 
      placeholder="Search anything..."
      onSearch={handleSearch}
      searchSources={['docs', 'users', 'products']}
    />
  );
}`,
    api: [
      { name: 'placeholder', type: 'string', default: "'Search...'", description: 'Placeholder text for the search input' },
      { name: 'onSearch', type: '(query: string) => void', description: 'Callback fired when search is executed' },
      { name: 'searchSources', type: 'string[]', description: 'List of sources to search through' },
      { name: 'debounceTime', type: 'number', default: '300', description: 'Debounce time in milliseconds' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  scheduler: {
    name: 'Scheduler',
    description: 'Calendar and scheduling component for managing events, appointments, and time-based data with adjustable time intervals.',
    codeExample: `import { Scheduler } from 'your-component-library/Scheduler';

const events = [
  { id: 1, title: 'Meeting with Client', start: '2023-06-15T10:00:00', end: '2023-06-15T11:30:00' },
  { id: 2, title: 'Team Lunch', start: '2023-06-15T12:30:00', end: '2023-06-15T13:30:00' },
  { id: 3, title: 'Project Review', start: '2023-06-16T14:00:00', end: '2023-06-16T15:00:00' },
];

function MyComponent() {
  const handleEventClick = (event) => {
    console.log('Event clicked:', event);
  };

  return (
    <Scheduler 
      events={events}
      onEventClick={handleEventClick}
      view="week"
      timeDisplayInterval={60} // Show time labels every hour
      timeslotInterval={15} // Use 15-minute time slots
    />
  );
}`,
    api: [
      { name: 'events', type: 'array', description: 'Array of events to display on the scheduler' },
      { name: 'view', type: "'day' | 'week' | 'month'", default: "'week'", description: 'Current view of the scheduler' },
      { name: 'timeDisplayInterval', type: 'number', default: '60', description: 'Interval in minutes for displaying time labels (1-120)' },
      { name: 'timeslotInterval', type: 'number', default: '30', description: 'Interval in minutes for time slots in the grid (1-60)' },
      { name: 'onEventClick', type: '(event: Event) => void', description: 'Callback fired when an event is clicked' },
      { name: 'onEventCreate', type: '(event: Event) => void', description: 'Callback fired when a new event is created' },
      { name: 'editable', type: 'boolean', default: 'true', description: 'Whether events can be edited' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  select: {
    name: 'Select',
    description: 'Dropdown select component with support for single and multiple selection, filtering, and custom rendering.',
    codeExample: `import React, { useState } from 'react';
import { Select } from 'your-component-library/Select';

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' },
];

function MyComponent() {
  const [value, setValue] = useState('apple');
  
  return (
    <Select 
      options={options}
      value={value}
      onChange={(newValue) => setValue(newValue)}
      placeholder="Select a fruit"
    />
  );
}`,
    api: [
      { name: 'options', type: 'array', description: 'Array of options to display in the dropdown' },
      { name: 'value', type: 'string | string[]', description: 'Current selected value(s)' },
      { name: 'onChange', type: '(value: string | string[]) => void', description: 'Callback fired when selection changes' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text when no option is selected' },
      { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
      { name: 'searchable', type: 'boolean', default: 'false', description: 'Allow filtering options by typing' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  fieldset: {
    name: 'Fieldset',
    description: 'Fieldset is used to group content in a form.',
    codeExample: `import React, { useState } from 'react';
import { Fieldset } from 'your-component-library/Fieldset';

function FieldsetExample() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleFieldset = (e) => {
    setCollapsed(e.value);
  };

  return (
    <div>
      <h3>Basic</h3>
      <Fieldset legend="Header">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Fieldset>

      <h3>Toggleable</h3>
      <Fieldset legend="Header" toggleable>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Fieldset>

      <h3>Controlled</h3>
      <div>
        <button onClick={() => setCollapsed(prev => !prev)}>
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      <Fieldset 
        legend="Header" 
        toggleable 
        collapsed={collapsed} 
        onToggle={toggleFieldset}
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </Fieldset>
    </div>
  );
}`,
    api: [
      { name: 'legend', type: 'ReactNode', description: 'Header text of the fieldset' },
      { name: 'children', type: 'ReactNode', description: 'Content of the fieldset' },
      { name: 'toggleable', type: 'boolean', default: 'false', description: 'When specified, content can be toggled by clicking the legend' },
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Defines the default visibility state of the content' },
      { name: 'onToggle', type: 'function', description: 'Callback to invoke when a tab gets toggled' },
      { name: 'className', type: 'string', description: 'Style class of the fieldset' },
      { name: 'style', type: 'object', description: 'Inline style of the fieldset' },
      { name: 'legendClassName', type: 'string', description: 'Style class of the legend' },
      { name: 'contentClassName', type: 'string', description: 'Style class of the content' },
      { name: 'toggleButtonProps', type: 'object', description: 'Additional props for the toggle button' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  modal: {
    name: 'Modal',
    description: 'A modal component that displays content in a layer that sits on top of the main page content.',
    codeExample: `import React, { useState } from 'react';
import { Modal } from 'your-component-library/Modal';

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
        headerColor="#3174ad"
        footer={
          <button 
            onClick={() => setIsOpen(false)}
            className="modal-btn modal-primary-btn"
          >
            Close
          </button>
        }
      >
        <p>This is the content of the modal.</p>
        <p>You can put any content here including forms, images, or other components.</p>
      </Modal>
    </div>
  );
}`,
    api: [
      { name: 'isOpen', type: 'boolean', description: 'Controls whether the modal is displayed' },
      { name: 'onClose', type: '() => void', description: 'Callback function called when the modal is closed' },
      { name: 'title', type: 'string', description: 'The title displayed in the modal header' },
      { name: 'headerColor', type: 'string', default: '#3174ad', description: 'Background color of the modal header' },
      { name: 'children', type: 'ReactNode', description: 'Content to be displayed in the modal body' },
      { name: 'footer', type: 'ReactNode', default: 'undefined', description: 'Optional content for the modal footer' }
    ],
    features: [],
    availableIcons: undefined,
    usageExamples: undefined
  },
  icon: {
    name: 'Icon',
    description: 'A flexible and customizable icon component that uses SVG paths for crisp rendering at any size. Supports various predefined sizes, custom colors, and accessibility features.',
    codeExample: `import { Icon } from './components/icons';

// Basic usage
<Icon name="search" />

// With custom size and color
<Icon 
  name="search"
  size="lg"
  color="#007bff"
/>

// With accessibility
<Icon
  name="warning"
  size="xl"
  color="#ffc107"
  title="Warning icon"
  description="Indicates a warning message"
/>`,
    api: [
      {
        name: 'name',
        type: 'IconName',
        required: true,
        description: 'Name of the icon from the IconLibrary. See available icons below.',
      },
      {
        name: 'size',
        type: 'IconSize',
        required: false,
        default: 'md',
        description: 'Size of the icon. Can be one of: "xs" (16px), "sm" (20px), "md" (24px), "lg" (32px), "xl" (40px), or a custom number in pixels.',
      },
      {
        name: 'color',
        type: 'string',
        required: false,
        default: 'currentColor',
        description: 'Color of the icon. Can be any valid CSS color value.',
      },
      {
        name: 'title',
        type: 'string',
        required: false,
        description: 'Title for accessibility. If provided, the icon will be treated as an image with the given title.',
      },
      {
        name: 'description',
        type: 'string',
        required: false,
        description: 'Description for accessibility. Provides additional context for screen readers.',
      },
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes to apply to the icon.',
      },
      {
        name: 'style',
        type: 'React.CSSProperties',
        required: false,
        description: 'Additional inline styles to apply to the icon.',
      },
    ],
    features: [
      'SVG-based icons for crisp rendering at any size',
      'Predefined sizes (xs, sm, md, lg, xl) or custom pixel values',
      'Customizable colors and styles',
      'Built-in accessibility support',
      'TypeScript support with autocompletion',
      'Extensible icon library',
    ],
    availableIcons: {
      navigation: [
        { name: 'chevronLeft', description: 'Left-pointing chevron' },
        { name: 'chevronRight', description: 'Right-pointing chevron' },
        { name: 'chevronUp', description: 'Upward-pointing chevron' },
        { name: 'chevronDown', description: 'Downward-pointing chevron' },
      ],
      actions: [
        { name: 'add', description: 'Plus sign for adding items' },
        { name: 'remove', description: 'Minus sign for removing items' },
        { name: 'edit', description: 'Pencil icon for editing' },
        { name: 'delete', description: 'Trash can icon for deletion' },
      ],
      uiControls: [
        { name: 'close', description: 'X mark for closing' },
        { name: 'menu', description: 'Hamburger menu icon' },
        { name: 'search', description: 'Magnifying glass for search' },
      ],
      status: [
        { name: 'success', description: 'Checkmark for success states' },
        { name: 'warning', description: 'Triangle with exclamation for warnings' },
        { name: 'error', description: 'Circle with X for errors' },
        { name: 'info', description: 'Circle with i for information' },
      ],
      commonUI: [
        { name: 'calendar', description: 'Calendar icon' },
        { name: 'clock', description: 'Clock or time icon' },
        { name: 'location', description: 'Location pin icon' },
      ],
      social: [
        { name: 'email', description: 'Envelope for email' },
        { name: 'phone', description: 'Telephone handset' },
        { name: 'share', description: 'Share or forward icon' },
      ],
      fileOperations: [
        { name: 'file', description: 'Generic file icon' },
        { name: 'folder', description: 'Folder icon' },
        { name: 'download', description: 'Download arrow icon' },
        { name: 'upload', description: 'Upload arrow icon' },
      ],
      mediaControls: [
        { name: 'play', description: 'Play button icon' },
        { name: 'pause', description: 'Pause button icon' },
        { name: 'stop', description: 'Stop button icon' },
        { name: 'volume', description: 'Volume/speaker icon' },
      ],
      userInterface: [
        { name: 'user', description: 'User profile icon' },
        { name: 'settings', description: 'Settings gear icon' },
        { name: 'filter', description: 'Filter/funnel icon' },
      ],
      communication: [
        { name: 'chat', description: 'Chat bubble icon' },
        { name: 'notification', description: 'Bell notification icon' },
      ],
      development: [
        { name: 'code', description: 'Code brackets icon' },
        { name: 'terminal', description: 'Terminal window icon' },
        { name: 'bug', description: 'Bug/insect icon' },
      ],
      business: [
        { name: 'chart', description: 'Bar chart icon' },
        { name: 'analytics', description: 'Analytics graph icon' },
        { name: 'wallet', description: 'Wallet/payment icon' },
      ],
      weather: [
        { name: 'sun', description: 'Sun icon' },
        { name: 'moon', description: 'Moon icon' },
        { name: 'cloud', description: 'Cloud icon' },
      ],
      socialMedia: [
        { name: 'facebook', description: 'Facebook logo icon' },
        { name: 'twitter', description: 'Twitter logo icon' },
        { name: 'instagram', description: 'Instagram logo icon' },
        { name: 'linkedin', description: 'LinkedIn logo icon' },
        { name: 'github', description: 'GitHub logo icon' },
      ],
    },
    usageExamples: [
      {
        title: 'Basic Navigation',
        description: 'Using icons in navigation elements',
        code: `<button>
  <Icon name="chevronLeft" size="sm" />
  Previous
</button>`,
      },
      {
        title: 'Status Indicators',
        description: 'Using icons to show status',
        code: `<div>
  <Icon name="success" color="#4CAF50" />
  <span>Operation completed successfully</span>
</div>`,
      },
      {
        title: 'Accessible Icons',
        description: 'Making icons accessible to screen readers',
        code: `<Icon
  name="warning"
  size="lg"
  color="#FFA000"
  title="Warning"
  description="This action cannot be undone"
/>`,
      },
      {
        title: 'Custom Styling',
        description: 'Applying custom styles to icons',
        code: `<Icon
  name="search"
  size={28}
  color="#2196F3"
  className="search-icon"
  style={{ marginRight: '8px' }}
/>`,
      },
    ],
  },
  table: {
    name: 'Table',
    description: 'A modern, feature-rich table component with sorting, pagination, and responsive design. Supports custom cell rendering with React components, loading states, and automatic theme adaptation with proper contrast.',
    codeExample: `import React from 'react';
import Table, { Column } from './components/Table';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  actions?: React.ReactNode;
}

// Custom component for the status badge with theme-aware colors
const StatusBadge: React.FC<{ status: 'active' | 'inactive' }> = ({ status }) => (
  <span style={{
    padding: '0.25rem 0.5rem',
    borderRadius: '9999px',
    backgroundColor: status === 'active' ? 'var(--success-bg, #C6F6D5)' : 'var(--error-bg, #FED7D7)',
    color: status === 'active' ? 'var(--success-text, #22543D)' : 'var(--error-text, #822727)'
  }}>
    {status}
  </span>
);

// Custom component for action buttons with theme-aware styling
const ActionButtons: React.FC<{ user: User }> = ({ user }) => (
  <div className="action-buttons">
    <button className="btn btn-secondary">Edit</button>
    <button className="btn btn-danger">Delete</button>
  </div>
);

const columns: Column<User>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (value) => <StatusBadge status={value} />
  },
  {
    key: 'actions',
    header: 'Actions',
    render: (_, row) => <ActionButtons user={row} />
  }
];

function MyComponent() {
  return (
    <Table
      data={users}
      columns={columns}
      pageSize={10}
      onRowClick={(row) => console.log(row)}
      hoverable
      striped
      theme="auto" // Will follow system preference
      className="custom-table" // For custom theme overrides
    />
  );
}`,
    api: [
      {
        name: 'data',
        type: 'T[]',
        required: true,
        description: 'Array of data items to display in the table'
      },
      {
        name: 'columns',
        type: 'Column<T>[]',
        required: true,
        description: 'Array of column definitions specifying how to display the data'
      },
      {
        name: 'pageSize',
        type: 'number',
        default: '10',
        description: 'Number of rows to display per page'
      },
      {
        name: 'onRowClick',
        type: '(row: T) => void',
        description: 'Callback function called when a row is clicked'
      },
      {
        name: 'emptyMessage',
        type: 'string',
        default: "'No data available'",
        description: 'Message to display when there is no data'
      },
      {
        name: 'loading',
        type: 'boolean',
        default: 'false',
        description: 'Whether to show a loading state'
      },
      {
        name: 'sortable',
        type: 'boolean',
        default: 'true',
        description: 'Whether to enable column sorting'
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class names to apply to the table container'
      },
      {
        name: 'striped',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show alternating row colors'
      },
      {
        name: 'hoverable',
        type: 'boolean',
        default: 'true',
        description: 'Whether to show hover effects on rows'
      },
      {
        name: 'compact',
        type: 'boolean',
        default: 'false',
        description: 'Whether to use compact padding for cells'
      },
      {
        name: 'columns[].render',
        type: '(value: any, row: T) => React.ReactNode',
        description: 'Function to render custom cell content. Receives the cell value and the entire row data. Can return any valid React node including custom components.'
      },
      {
        name: 'theme',
        type: "'light' | 'dark' | 'auto'",
        default: "'auto'",
        description: 'Theme mode for the table. Auto will follow system preferences.'
      },
      {
        name: 'customColors',
        type: 'object',
        description: 'Override default theme colors for custom branding. See theme customization example.'
      },
    ],
    features: [
      'Sortable columns with ascending/descending order',
      'Pagination with customizable page size',
      'Custom cell rendering with React components',
      'Full access to row data in custom renderers',
      'Loading state with spinner',
      'Empty state message',
      'Row click handling',
      'Responsive design with horizontal scrolling',
      'Automatic theme detection and switching',
      'High contrast color schemes for better readability',
      'Customizable theme colors through CSS variables',
      'Accessible color combinations for all states',
    ],
    usageExamples: [
      {
        title: 'Theme Customization',
        description: 'Customizing table colors and contrast for both light and dark themes.',
        code: `// Custom CSS variables for theming
:root {
  /* Light theme colors */
  --table-bg: #ffffff;
  --table-text: #1a202c;
  --table-border: #e2e8f0;
  --table-header-bg: #f7fafc;
  --table-row-hover: #edf2f7;
  --table-row-stripe: #f9fafb;
}

/* Dark theme colors */
[data-theme="dark"] {
  --table-bg: #1a202c;
  --table-text: #ffffff;
  --table-border: #2d3748;
  --table-header-bg: #2d3748;
  --table-row-hover: #2c3544;
  --table-row-stripe: #1f2937;
}

<Table
  data={users}
  columns={columns}
  theme="auto"
  className="custom-themed-table"
/>`
      },
      {
        title: 'System Theme Integration',
        description: 'Automatically switching between light and dark themes based on system preference.',
        code: `<Table
  data={users}
  columns={columns}
  theme="auto"
  customColors={{
    light: {
      background: '#ffffff',
      text: '#1a202c',
      border: '#e2e8f0',
      headerBackground: '#f7fafc',
      rowHover: '#edf2f7',
      rowStripe: '#f9fafb'
    },
    dark: {
      background: '#1a202c',
      text: '#ffffff',
      border: '#2d3748',
      headerBackground: '#2d3748',
      rowHover: '#2c3544',
      rowStripe: '#1f2937'
    }
  }}
/>`
      },
      {
        title: 'Custom Component Rendering',
        description: 'Using custom React components for cell rendering with access to row data.',
        code: `const CustomCell: React.FC<{ value: string; row: User }> = ({ value, row }) => (
  <div className="custom-cell">
    <span>{value}</span>
    {row.isSpecial && <Icon name="star" color="gold" />}
  </div>
);

<Table
  data={users}
  columns={[
    { 
      key: 'name', 
      header: 'Name',
      render: (value, row) => <CustomCell value={value} row={row} />
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <div className="action-buttons">
          <Button onClick={() => handleEdit(row)}>Edit</Button>
          <Button onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      )
    }
  ]}
/>`
      },
      {
        title: 'Basic Table',
        description: 'A simple table with sortable columns and pagination.',
        code: `<Table
  data={users}
  columns={[
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email', sortable: true },
    { key: 'role', header: 'Role', sortable: true }
  ]}
  pageSize={5}
/>`
      },
      {
        title: 'Custom Cell Rendering',
        description: 'Using the render function to customize cell content.',
        code: `<Table
  data={users}
  columns={[
    { key: 'name', header: 'Name' },
    {
      key: 'status',
      header: 'Status',
      render: (value) => (
        <span className={\`status-badge \${value}\`}>
          {value}
        </span>
      )
    }
  ]}
/>`
      },
      {
        title: 'Interactive Table',
        description: 'Table with row click handling and hover effects.',
        code: `<Table
  data={users}
  columns={columns}
  onRowClick={(row) => handleRowClick(row)}
  hoverable
  striped
/>`
      }
    ]
  },
  formGroup: {
    name: 'Form Group',
    description: 'A powerful form management component that handles form state, validation, and submission.',
    codeExample: `import { FormGroup, FormField } from '../components/FormGroup';

const MyForm = () => {
  const handleSubmit = (values) => {
    console.log('Form submitted:', values);
  };

  const validateRequired = (value) => {
    return !value ? 'This field is required' : undefined;
  };

  return (
    <FormGroup
      initialValues={{
        name: '',
        email: '',
      }}
      onSubmit={handleSubmit}
    >
      <FormField
        name="name"
        validate={validateRequired}
      >
        {({ value, onChange, onBlur, error, touched }) => (
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              value={value}
              onChange={e => onChange(e.target.value)}
              onBlur={onBlur}
            />
            {error && touched && <div className="error">{error}</div>}
          </div>
        )}
      </FormField>
    </FormGroup>
  );
};`,
    api: [
      { name: 'initialValues', type: 'Record<string, any>', description: 'Initial values for form fields' },
      { name: 'onSubmit', type: '(values: Record<string, any>) => void', description: 'Callback fired when form is submitted' },
      { name: 'onChange', type: '(values: Record<string, any>) => void', description: 'Callback fired when any field value changes' },
      { name: 'className', type: 'string', description: 'Additional CSS class for the form element' }
    ],
    features: [
      'Form state management using React Context',
      'Field-level validation',
      'Touch tracking for showing errors',
      'Flexible input rendering with render props',
      'TypeScript support'
    ],
    availableIcons: undefined,
    usageExamples: undefined
  },
  radio: {
    name: 'Radio',
    description: 'A customizable radio button component that can be used independently or as part of a RadioGroup for managing related options. Supports different sizes, states, and orientations.',
    codeExample: `import { Radio, RadioGroup } from 'your-component-library';

// Individual radio button
<Radio
  label="Option 1"
  value="1"
  checked={selectedValue === '1'}
  onChange={(e) => setSelectedValue(e.target.value)}
  name="demo"
/>

// Radio group
<RadioGroup
  name="options"
  value={selectedValue}
  onChange={setSelectedValue}
  orientation="vertical"
>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
  <Radio label="Option 3" value="3" />
</RadioGroup>`,
    api: [
      { name: 'label', type: 'ReactNode', description: 'The label to display next to the radio button' },
      { name: 'value', type: 'string', description: 'The value associated with the radio button' },
      { name: 'checked', type: 'boolean', description: 'Whether the radio button is checked' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback when the radio button state changes' },
      { name: 'name', type: 'string', description: 'The name attribute for the radio button' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether to show the error state' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the radio button' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the radio button is disabled' },
      { name: 'className', type: 'string', description: 'Additional CSS class names' }
    ],
    features: [
      'Customizable sizes (small, medium, large)',
      'Support for error and disabled states',
      'Accessible by default with keyboard navigation',
      'Group management with RadioGroup component',
      'Vertical and horizontal orientations',
      'Consistent styling with design system',
      'TypeScript support with proper type definitions'
    ]
  },
  checkbox: {
    name: 'Checkbox',
    description: 'A customizable checkbox component with support for indeterminate state, different sizes, and various states. Perfect for single selections, multiple selections, and nested selection patterns.',
    codeExample: `import { Checkbox } from 'your-component-library';

// Basic usage
<Checkbox
  label="Accept terms"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

// With indeterminate state
<Checkbox
  label="Select all"
  checked={allChecked}
  indeterminate={someChecked}
  onChange={handleSelectAll}
/>`,
    api: [
      { name: 'label', type: 'ReactNode', description: 'The label to display next to the checkbox' },
      { name: 'checked', type: 'boolean', default: 'false', description: 'Whether the checkbox is checked' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Whether the checkbox is in an indeterminate state' },
      { name: 'error', type: 'boolean', default: 'false', description: 'Whether to show the error state' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'The size of the checkbox' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the checkbox is disabled' },
      { name: 'onChange', type: '(e: ChangeEvent) => void', description: 'Callback when the checkbox state changes' },
      { name: 'className', type: 'string', description: 'Additional CSS class names' }
    ],
    features: [
      'Support for indeterminate state',
      'Three size variants (small, medium, large)',
      'Error and disabled states',
      'Accessible by default with keyboard navigation',
      'Custom styling support',
      'TypeScript support with proper type definitions',
      'Controlled and uncontrolled usage'
    ]
  },
  routeProgress: {
    name: 'Route Progress',
    description: 'A component for displaying route progress with stops and vehicle location tracking. Supports pre-route state, active stops, and distance indicators.',
    codeExample: `import { RouteProgress } from 'your-component-library/RouteProgress';

const stops = [
  { id: '1', label: 'First Stop', isHome: true },
  { id: '2', label: 'Second Stop' }
];

function MyComponent() {
  return (
    <RouteProgress 
      stops={stops}
      distanceToRoute={250} // Optional: distance in meters to route start
    />
  );
}`,
    api: [
      {
        name: 'stops',
        type: 'RouteStop[]',
        required: true,
        description: 'Array of route stops to display'
      },
      {
        name: 'distanceToRoute',
        type: 'number | null',
        description: 'Distance to the start of the route in meters. null/undefined means on route'
      },
      {
        name: 'className',
        type: 'string',
        description: 'Additional CSS class names'
      }
    ],
    features: [
      'Visual route progress tracking',
      'Support for pre-route state with distance indicator',
      'Home stop indicator with icon',
      'Active stop highlighting',
      'Responsive design',
      'Dark theme support',
      'Animated vehicle location indicator'
    ]
  },
}; 