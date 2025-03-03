import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <h1>Component Library</h1>
      <p className="intro">
        Welcome to our component library documentation. This library provides a collection of 
        reusable React components for building modern web applications.
      </p>
      
      <div className="getting-started">
        <h2>Getting Started</h2>
        <div className="installation">
          <h3>Installation</h3>
          <pre>
            <code>
              {`// with npm
npm install your-component-library

// with yarn
yarn add your-component-library`}
            </code>
          </pre>
        </div>
        
        <div className="usage">
          <h3>Usage</h3>
          <p>Import components individually to keep your bundle size small:</p>
          <pre>
            <code>
              {`import { Button } from 'your-component-library/Button';
import { Input } from 'your-component-library/Input';

function App() {
  return (
    <div>
      <Input placeholder="Enter text..." />
      <Button>Click me</Button>
    </div>
  );
}`}
            </code>
          </pre>
        </div>
        
        <div className="explore">
          <h3>Explore Components</h3>
          <p>Check out our components:</p>
          <ul>
            <li><Link to="/components/button">Button</Link></li>
            <li><Link to="/components/input">Input</Link></li>
            <li><Link to="/components/select">Select</Link></li>
            <li><Link to="/components/dataGrid">Data Grid</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 