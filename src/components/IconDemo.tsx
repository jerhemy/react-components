import React, { useState } from 'react';
import { Icon, IconName, IconPaths, IconSize } from './icons';

const IconDemo: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<IconSize>('md');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  // Get all icon names from IconPaths
  const iconNames = Object.keys(IconPaths) as IconName[];

  // Available sizes for the dropdown
  const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <div className="icon-demo">
      <h1>Icon Component Demo</h1>
      
      <div className="icon-controls" style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ marginRight: '10px' }}>
            Size:
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value as IconSize)}
              style={{ marginLeft: '10px' }}
            >
              {sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
          
          <label style={{ marginLeft: '20px' }}>
            Color:
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
      </div>

      <div className="icon-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
        gap: '20px',
        padding: '20px'
      }}>
        {iconNames.map(name => (
          <div
            key={name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '4px',
              transition: 'all 0.2s ease'
            }}
          >
            <Icon
              name={name}
              size={selectedSize}
              color={selectedColor}
              title={`${name} icon`}
            />
            <span style={{
              marginTop: '8px',
              fontSize: '12px',
              textAlign: 'center',
              color: '#666'
            }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <div className="usage-example" style={{ margin: '40px 20px' }}>
        <h2>Usage Example</h2>
        <pre style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '4px',
          overflow: 'auto'
        }}>
{`import { Icon } from './components/icons';

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
/>`}
        </pre>
      </div>
    </div>
  );
};

export default IconDemo; 