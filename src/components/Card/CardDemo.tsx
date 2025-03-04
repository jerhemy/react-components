import React, { useState } from 'react';
import Card from './Card';
import CodeBlock from '../CodeBlock/CodeBlock';
import './CardDemo.css';

const CardDemo: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setSelectedCard(index === selectedCard ? null : index);
  };

  return (
    <div className="card-demo">
      <h1>Card</h1>
      <p className="component-description">
        A versatile card component for displaying content in a contained, styled box.
      </p>

      {/* Basic Card Example */}
      <div className="example-container">
        <h2>Basic Card</h2>
        <div className="example-preview">
          <Card title="Basic Card" elevation={1}>
            <p>This is a basic card with a title and content.</p>
          </Card>
        </div>
        <CodeBlock
          code={`import { Card } from './Card';

<Card title="Basic Card" elevation={1}>
  <p>This is a basic card with a title and content.</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* Card with Image Example */}
      <div className="example-container">
        <h2>Card with Image</h2>
        <div className="example-preview">
          <Card 
            title="Card with Image" 
            subtitle="A beautiful landscape"
            imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
            imageAlt="Landscape"
            elevation={2}
          >
            <p>This card includes an image at the top, along with a title and subtitle.</p>
          </Card>
        </div>
        <CodeBlock
          code={`<Card 
  title="Card with Image" 
  subtitle="A beautiful landscape"
  imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  imageAlt="Landscape"
  elevation={2}
>
  <p>This card includes an image at the top, along with a title and subtitle.</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* Card with Footer Example */}
      <div className="example-container">
        <h2>Card with Footer</h2>
        <div className="example-preview">
          <Card 
            title="Card with Footer" 
            footer={
              <div className="card-demo-footer">
                <button className="card-demo-button primary">Save</button>
                <button className="card-demo-button secondary">Cancel</button>
              </div>
            }
            elevation={1}
          >
            <p>This card includes a footer with action buttons.</p>
          </Card>
        </div>
        <CodeBlock
          code={`<Card 
  title="Card with Footer" 
  footer={
    <div className="card-demo-footer">
      <button className="card-demo-button primary">Save</button>
      <button className="card-demo-button secondary">Cancel</button>
    </div>
  }
  elevation={1}
>
  <p>This card includes a footer with action buttons.</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* Card with Header Actions Example */}
      <div className="example-container">
        <h2>Card with Header Actions</h2>
        <div className="example-preview">
          <Card 
            title="Card with Header Actions" 
            headerActions={
              <div className="card-demo-actions">
                <button className="card-demo-icon-button">⋮</button>
              </div>
            }
            elevation={1}
          >
            <p>This card includes actions in the header.</p>
          </Card>
        </div>
        <CodeBlock
          code={`<Card 
  title="Card with Header Actions" 
  headerActions={
    <div className="card-demo-actions">
      <button className="card-demo-icon-button">⋮</button>
    </div>
  }
  elevation={1}
>
  <p>This card includes actions in the header.</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* Elevation Levels Example */}
      <div className="example-container">
        <h2>Elevation Levels</h2>
        <div className="example-preview elevation-demo">
          <Card title="Elevation 0" elevation={0} bordered>
            <p>No shadow, with border</p>
          </Card>
          <Card title="Elevation 1" elevation={1}>
            <p>Light shadow</p>
          </Card>
          <Card title="Elevation 2" elevation={2}>
            <p>Medium shadow</p>
          </Card>
          <Card title="Elevation 3" elevation={3}>
            <p>Heavy shadow</p>
          </Card>
        </div>
        <CodeBlock
          code={`<Card title="Elevation 0" elevation={0} bordered>
  <p>No shadow, with border</p>
</Card>

<Card title="Elevation 1" elevation={1}>
  <p>Light shadow</p>
</Card>

<Card title="Elevation 2" elevation={2}>
  <p>Medium shadow</p>
</Card>

<Card title="Elevation 3" elevation={3}>
  <p>Heavy shadow</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* Hoverable Cards Example */}
      <div className="example-container">
        <h2>Hoverable Cards</h2>
        <div className="example-preview hoverable-demo">
          {[1, 2, 3].map((index) => (
            <Card 
              key={index}
              title={`Card ${index}`} 
              hoverable
              elevation={1}
              onClick={() => handleCardClick(index)}
              className={selectedCard === index ? 'card-selected' : ''}
            >
              <p>Click me! I'm a hoverable card.</p>
              {selectedCard === index && (
                <p className="selected-message">You selected this card!</p>
              )}
            </Card>
          ))}
        </div>
        <CodeBlock
          code={`<Card 
  title="Hoverable Card" 
  hoverable
  elevation={1}
  onClick={() => handleCardClick()}
>
  <p>Click me! I'm a hoverable card.</p>
</Card>`}
          language="typescript"
        />
      </div>

      {/* API Documentation */}
      <div className="api-section">
        <h2>API</h2>
        <table className="api-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>title</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Card title displayed in the header</td>
            </tr>
            <tr>
              <td><code>subtitle</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Card subtitle displayed below the title</td>
            </tr>
            <tr>
              <td><code>children</code></td>
              <td><code>ReactNode</code></td>
              <td>Required</td>
              <td>Card content</td>
            </tr>
            <tr>
              <td><code>footer</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Optional footer content</td>
            </tr>
            <tr>
              <td><code>headerActions</code></td>
              <td><code>ReactNode</code></td>
              <td>-</td>
              <td>Optional actions displayed in the header</td>
            </tr>
            <tr>
              <td><code>imageUrl</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>URL of an image to display at the top of the card</td>
            </tr>
            <tr>
              <td><code>imageAlt</code></td>
              <td><code>string</code></td>
              <td>''</td>
              <td>Alt text for the image</td>
            </tr>
            <tr>
              <td><code>elevation</code></td>
              <td><code>0 | 1 | 2 | 3</code></td>
              <td>1</td>
              <td>Shadow elevation level</td>
            </tr>
            <tr>
              <td><code>hoverable</code></td>
              <td><code>boolean</code></td>
              <td>false</td>
              <td>Whether the card has a hover effect</td>
            </tr>
            <tr>
              <td><code>bordered</code></td>
              <td><code>boolean</code></td>
              <td>true</td>
              <td>Whether the card has a border</td>
            </tr>
            <tr>
              <td><code>onClick</code></td>
              <td><code>function</code></td>
              <td>-</td>
              <td>Click handler for the card</td>
            </tr>
            <tr>
              <td><code>className</code></td>
              <td><code>string</code></td>
              <td>''</td>
              <td>Additional CSS class names</td>
            </tr>
            <tr>
              <td><code>style</code></td>
              <td><code>CSSProperties</code></td>
              <td>-</td>
              <td>Inline styles for the card</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CardDemo; 