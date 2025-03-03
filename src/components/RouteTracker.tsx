import React from 'react';
import './RouteTracker.css';

// Define the types for our component props
interface Stop {
    name: string;
    distanceAlongRoute: number;
}

interface RouteTrackerProps {
    currentDistance: number;
    totalDistance: number;
    stops: Stop[];
    direction?: 'top-to-bottom' | 'bottom-to-top'; // New optional property with default value
}

const RouteTracker: React.FC<RouteTrackerProps> = ({
    currentDistance,
    totalDistance,
    stops,
    direction = 'top-to-bottom', // Default to top-to-bottom if not specified
}) => {
    // Calculate the vehicle position as a percentage of the total distance
    const vehiclePosition = (currentDistance / totalDistance) * 100;

    // Determine if we need to invert the positions based on direction
    const getPosition = (percentage: number): number => {
        return direction === 'bottom-to-top' ? 100 - percentage : percentage;
    };

    // Sort stops based on direction
    const sortedStops = [...stops].sort((a, b) => {
        if (direction === 'bottom-to-top') {
            // For bottom-to-top, reverse the order (highest distance first)
            return b.distanceAlongRoute - a.distanceAlongRoute;
        }
        // For top-to-bottom, maintain original order (lowest distance first)
        return a.distanceAlongRoute - b.distanceAlongRoute;
    });

    return (
        <div className="route-tracker-container">
            <div className={`route-line ${direction}`}>
                {/* Start point */}
                <div className="route-endpoint route-start">
                    <div className="endpoint-label">Start</div>
                </div>

                {/* The vertical line */}
                <div className="route-path"></div>

                {/* Stops along the route */}
                {sortedStops.map((stop, index) => {
                    // Calculate stop position as percentage of total distance
                    const stopPosition = (stop.distanceAlongRoute / totalDistance) * 100;

                    return (
                        <div
                            key={index}
                            className="route-stop"
                            style={{ top: `${getPosition(stopPosition)}%` }}
                        >
                            <div className="stop-icon"></div>
                            <div className="stop-label">{stop.name}</div>
                        </div>
                    );
                })}

                {/* Vehicle marker */}
                <div
                    className="vehicle-marker"
                    style={{ top: `${getPosition(vehiclePosition)}%` }}
                >
                    <div className="vehicle-icon"></div>
                    <div className="vehicle-info">
                        {currentDistance.toFixed(1)} km
                    </div>
                </div>

                {/* End point */}
                <div className="route-endpoint route-end">
                    <div className="endpoint-label">End ({totalDistance.toFixed(1)} km)</div>
                </div>
            </div>
        </div>
    );
};

export default RouteTracker; 