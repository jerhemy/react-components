import React, { useState } from 'react';
import { RouteProgress } from '../components/RouteProgress/RouteProgress';

const stops = [
    { id: '1', label: '21st and Osborn SB', isHome: true },
    { id: '2', label: 'Clarendon and 21st Ave SB' }
];

export const RouteProgressDemo: React.FC = () => {
    const [distanceToRoute, setDistanceToRoute] = useState<number | null>(250);

    const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setDistanceToRoute(value === '' ? null : Number(value));
    };

    return (
        <div className="demo-container">
            <h1>Route Progress</h1>

            <section>
                <h2>Basic Example</h2>
                <RouteProgress stops={stops} />
            </section>

            <section>
                <h2>Pre-Route Example</h2>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ marginRight: '1rem' }}>
                        Distance to route (meters):
                        <input
                            type="number"
                            value={distanceToRoute ?? ''}
                            onChange={handleDistanceChange}
                            style={{ marginLeft: '0.5rem' }}
                        />
                    </label>
                    <button onClick={() => setDistanceToRoute(null)}>
                        Clear Distance
                    </button>
                </div>
                <RouteProgress
                    stops={stops}
                    distanceToRoute={distanceToRoute}
                />
            </section>

            <section>
                <h2>Active Stop Example</h2>
                <RouteProgress
                    stops={[
                        { ...stops[0], isActive: true },
                        stops[1]
                    ]}
                />
            </section>

            <section>
                <h2>Usage</h2>
                <pre>
                    {`
// Basic usage
<RouteProgress stops={stops} />

// With distance to route
<RouteProgress 
  stops={stops} 
  distanceToRoute={250} // in meters
/>

// With active stop
<RouteProgress 
  stops={[
    { id: '1', label: 'Stop 1', isActive: true },
    { id: '2', label: 'Stop 2' }
  ]} 
/>
          `}
                </pre>
            </section>
        </div>
    );
};

export default RouteProgressDemo; 