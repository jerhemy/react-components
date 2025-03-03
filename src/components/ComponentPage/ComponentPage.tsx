import React from 'react';
import { useParams } from 'react-router-dom';
import { componentData } from '../../data/componentData';
import CodeBlock from '../CodeBlock/CodeBlock';
import './ComponentPage.css';

// Import demo components
import JsonTreeViewerDemo from '../JsonTreeViewerDemo';
import DataGridDemo from '../DataGridDemo';
import RouteTrackerDemo from '../RouteTrackerDemo';
import GlobalSearchDemo from '../GlobalSearchDemo';
import SchedulerDemo from '../SchedulerDemo';
import SelectDemo from '../SelectDemo';
import FieldsetDemo from '../FieldsetDemo';
import ModalDemo from '../ModalDemo';
import IconDemo from '../IconDemo';
import InputDemo from '../InputDemo';
import ButtonDemo from '../ButtonDemo';

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

// Map component IDs to their demo components
const demoComponents: Record<string, React.ComponentType> = {
  jsonViewer: JsonTreeViewerDemo,
  dataGrid: DataGridDemo,
  routeTracker: RouteTrackerDemo,
  globalSearch: GlobalSearchDemo,
  scheduler: SchedulerDemo,
  select: SelectDemo,
  fieldset: FieldsetDemo,
  modal: ModalDemo,
  icon: IconDemo,
  input: InputDemo,
  button: ButtonDemo,
};

const ComponentPage: React.FC = () => {
  const { componentId } = useParams<{ componentId: string }>();
  const component = componentId ? (componentData as unknown as Record<string, ComponentData>)[componentId] : null;
  const DemoComponent = componentId ? demoComponents[componentId] : null;

  if (!component) {
    return <div className="component-not-found">Component not found</div>;
  }

  return (
    <div className="component-page">
      <h1>{component.name}</h1>
      <p className="component-description">{component.description}</p>
      
      {component.codeExample && (
        <div className="example-container">
          <div className="example-preview">
            {DemoComponent && <DemoComponent />}
          </div>
          <CodeBlock code={component.codeExample} language="jsx" />
        </div>
      )}
      
      {component.features && component.features.length > 0 && (
        <div className="features-section">
          <h2>Features</h2>
          <ul>
            {component.features.map((feature: string, index: number) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      {component.api && (
        <div className="api-section">
          <h2>API</h2>
          <table className="api-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Required</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {component.api.map((prop: ApiProperty) => (
                <tr key={prop.name}>
                  <td>{prop.name}</td>
                  <td><code>{prop.type}</code></td>
                  <td>{prop.required ? 'Yes' : 'No'}</td>
                  <td>{prop.default !== undefined ? <code>{prop.default}</code> : '-'}</td>
                  <td>{prop.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {component.usageExamples && component.usageExamples.length > 0 && (
        <div className="usage-examples-section">
          <h2>Usage Examples</h2>
          {component.usageExamples.map((example: { title: string; description: string; code: string }, index: number) => (
            <div key={index} className="usage-example">
              <h3>{example.title}</h3>
              <p>{example.description}</p>
              <CodeBlock code={example.code} language="jsx" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComponentPage; 