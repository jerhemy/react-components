import React from 'react';
import JsonTreeViewerDemo from '../components/JsonTreeViewerDemo';
import DataGridDemo from '../components/DataGridDemo';
import RouteTrackerDemo from '../components/RouteTrackerDemo';
import GlobalSearchDemo from '../components/GlobalSearchDemo';
import SchedulerDemo from '../components/SchedulerDemo';
import SelectDemo from '../components/SelectDemo';
import FieldsetDemo from '../components/FieldsetDemo';
import ModalDemo from '../components/ModalDemo';

// Component categories for sidebar navigation
export const componentCategories = {
  form: {
    title: 'Form Components',
    items: [
      { id: 'input', label: 'Input' },
      { id: 'button', label: 'Button' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'select', label: 'Select' },
      { id: 'radio', label: 'Radio Button' },
      { id: 'icon', label: 'Icon' },
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
}; 