import './IconDemo.css';

import { Icon, IconName, IconPaths, IconSize } from './icons';
import React, { useState } from 'react';

import CodeBlock from './CodeBlock/CodeBlock';

const IconDemo: React.FC = () => {
  const [selectedSize, setSelectedSize] = useState<IconSize>('md');
  const [selectedColor, setSelectedColor] = useState<string>('#000000');

  // Get all icon names from IconPaths
  const iconNames = Object.keys(IconPaths) as IconName[];

  // Available sizes for the dropdown
  const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  // Define variations of the icon component
  const variations = [
    {
      title: 'Basic Icons',
      description: 'A collection of commonly used icons in their default size.',
      component: (
        <div className="icon-grid">
          {iconNames.slice(0, 12).map((name) => (
            <div key={name} className="icon-item">
              <Icon name={name} />
              <span className="icon-name">{name}</span>
            </div>
          ))}
        </div>
      ),
      code: `// Basic icon usage
import { Icon } from './icons';

<Icon name="user" />
<Icon name="settings" />
<Icon name="search" />`
    },
    {
      title: 'Icon Sizes',
      description: 'Icons can be rendered in different sizes using the size prop.',
      component: (
        <div className="icon-row">
          {sizes.map((size) => (
            <div key={size} className="icon-item">
              <Icon name="star" size={size} />
              <span className="icon-size">{size}</span>
            </div>
          ))}
        </div>
      ),
      code: `// Icon size variations
import { Icon } from './icons';

<Icon name="star" size="xs" />
<Icon name="star" size="sm" />
<Icon name="star" size="md" />
<Icon name="star" size="lg" />
<Icon name="star" size="xl" />`
    },
    {
      title: 'Colored Icons',
      description: 'Icons can be customized with different colors.',
      component: (
        <div className="icon-row">
          <div className="icon-item">
            <Icon name="heart" color="#ff0000" />
            <span className="icon-color">Red</span>
          </div>
          <div className="icon-item">
            <Icon name="heart" color="#00ff00" />
            <span className="icon-color">Green</span>
          </div>
          <div className="icon-item">
            <Icon name="heart" color="#0000ff" />
            <span className="icon-color">Blue</span>
          </div>
          <div className="icon-item">
            <Icon name="heart" color="#9932cc" />
            <span className="icon-color">Purple</span>
          </div>
        </div>
      ),
      code: `// Colored icons
import { Icon } from './icons';

<Icon name="heart" color="#ff0000" />
<Icon name="heart" color="#00ff00" />
<Icon name="heart" color="#0000ff" />
<Icon name="heart" color="#9932cc" />`
    },
    {
      title: 'Interactive Icon Playground',
      description: 'Try different sizes and colors for any icon.',
      component: (
        <div className="icon-playground">
          <div className="icon-controls">
            <label>
              Size:
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value as IconSize)}
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </label>
            <label>
              Color:
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              />
            </label>
          </div>
          <div className="icon-preview">
            {iconNames.slice(0, 6).map((name) => (
              <div key={name} className="icon-item">
                <Icon name={name} size={selectedSize} color={selectedColor} />
                <span className="icon-name">{name}</span>
              </div>
            ))}
          </div>
        </div>
      ),
      code: `// Interactive icon with custom size and color
import { Icon } from './icons';

const [size, setSize] = useState<IconSize>('md');
const [color, setColor] = useState('#000000');

<Icon name="star" size={size} color={color} />`
    }
  ];

  return (
    <div className="icon-demo">
      <h2>Icon Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The Icon component provides a flexible way to display vector icons with
          customizable sizes and colors. Below are various examples showing
          different ways to use and customize the component.
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
          Include these CSS styles in your project to use the icon component:
        </p>
        <CodeBlock
          code={`.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 16px;
}

.icon-row {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.icon-name {
  font-size: 12px;
  color: var(--secondary-text);
}

.icon-size {
  font-size: 12px;
  color: var(--secondary-text);
  text-transform: uppercase;
}

.icon-color {
  font-size: 12px;
  color: var(--secondary-text);
}

.icon-playground {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.icon-controls {
  display: flex;
  gap: 24px;
  align-items: center;
}

.icon-controls label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-controls select,
.icon-controls input {
  padding: 4px 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.icon-preview {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default IconDemo; 