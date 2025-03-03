import './RouteTrackerDemo.css';

import React, { useState } from 'react';

import RouteTracker from './RouteTracker';

const RouteTrackerDemo: React.FC = () => {
    // Sample data
    const totalDistance = 100; // km

    const [currentDistance, setCurrentDistance] = useState(35);
    const [direction, setDirection] = useState<'top-to-bottom' | 'bottom-to-top'>('top-to-bottom');

    const stops = [
        { name: 'Bus Station', distanceAlongRoute: 0 },
        { name: 'Downtown', distanceAlongRoute: 15 },
        { name: 'City Park', distanceAlongRoute: 30 },
        { name: 'Shopping Mall', distanceAlongRoute: 45 },
        { name: 'University', distanceAlongRoute: 60 },
        { name: 'Hospital', distanceAlongRoute: 75 },
        { name: 'Airport', distanceAlongRoute: 100 }
    ];

    // Handler for updating the current distance
    const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setCurrentDistance(value);
    };

    // Handler for changing the direction
    const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value as 'top-to-bottom' | 'bottom-to-top');
    };

    return (
        <div className="route-tracker-demo">
            <h2>Route Tracker Demo</h2>

            <div className="demo-controls">
                <div className="control-group">
                    <label htmlFor="distance-slider">
                        Current Distance: {currentDistance.toFixed(1)} km
                    </label>
                    <input
                        id="distance-slider"
                        type="range"
                        min="0"
                        max={totalDistance}
                        step="0.5"
                        value={currentDistance}
                        onChange={handleDistanceChange}
                        className="distance-slider"
                    />
                </div>

                <div className="control-group">
                    <label htmlFor="direction-select">
                        Route Direction:
                    </label>
                    <select
                        id="direction-select"
                        value={direction}
                        onChange={handleDirectionChange}
                        className="direction-select"
                    >
                        <option value="top-to-bottom">Top to Bottom</option>
                        <option value="bottom-to-top">Bottom to Top</option>
                    </select>
                </div>
            </div>

            <div className="tracker-container">
                <RouteTracker
                    currentDistance={currentDistance}
                    totalDistance={totalDistance}
                    stops={stops}
                    direction={direction}
                />
            </div>

            <div className="demo-info">
                <h3>Stops Information</h3>
                <ul className="stops-list">
                    {stops.map((stop, index) => (
                        <li key={index} className={currentDistance >= stop.distanceAlongRoute ? 'passed' : ''}>
                            <span className="stop-name">{stop.name}</span>
                            <span className="stop-distance">{stop.distanceAlongRoute} km</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RouteTrackerDemo; 