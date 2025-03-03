import React from 'react';
import './RouteProgress.css';

export interface RouteStop {
    id: string;
    label: string;
    isActive?: boolean;
    isHome?: boolean;
}

export interface RouteProgressProps {
    stops: RouteStop[];
    className?: string;
    distanceToRoute?: number | null; // Distance to the start of the route in meters, null/undefined means on route
}

export const RouteProgress: React.FC<RouteProgressProps> = ({
    stops,
    className = '',
    distanceToRoute
}) => {
    const showPreRouteDots = distanceToRoute !== null && distanceToRoute !== undefined;

    return (
        <div className={`route-progress ${className}`}>
            <div className="route-progress-line">
                {stops.map((stop, index) => (
                    <React.Fragment key={stop.id}>
                        <div className={`route-progress-stop ${stop.isActive ? 'active' : ''}`}>
                            {stop.isHome ? (
                                <div className="route-progress-home-icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </div>
                            ) : (
                                <div className="route-progress-dot" />
                            )}
                            <div className="route-progress-label">{stop.label}</div>
                        </div>
                        {index < stops.length - 1 && (
                            <div className="route-progress-connector">
                                {Array.from({ length: 7 }).map((_, i) => (
                                    <div key={i} className="route-progress-dash" />
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
                {showPreRouteDots && (
                    <div className="route-progress-pre-route">
                        <div className="route-progress-dot vehicle-dot" />
                        <div className="route-progress-connector pre-route">
                            {Array.from({ length: 7 }).map((_, i) => (
                                <div key={i} className="route-progress-dash" />
                            ))}
                        </div>
                        {distanceToRoute > 0 && (
                            <div className="route-progress-distance">
                                {distanceToRoute >= 1000
                                    ? `${(distanceToRoute / 1000).toFixed(1)} km to route`
                                    : `${Math.round(distanceToRoute)} m to route`
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RouteProgress; 