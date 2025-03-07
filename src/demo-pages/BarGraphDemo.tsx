/**
 * BarGraphDemo.tsx
 * 
 * This component demonstrates the usage and features of the BarGraph component.
 * It showcases various configurations, animations, and customization options.
 */

import './BarGraphDemo.css';

import BarGraph, { BarGraphDataPoint } from '../components/BarGraph';
import React, { useState } from 'react';

import CodeBlock from '../components/CodeBlock/CodeBlock';

/**
 * Generates random data for the bar graph demonstration
 */
const generateRandomData = (count: number): BarGraphDataPoint[] => {
    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const colors = ['#4f46e5', '#7c3aed', '#2563eb', '#0891b2', '#0d9488', '#059669', '#65a30d', '#ca8a04', '#d97706', '#dc2626', '#e11d48', '#be185d'];

    return Array.from({ length: count }, (_, i) => ({
        label: categories[i % categories.length],
        value: Math.floor(Math.random() * 90) + 10,
        color: colors[i % colors.length]
    }));
};

/**
 * BarGraphDemo Component
 */
const BarGraphDemo: React.FC = () => {
    // State for the demo data
    const [basicData, setBasicData] = useState<BarGraphDataPoint[]>(generateRandomData(6));
    const [customData, setCustomData] = useState<BarGraphDataPoint[]>(generateRandomData(12));
    const [noAnimationData, setNoAnimationData] = useState<BarGraphDataPoint[]>(generateRandomData(5));
    const [noGridData, setNoGridData] = useState<BarGraphDataPoint[]>(generateRandomData(4));
    const [customColorsData, setCustomColorsData] = useState<BarGraphDataPoint[]>(generateRandomData(8));
    const [customRangeData, setCustomRangeData] = useState<BarGraphDataPoint[]>([
        { label: 'Jan', value: 65 },
        { label: 'Feb', value: 59 },
        { label: 'Mar', value: 80 },
        { label: 'Apr', value: 72 },
        { label: 'May', value: 78 },
        { label: 'Jun', value: 74 }
    ]);
    const [animationEnabled, setAnimationEnabled] = useState(true);

    // Regenerate data for demonstration
    const regenerateData = () => {
        setBasicData(generateRandomData(6));
        setCustomData(generateRandomData(12));
        setNoAnimationData(generateRandomData(5));
        setNoGridData(generateRandomData(4));
        setCustomColorsData(generateRandomData(8));
        setCustomRangeData([
            { label: 'Jan', value: Math.floor(Math.random() * 30) + 50 },
            { label: 'Feb', value: Math.floor(Math.random() * 30) + 50 },
            { label: 'Mar', value: Math.floor(Math.random() * 30) + 50 },
            { label: 'Apr', value: Math.floor(Math.random() * 30) + 50 },
            { label: 'May', value: Math.floor(Math.random() * 30) + 50 },
            { label: 'Jun', value: Math.floor(Math.random() * 30) + 50 }
        ]);
    };

    // Format currency values
    const formatCurrency = (value: number) => {
        return `$${value.toLocaleString()}`;
    };

    // Format percentage values
    const formatPercentage = (value: number) => {
        return `${value}%`;
    };

    // Handle bar click
    const handleBarClick = (dataPoint: BarGraphDataPoint, index: number) => {
        console.log(`Bar clicked: ${dataPoint.label} - ${dataPoint.value} (index: ${index})`);
        alert(`You clicked on ${dataPoint.label} with value ${dataPoint.value}`);
    };

    return (
        <div className="bar-graph-demo">
            <h1>Bar Graph Component</h1>

            <section className="demo-section">
                <h2>Overview</h2>
                <p>
                    The BarGraph component is a responsive SVG-based bar graph with animation capabilities.
                    It supports customization of colors, labels, values, and provides interactive features
                    like hover effects and click handlers.
                </p>
            </section>

            <div className="demo-controls">
                <button onClick={regenerateData} className="demo-button">
                    Regenerate All Data
                </button>

                <label className="demo-checkbox">
                    <input
                        type="checkbox"
                        checked={animationEnabled}
                        onChange={() => setAnimationEnabled(!animationEnabled)}
                    />
                    Enable Animation
                </label>
            </div>

            <section className="demo-section">
                <h2>Basic Example</h2>
                <p>A simple bar graph with default settings.</p>

                <div className="demo-container">
                    <BarGraph
                        data={basicData}
                        title="Monthly Sales"
                        animate={animationEnabled}
                        height={300}
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={[
    { label: 'Jan', value: 45 },
    { label: 'Feb', value: 72 },
    { label: 'Mar', value: 38 },
    { label: 'Apr', value: 84 },
    { label: 'May', value: 63 },
    { label: 'Jun', value: 91 }
  ]}
  title="Monthly Sales"
  animate={true}
  height={300}
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Customized Example</h2>
                <p>A more customized bar graph with custom colors, formatters, and interaction.</p>

                <div className="demo-container">
                    <BarGraph
                        data={customData}
                        title="Annual Revenue by Month"
                        animate={animationEnabled}
                        height={400}
                        barColor="#3b82f6"
                        hoverColor="#2563eb"
                        valueFormatter={formatCurrency}
                        onBarClick={handleBarClick}
                        yAxisTicks={8}
                        barPadding={0.3}
                        forceHorizontalLabels={true}
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={monthlyData} // Array of { label, value, color? }
  title="Annual Revenue by Month"
  animate={true}
  height={400}
  barColor="#3b82f6"
  hoverColor="#2563eb"
  valueFormatter={(value) => \`$\${value.toLocaleString()}\`}
  onBarClick={(dataPoint, index) => {
    console.log(\`Bar clicked: \${dataPoint.label} - \${dataPoint.value}\`);
  }}
  yAxisTicks={8}
  barPadding={0.3}
  forceHorizontalLabels={true}
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Without Animation</h2>
                <p>A bar graph with animations disabled.</p>

                <div className="demo-container">
                    <BarGraph
                        data={noAnimationData}
                        title="Static Data Visualization"
                        animate={false}
                        height={250}
                        barColor="#10b981"
                        valueFormatter={formatPercentage}
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={[
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 42 },
    { label: 'Mar', value: 78 },
    { label: 'Apr', value: 53 },
    { label: 'May', value: 89 }
  ]}
  title="Static Data Visualization"
  animate={false}
  height={250}
  barColor="#10b981"
  valueFormatter={(value) => \`\${value}%\`}
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Without Grid Lines</h2>
                <p>A bar graph without grid lines for a cleaner look.</p>

                <div className="demo-container">
                    <BarGraph
                        data={noGridData}
                        title="Quarterly Results"
                        animate={animationEnabled}
                        height={250}
                        showGrid={false}
                        barColor="#f59e0b"
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={[
    { label: 'Q1', value: 45 },
    { label: 'Q2', value: 72 },
    { label: 'Q3', value: 38 },
    { label: 'Q4', value: 84 }
  ]}
  title="Quarterly Results"
  animate={true}
  height={250}
  showGrid={false}
  barColor="#f59e0b"
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Custom Colors Per Bar</h2>
                <p>A bar graph with custom colors for each bar.</p>

                <div className="demo-container">
                    <BarGraph
                        data={customColorsData}
                        title="Department Performance"
                        animate={animationEnabled}
                        height={300}
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={[
    { label: 'Sales', value: 82, color: '#4f46e5' },
    { label: 'Marketing', value: 65, color: '#7c3aed' },
    { label: 'R&D', value: 78, color: '#2563eb' },
    { label: 'Support', value: 45, color: '#0891b2' },
    { label: 'HR', value: 53, color: '#0d9488' },
    { label: 'Finance', value: 70, color: '#059669' },
    { label: 'IT', value: 88, color: '#65a30d' },
    { label: 'Admin', value: 42, color: '#ca8a04' }
  ]}
  title="Department Performance"
  animate={true}
  height={300}
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Custom Y-Axis Range</h2>
                <p>A bar graph with custom minimum and maximum values for the y-axis.</p>

                <div className="demo-container">
                    <BarGraph
                        data={customRangeData}
                        title="Monthly Performance (50-100 Scale)"
                        animate={animationEnabled}
                        height={300}
                        barColor="#8b5cf6"
                        minValue={50}
                        maxValue={100}
                        yAxisTicks={5}
                    />
                </div>

                <CodeBlock code={`<BarGraph
  data={[
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 59 },
    { label: 'Mar', value: 80 },
    { label: 'Apr', value: 72 },
    { label: 'May', value: 78 },
    { label: 'Jun', value: 74 }
  ]}
  title="Monthly Performance (50-100 Scale)"
  animate={true}
  height={300}
  barColor="#8b5cf6"
  minValue={50}
  maxValue={100}
  yAxisTicks={5}
/>`} language="tsx" />
            </section>

            <section className="demo-section">
                <h3>Available Props</h3>
                <table className="props-table">
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>data</td>
                            <td>BarGraphDataPoint[]</td>
                            <td>Required</td>
                            <td>Array of data points with label, value, and optional color</td>
                        </tr>
                        <tr>
                            <td>width</td>
                            <td>string | number</td>
                            <td>'100%'</td>
                            <td>Width of the graph container</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>string | number</td>
                            <td>400</td>
                            <td>Height of the graph container</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>string</td>
                            <td>undefined</td>
                            <td>Title displayed above the graph</td>
                        </tr>
                        <tr>
                            <td>animate</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to animate transitions when data changes</td>
                        </tr>
                        <tr>
                            <td>animationDuration</td>
                            <td>number</td>
                            <td>500</td>
                            <td>Duration of animations in milliseconds</td>
                        </tr>
                        <tr>
                            <td>barColor</td>
                            <td>string</td>
                            <td>'#4f46e5'</td>
                            <td>Default color for bars</td>
                        </tr>
                        <tr>
                            <td>hoverColor</td>
                            <td>string</td>
                            <td>'#6366f1'</td>
                            <td>Color for bars on hover</td>
                        </tr>
                        <tr>
                            <td>showValues</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show values on top of bars</td>
                        </tr>
                        <tr>
                            <td>showXAxis</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show the X-axis</td>
                        </tr>
                        <tr>
                            <td>showYAxis</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show the Y-axis</td>
                        </tr>
                        <tr>
                            <td>showGrid</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show grid lines</td>
                        </tr>
                        <tr>
                            <td>yAxisTicks</td>
                            <td>number</td>
                            <td>5</td>
                            <td>Number of ticks on the Y-axis</td>
                        </tr>
                        <tr>
                            <td>barPadding</td>
                            <td>number</td>
                            <td>0.2</td>
                            <td>Padding between bars (0-1)</td>
                        </tr>
                        <tr>
                            <td>valueFormatter</td>
                            <td>function</td>
                            <td>value => value.toString()</td>
                            <td>Function to format values displayed on bars and Y-axis</td>
                        </tr>
                        <tr>
                            <td>labelFormatter</td>
                            <td>function</td>
                            <td>label => label</td>
                            <td>Function to format labels on the X-axis</td>
                        </tr>
                        <tr>
                            <td>onBarClick</td>
                            <td>function</td>
                            <td>undefined</td>
                            <td>Callback when a bar is clicked</td>
                        </tr>
                        <tr>
                            <td>forceHorizontalLabels</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Force labels to be horizontal even with many data points</td>
                        </tr>
                        <tr>
                            <td>minValue</td>
                            <td>number</td>
                            <td>0</td>
                            <td>Minimum value for the y-axis scale</td>
                        </tr>
                        <tr>
                            <td>maxValue</td>
                            <td>number</td>
                            <td>auto</td>
                            <td>Maximum value for the y-axis scale (auto-calculated from data if not specified)</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="demo-section">
                <h2>Accessibility</h2>
                <p>
                    The BarGraph component is built with SVG elements that are accessible to screen readers.
                    The component uses semantic elements and provides appropriate text alternatives for visual elements.
                </p>
                <p>
                    Future improvements could include ARIA attributes and keyboard navigation for enhanced accessibility.
                </p>
            </section>

            <section className="demo-section">
                <h2>Responsive Behavior</h2>
                <p>
                    The BarGraph component is fully responsive and will adapt to its container size.
                    On smaller screens, the component will adjust the font sizes and may hide some labels
                    to maintain readability.
                </p>
                <p>
                    Try resizing your browser window to see how the graph responds to different screen sizes.
                </p>
            </section>
        </div>
    );
};

export default BarGraphDemo; 