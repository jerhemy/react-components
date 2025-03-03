import './RouteTrackerDemo.css';

import React, { useState } from 'react';

import CodeBlock from '../CodeBlock/CodeBlock';
import RouteTracker from './RouteTracker';

const sampleStops = [
  { name: 'Bus Station', distanceAlongRoute: 0 },
  { name: 'Downtown', distanceAlongRoute: 15 },
  { name: 'City Park', distanceAlongRoute: 30 },
  { name: 'Shopping Mall', distanceAlongRoute: 45 },
  { name: 'University', distanceAlongRoute: 60 },
  { name: 'Hospital', distanceAlongRoute: 75 },
  { name: 'Airport', distanceAlongRoute: 100 },
];

interface Stop {
  name: string;
  distanceAlongRoute: number;
}

interface StopsTableProps {
  stops: Stop[];
  currentDistance: number;
}

const StopsTable: React.FC<StopsTableProps> = ({ stops, currentDistance }) => (
  <table className="stops-table">
    <thead>
      <tr>
        <th>Stop Name</th>
        <th>Distance</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {stops.map((stop, index) => (
        <tr key={index} className={currentDistance >= stop.distanceAlongRoute ? 'passed' : ''}>
          <td>{stop.name}</td>
          <td>{stop.distanceAlongRoute}km</td>
          <td>
            <span className={`status-badge ${currentDistance >= stop.distanceAlongRoute ? 'passed' : 'upcoming'}`}>
              {currentDistance >= stop.distanceAlongRoute ? 'Passed' : 'Upcoming'}
            </span>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const RouteTrackerDemo: React.FC = () => {
  const [basicDistance, setBasicDistance] = useState(35);
  const [bottomTopDistance, setBottomTopDistance] = useState(35);
  const [progressDistance, setProgressDistance] = useState(75);
  const [customDistance, setCustomDistance] = useState(20);

  const customStops = [
    { name: 'Start Point', distanceAlongRoute: 0 },
    { name: 'Checkpoint 1', distanceAlongRoute: 15 },
    { name: 'Checkpoint 2', distanceAlongRoute: 30 },
    { name: 'Finish Line', distanceAlongRoute: 50 },
  ];

  const variations = [
    {
      title: 'Basic Route Tracker',
      description: 'A simple route tracker that displays the current route path.',
      preview: (
        <div className="route-demo-container">
          <RouteTracker
            currentDistance={basicDistance}
            totalDistance={100}
            stops={sampleStops}
          />
          <div className="controls">
            <label>
              Current Distance: {basicDistance}km
              <input
                type="range"
                min="0"
                max="100"
                value={basicDistance}
                onChange={(e) => setBasicDistance(Number(e.target.value))}
                className="distance-slider"
              />
            </label>
          </div>
          <StopsTable stops={sampleStops} currentDistance={basicDistance} />
        </div>
      ),
      code: `import { RouteTracker } from './RouteTracker';

const [currentDistance, setCurrentDistance] = useState(35);
const stops = [
  { name: 'Bus Station', distanceAlongRoute: 0 },
  { name: 'Downtown', distanceAlongRoute: 15 },
  { name: 'City Park', distanceAlongRoute: 30 },
  { name: 'Shopping Mall', distanceAlongRoute: 45 },
  { name: 'University', distanceAlongRoute: 60 },
  { name: 'Hospital', distanceAlongRoute: 75 },
  { name: 'Airport', distanceAlongRoute: 100 },
];

const MyComponent = () => {
  return (
    <>
      <RouteTracker
        currentDistance={currentDistance}
        totalDistance={100}
        stops={stops}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={currentDistance}
        onChange={(e) => setCurrentDistance(Number(e.target.value))}
      />
    </>
  );
};`,
    },
    {
      title: 'Bottom to Top Direction',
      description: 'Route tracker displaying the path from bottom to top.',
      preview: (
        <div className="route-demo-container">
          <RouteTracker
            currentDistance={bottomTopDistance}
            totalDistance={100}
            stops={sampleStops}
            direction="bottom-to-top"
          />
          <div className="controls">
            <label>
              Current Distance: {bottomTopDistance}km
              <input
                type="range"
                min="0"
                max="100"
                value={bottomTopDistance}
                onChange={(e) => setBottomTopDistance(Number(e.target.value))}
                className="distance-slider"
              />
            </label>
          </div>
          <StopsTable stops={sampleStops} currentDistance={bottomTopDistance} />
        </div>
      ),
      code: `import { RouteTracker } from './RouteTracker';

const [currentDistance, setCurrentDistance] = useState(35);

const MyComponent = () => {
  return (
    <>
      <RouteTracker
        currentDistance={currentDistance}
        totalDistance={100}
        stops={stops}
        direction="bottom-to-top"
      />
      <input
        type="range"
        min="0"
        max="100"
        value={currentDistance}
        onChange={(e) => setCurrentDistance(Number(e.target.value))}
      />
    </>
  );
};`,
    },
    {
      title: 'Different Progress',
      description: 'Route tracker showing a different current distance.',
      preview: (
        <div className="route-demo-container">
          <RouteTracker
            currentDistance={progressDistance}
            totalDistance={100}
            stops={sampleStops}
          />
          <div className="controls">
            <label>
              Current Distance: {progressDistance}km
              <input
                type="range"
                min="0"
                max="100"
                value={progressDistance}
                onChange={(e) => setProgressDistance(Number(e.target.value))}
                className="distance-slider"
              />
            </label>
          </div>
          <StopsTable stops={sampleStops} currentDistance={progressDistance} />
        </div>
      ),
      code: `import { RouteTracker } from './RouteTracker';

const [currentDistance, setCurrentDistance] = useState(75);

const MyComponent = () => {
  return (
    <>
      <RouteTracker
        currentDistance={currentDistance}
        totalDistance={100}
        stops={stops}
      />
      <input
        type="range"
        min="0"
        max="100"
        value={currentDistance}
        onChange={(e) => setCurrentDistance(Number(e.target.value))}
      />
    </>
  );
};`,
    },
    {
      title: 'Custom Stops',
      description: 'Route tracker with custom stop points.',
      preview: (
        <div className="route-demo-container">
          <RouteTracker
            currentDistance={customDistance}
            totalDistance={50}
            stops={customStops}
          />
          <div className="controls">
            <label>
              Current Distance: {customDistance}km
              <input
                type="range"
                min="0"
                max="50"
                value={customDistance}
                onChange={(e) => setCustomDistance(Number(e.target.value))}
                className="distance-slider"
              />
            </label>
          </div>
          <StopsTable stops={customStops} currentDistance={customDistance} />
        </div>
      ),
      code: `import { RouteTracker } from './RouteTracker';

const [currentDistance, setCurrentDistance] = useState(20);
const customStops = [
  { name: 'Start Point', distanceAlongRoute: 0 },
  { name: 'Checkpoint 1', distanceAlongRoute: 15 },
  { name: 'Checkpoint 2', distanceAlongRoute: 30 },
  { name: 'Finish Line', distanceAlongRoute: 50 },
];

const MyComponent = () => {
  return (
    <>
      <RouteTracker
        currentDistance={currentDistance}
        totalDistance={50}
        stops={customStops}
      />
      <input
        type="range"
        min="0"
        max="50"
        value={currentDistance}
        onChange={(e) => setCurrentDistance(Number(e.target.value))}
      />
    </>
  );
};`,
    },
  ];

  return (
    <div className="routetracker-demo">
      <h2>Route Tracker Component</h2>

      <div className="demo-info">
        <h3>Overview</h3>
        <p>
          The Route Tracker component provides a visual representation of progress
          along a route with multiple stops. It's perfect for tracking vehicles,
          delivery progress, or any journey-based visualization.
        </p>
      </div>

      {variations.map((variation, index) => (
        <div key={index} className="demo-variation">
          <h3>{variation.title}</h3>
          <p>{variation.description}</p>

          <div className="demo-preview">
            <h4>Preview</h4>
            <div className="preview-container">
              {variation.preview}
            </div>
          </div>

          <div className="demo-code">
            <h4>Code</h4>
            <CodeBlock code={variation.code} language="tsx" />
          </div>
        </div>
      ))}

      <div className="demo-info">
        <h3>Required CSS</h3>
        <CodeBlock
          code={`.route-tracker-container {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 20px;
}

.route-line {
  position: relative;
  height: 100%;
  width: 4px;
  background-color: var(--border-color);
  margin: 0 auto;
}

.route-stop {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.stop-icon {
  width: 12px;
  height: 12px;
  background-color: var(--primary-color);
  border-radius: 50%;
  margin: 0 8px;
}

.stop-label {
  color: var(--text-color);
  font-size: 14px;
  white-space: nowrap;
}

.vehicle-marker {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}

.vehicle-icon {
  width: 20px;
  height: 20px;
  background-color: var(--success-text);
  border-radius: 50%;
  margin: 0 8px;
}

.vehicle-info {
  color: var(--success-text);
  font-weight: 500;
  font-size: 14px;
}

.controls {
  margin: 20px 0;
  padding: 16px;
  background-color: var(--hover-color);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.distance-slider {
  width: 100%;
  margin-top: 10px;
}

.stops-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
}

.stops-table th,
.stops-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.stops-table tr.passed {
  background-color: var(--success-bg);
}

.status-badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-badge.passed {
  background-color: var(--success-bg);
  color: var(--success-text);
}

.status-badge.upcoming {
  background-color: var(--warning-bg);
  color: var(--warning-text);
}`}
          language="css"
        />
      </div>
    </div>
  );
};

export default RouteTrackerDemo; 