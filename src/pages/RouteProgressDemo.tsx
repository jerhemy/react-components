import React, { useState, useEffect } from 'react';
import RouteProgress, { RouteStop } from '../components/RouteProgress/RouteProgress';
import './RouteProgressDemo.css';

const RouteProgressDemo: React.FC = () => {
  // Sample route stops - ordered from start (bottom) to destination (top)
  const stops: RouteStop[] = [
    { id: '1', name: 'Starting Point', distanceFromStart: 0, completed: true, icon: '🏠' },
    { id: '2', name: 'Checkpoint Alpha', distanceFromStart: 20, completed: true, icon: '🚩' },
    { id: '3', name: 'Scenic Viewpoint', distanceFromStart: 35, completed: false, icon: '🌄' },
    { id: '4', name: 'Rest Area', distanceFromStart: 50, completed: false, icon: '☕' },
    { id: '5', name: 'Mountain Pass', distanceFromStart: 65, completed: false, icon: '⛰️' },
    { id: '6', name: 'River Crossing', distanceFromStart: 80, completed: false, icon: '🌊' },
    { id: '7', name: 'Destination', distanceFromStart: 100, completed: false, icon: '🏁' },
  ];

  // State for current distance
  const [currentDistance, setCurrentDistance] = useState(25);
  const [autoScroll, setAutoScroll] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [stopsState, setStopsState] = useState<RouteStop[]>(stops);
  const [showGpsIndicator, setShowGpsIndicator] = useState(true);
  const totalDistance = 100; // Total distance in miles or meters
  const distanceUnit = 'mi'; // Distance unit (miles)

  // Update stops completion status based on current distance
  useEffect(() => {
    const updatedStops = stops.map(stop => ({
      ...stop,
      completed: stop.distanceFromStart <= currentDistance
    }));
    setStopsState(updatedStops);
  }, [currentDistance]);

  // Format distance with unit
  const formatDistance = (distance: number): string => {
    return `${distance.toFixed(1)} ${distanceUnit}`;
  };

  // Handle stop click
  const handleStopClick = (stop: RouteStop) => {
    setCurrentDistance(stop.distanceFromStart);
    console.log(`Navigated to: ${stop.name}`);
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!autoScroll) return;
    
    const interval = setInterval(() => {
      setCurrentDistance(prev => {
        const next = prev + speed;
        if (next >= totalDistance) {
          setAutoScroll(false);
          return totalDistance;
        }
        return next;
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, [autoScroll, speed, totalDistance]);

  return (
    <div className="route-progress-demo">
      <h2>Route Progress Demo</h2>
      <p className="direction-info">
        This route progresses from bottom (start) to top (destination) with the current position centered in view
      </p>
      
      <div className="demo-container">
        <div className="controls-panel">
          <div className="control-group">
            <label htmlFor="distance-slider">Distance Along Route: {formatDistance(currentDistance)}</label>
            <input
              id="distance-slider"
              type="range"
              min="0"
              max={totalDistance}
              value={currentDistance}
              onChange={(e) => setCurrentDistance(Number(e.target.value))}
              className="slider"
            />
          </div>
          
          <div className="control-group">
            <label htmlFor="auto-scroll">Auto Scroll:</label>
            <div className="toggle-container">
              <input
                id="auto-scroll"
                type="checkbox"
                checked={autoScroll}
                onChange={() => setAutoScroll(!autoScroll)}
                className="toggle"
              />
              <label htmlFor="auto-scroll" className="toggle-label"></label>
            </div>
          </div>
          
          <div className="control-group">
            <label htmlFor="gps-indicator">GPS Navigation Icon:</label>
            <div className="toggle-container">
              <input
                id="gps-indicator"
                type="checkbox"
                checked={showGpsIndicator}
                onChange={() => setShowGpsIndicator(!showGpsIndicator)}
                className="toggle"
              />
              <label htmlFor="gps-indicator" className="toggle-label"></label>
            </div>
          </div>
          
          {autoScroll && (
            <div className="control-group">
              <label htmlFor="speed-slider">Speed: {speed}x</label>
              <input
                id="speed-slider"
                type="range"
                min="0.5"
                max="5"
                step="0.5"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="slider"
              />
            </div>
          )}
          
          <div className="control-group">
            <button 
              className="control-button"
              onClick={() => setCurrentDistance(0)}
            >
              Reset
            </button>
            <button 
              className="control-button"
              onClick={() => {
                setCurrentDistance(0);
                setAutoScroll(true);
              }}
            >
              Start Journey
            </button>
          </div>
          
          <div className="route-legend">
            <h4>Legend</h4>
            <div className="legend-item">
              <div className="legend-marker completed"></div>
              <span>Completed Stop</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker passed"></div>
              <span>Passed Point</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker"></div>
              <span>Upcoming Stop</span>
            </div>
            {showGpsIndicator && (
              <div className="legend-item">
                <div className="legend-gps-icon">
                  <div className="gps-indicator-arrow" style={{ transform: 'scale(0.6)' }}></div>
                </div>
                <span>Current Position</span>
              </div>
            )}
          </div>
          
          <div className="layout-info">
            <h4>Layout Features</h4>
            <ul>
              <li>Route line positioned on the left</li>
              <li>Stop details shown on the right</li>
              <li>Current position always centered in view</li>
              <li>Icons embedded in stop markers</li>
            </ul>
          </div>
        </div>
        
        <div className="tracker-container">
          <div className="direction-labels">
            <div className="direction-label top">Destination</div>
            <RouteProgress
              stops={stopsState}
              currentDistance={currentDistance}
              totalDistance={totalDistance}
              distanceUnit={distanceUnit}
              onStopClick={handleStopClick}
              height="calc(100% - 64px)"
              showGpsIndicator={showGpsIndicator}
              className="route-progress-demo-instance"
            />
            <div className="direction-label bottom">Start</div>
          </div>
        </div>
      </div>
      
      <div className="demo-info">
        <h3>Component Features</h3>
        <ul>
          <li>Scrollable route visualization with hidden scrollbar</li>
          <li>Scroll position controlled by distance along route</li>
          <li>Route progresses from bottom (start) to top (destination)</li>
          <li>Current position always centered in the viewport</li>
          <li>Interactive stops with completion status</li>
          <li>Visual indicators for passed checkpoints</li>
          <li>GPS-style navigation icon showing current position</li>
          <li>Click on stops to navigate directly to that point</li>
        </ul>
      </div>
    </div>
  );
};

export default RouteProgressDemo; 