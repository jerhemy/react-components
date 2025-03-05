import React, { useRef, useEffect, useState } from 'react';
import './RouteProgress.css';

export interface RouteStop {
    id: string;
    name: string;
    distanceFromStart: number; // Distance from start in real units (e.g., kilometers)
    completed: boolean;
    icon?: string; // Optional icon name
}

export interface RouteProgressProps {
    /**
     * Array of stops along the route
     */
    stops: RouteStop[];
    
    /**
     * Current distance along the route in real units (e.g., kilometers)
     */
    currentDistance: number;
    
    /**
     * Total distance of the route in real units (e.g., kilometers)
     */
    totalDistance: number;
    
    /**
     * Optional custom class name
     */
    className?: string;
    
    /**
     * Optional callback when a stop is clicked
     */
    onStopClick?: (stop: RouteStop) => void;
    
    /**
     * Height of the component
     * @default '400px'
     */
    height?: string;
    
    /**
     * Show GPS navigation icon
     * @default true
     */
    showGpsIndicator?: boolean;
    
    /**
     * Distance unit label (e.g., 'km', 'mi')
     * @default 'km'
     */
    distanceUnit?: string;
}

/**
 * RouteProgress component displays a vertical route with stops and tracks progress
 * The component scrolls from bottom to top as progress increases
 */
export const RouteProgress: React.FC<RouteProgressProps> = ({
    stops,
    currentDistance,
    totalDistance,
    className = '',
    onStopClick,
    height = '400px',
    showGpsIndicator = true,
    distanceUnit = 'km',
}) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const routeRef = useRef<HTMLDivElement>(null);
    const routeLineRef = useRef<HTMLDivElement>(null);
    const [progressPercentage, setProgressPercentage] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);
    
    // Calculate progress percentage
    useEffect(() => {
        const percentage = Math.min(100, Math.max(0, (currentDistance / totalDistance) * 100));
        setProgressPercentage(percentage);
    }, [currentDistance, totalDistance]);
    
    // Get container height on mount and resize
    useEffect(() => {
        if (scrollContainerRef.current) {
            const updateHeight = () => {
                const height = scrollContainerRef.current?.clientHeight || 0;
                setContainerHeight(height);
            };
            
            updateHeight();
            window.addEventListener('resize', updateHeight);
            
            return () => {
                window.removeEventListener('resize', updateHeight);
            };
        }
    }, []);
    
    // Update scroll position when currentDistance changes
    useEffect(() => {
        if (scrollContainerRef.current && routeRef.current && routeLineRef.current) {
            // Calculate progress percentage based on current distance
            const percentage = Math.min(100, Math.max(0, (currentDistance / totalDistance) * 100));
            
            // Get the position of the current point along the route
            const routeLineHeight = routeLineRef.current.offsetHeight;
            const currentPoint = routeLineHeight * (1 - percentage / 100);
            
            // Calculate the scroll position to center the current point
            const halfContainerHeight = scrollContainerRef.current.offsetHeight / 2;
            const bufferHeight = containerHeight / 2;
            
            // The scroll position is the current point's position minus half the container height
            // We add the buffer height to account for the top buffer
            const scrollPosition = currentPoint - halfContainerHeight + bufferHeight;
            
            // Apply scroll position with bounds checking
            scrollContainerRef.current.scrollTop = Math.max(0, scrollPosition);
        }
    }, [currentDistance, containerHeight, totalDistance]);
    
    // Calculate buffer height (half of container height)
    const bufferHeight = containerHeight / 2;
    
    // Format distance with unit
    const formatDistance = (distance: number): string => {
        return `${distance.toFixed(1)} ${distanceUnit}`;
    };
    
    return (
        <div 
            className={`route-progress ${className}`} 
            style={{ height }}
            ref={scrollContainerRef}
        >
            <div className="route-progress-content" ref={routeRef}>
                {/* Top buffer space */}
                <div className="route-buffer top" style={{ height: `${bufferHeight}px` }}></div>
                
                <div className="route-line-container" ref={routeLineRef}>
                    <div className="route-line">
                        {/* Progress indicator line */}
                        <div 
                            className="route-line-progress" 
                            style={{ height: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    
                    {/* GPS Navigation Icon */}
                    {showGpsIndicator && (
                        <div 
                            className="gps-indicator"
                            style={{ top: `${100 - progressPercentage}%` }}
                        >
                            <div className="gps-indicator-pulse"></div>
                            <div className="gps-indicator-arrow"></div>
                            <div className="gps-indicator-distance">
                                {formatDistance(currentDistance)}
                            </div>
                        </div>
                    )}
                    
                    {stops.map((stop) => {
                        // Calculate position as percentage of total distance
                        const stopPercentage = (stop.distanceFromStart / totalDistance) * 100;
                        // Invert the position for bottom-to-top scrolling (0% at bottom, 100% at top)
                        const invertedPosition = 100 - stopPercentage;
                        // Determine if stop is passed
                        const isPassed = currentDistance >= stop.distanceFromStart;
                        
                        return (
                            <div 
                                key={stop.id}
                                className={`route-stop ${stop.completed ? 'completed' : ''} ${isPassed ? 'passed' : ''}`}
                                style={{ top: `${invertedPosition}%` }}
                                onClick={() => onStopClick && onStopClick(stop)}
                            >
                                <div className="route-stop-marker">
                                    {stop.icon && <span className="route-stop-icon-marker">{stop.icon}</span>}
                                </div>
                                <div className="route-stop-details">
                                    <span className="route-stop-name">{stop.name}</span>
                                    <span className="route-stop-distance">{formatDistance(stop.distanceFromStart)}</span>
                                </div>
                            </div>
                        );
                    })}
                    
                    {/* Start and End labels */}
                    <div className="route-endpoint start">
                        <div className="route-endpoint-label">Start</div>
                    </div>
                    <div className="route-endpoint end">
                        <div className="route-endpoint-label">
                            End ({formatDistance(totalDistance)})
                        </div>
                    </div>
                </div>
                
                {/* Bottom buffer space */}
                <div className="route-buffer bottom" style={{ height: `${bufferHeight}px` }}></div>
            </div>
        </div>
    );
};

export default RouteProgress; 