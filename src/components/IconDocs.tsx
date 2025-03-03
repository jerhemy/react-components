import React from 'react';
import { Icon, IconPaths } from './icons';
import { IconName, IconSize } from './icons';
import './IconDocs.css';

const IconDocs: React.FC = () => {
  // Get all icon names from IconPaths
  const iconNames = Object.keys(IconPaths) as IconName[];
  const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <div className="icon-docs">
      <h1>Icon Component</h1>
      
      <section className="overview">
        <h2>Overview</h2>
        <p>
          The Icon component is a flexible and customizable component that uses SVG paths for crisp rendering at any size.
          It supports various predefined sizes, custom colors, and accessibility features.
        </p>
      </section>

      <section className="installation">
        <h2>Installation</h2>
        <pre>
          <code>{`import { Icon } from './components/icons';`}</code>
        </pre>
      </section>

      <section className="basic-usage">
        <h2>Basic Usage</h2>
        <div className="example">
          <div className="demo">
            <Icon name="search" />
            <Icon name="warning" color="#ffc107" />
            <Icon name="success" color="#4CAF50" />
          </div>
          <pre>
            <code>{`<Icon name="search" />
<Icon name="warning" color="#ffc107" />
<Icon name="success" color="#4CAF50" />`}</code>
          </pre>
        </div>
      </section>

      <section className="sizes">
        <h2>Available Sizes</h2>
        <div className="example">
          <div className="demo">
            {sizes.map(size => (
              <div key={size} className="size-demo">
                <Icon name="search" size={size} />
                <span>{size}</span>
              </div>
            ))}
          </div>
          <pre>
            <code>{`<Icon name="search" size="xs" />
<Icon name="search" size="sm" />
<Icon name="search" size="md" />
<Icon name="search" size="lg" />
<Icon name="search" size="xl" />`}</code>
          </pre>
        </div>
      </section>

      <section className="accessibility">
        <h2>Accessibility</h2>
        <div className="example">
          <div className="demo">
            <Icon
              name="warning"
              size="lg"
              color="#ffc107"
              title="Warning"
              description="This action cannot be undone"
            />
          </div>
          <pre>
            <code>{`<Icon
  name="warning"
  size="lg"
  color="#ffc107"
  title="Warning"
  description="This action cannot be undone"
/>`}</code>
          </pre>
        </div>
      </section>

      <section className="icon-library">
        <h2>Icon Library</h2>
        <div className="icon-grid">
          {iconNames.map(name => (
            <div key={name} className="icon-item">
              <Icon name={name} size="lg" />
              <span className="icon-name">{name}</span>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .icon-docs {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        section {
          margin-bottom: 3rem;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        h2 {
          font-size: 1.8rem;
          margin-bottom: 1rem;
        }

        .overview p {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #666;
        }

        .example {
          margin: 1.5rem 0;
        }

        .demo {
          display: flex;
          gap: 1rem;
          align-items: center;
          margin-bottom: 1rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .size-demo {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }

        pre {
          background: #f5f5f5;
          padding: 1rem;
          border-radius: 4px;
          overflow-x: auto;
        }

        code {
          font-family: monospace;
          font-size: 0.9rem;
        }

        .icon-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
          background: #f5f5f5;
          border-radius: 4px;
        }

        .icon-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: white;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .icon-name {
          font-size: 0.8rem;
          color: #666;
          text-align: center;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
};

export default IconDocs; 