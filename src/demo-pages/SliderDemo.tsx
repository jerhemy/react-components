/**
 * SliderDemo.tsx
 * 
 * Demo page for the Slider component showcasing various configurations and features.
 */

import './SliderDemo.css';

import React, { useState } from 'react';
import Slider, { SliderValue } from '../components/Slider';

import CodeBlock from '../components/CodeBlock/CodeBlock';

const SliderDemo: React.FC = () => {
    // State for basic slider
    const [basicValue, setBasicValue] = useState<number>(50);

    // State for constrained range slider
    const [constrainedValue, setConstrainedValue] = useState<number>(50);
    const [constrainedMin, setConstrainedMin] = useState<number>(20);
    const [constrainedMax, setConstrainedMax] = useState<number>(80);

    // State for range slider
    const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70]);

    // State for multiple values slider
    const [multipleValues, setMultipleValues] = useState<number[]>([25, 50, 75]);

    // State for vertical slider
    const [verticalValue, setVerticalValue] = useState<number>(50);

    // Format value as currency
    const formatCurrency = (value: number): string => {
        return `$${value.toFixed(2)}`;
    };

    // Format value as percentage
    const formatPercentage = (value: number): string => {
        return `${value}%`;
    };

    return (
        <div className="slider-demo">
            <h1>Slider Component</h1>

            <section className="demo-section">
                <h2>Overview</h2>
                <p>
                    The Slider component is a versatile input control that allows users to select a value or range
                    by dragging a handle along a track. It supports various configurations including constrained ranges,
                    multiple values, and different orientations.
                </p>
            </section>

            <section className="demo-section">
                <h2>Basic Slider</h2>
                <p>A simple slider with a single value.</p>

                <div className="demo-container">
                    <Slider
                        value={basicValue}
                        onChange={(value) => setBasicValue(value as number)}
                        showTicks={true}
                    />
                    <div className="demo-value">Value: {basicValue}</div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [value, setValue] = useState(50);
  
  return (
    <Slider
      value={value}
      onChange={(value) => setValue(value as number)}
      showTicks={true}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Constrained Range Slider</h2>
                <p>
                    A slider with constrained minimum and maximum values. The user can only select values
                    within the constrained range (highlighted area), even though the full range of the slider is wider.
                </p>

                <div className="demo-container">
                    <div className="demo-controls">
                        <label>
                            Constrained Min:
                            <input
                                type="number"
                                min={0}
                                max={constrainedMax - 1}
                                value={constrainedMin}
                                onChange={(e) => setConstrainedMin(Number(e.target.value))}
                            />
                        </label>
                        <label>
                            Constrained Max:
                            <input
                                type="number"
                                min={constrainedMin + 1}
                                max={100}
                                value={constrainedMax}
                                onChange={(e) => setConstrainedMax(Number(e.target.value))}
                            />
                        </label>
                    </div>

                    <Slider
                        value={constrainedValue}
                        onChange={(value) => setConstrainedValue(value as number)}
                        min={0}
                        max={100}
                        constrainedMin={constrainedMin}
                        constrainedMax={constrainedMax}
                        showTicks={true}
                        tickCount={10}
                    />
                    <div className="demo-value">Value: {constrainedValue}</div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [value, setValue] = useState(50);
  
  return (
    <Slider
      value={value}
      onChange={(value) => setValue(value as number)}
      min={0}
      max={100}
      constrainedMin={20}
      constrainedMax={80}
      showTicks={true}
      tickCount={10}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Range Slider</h2>
                <p>A slider that allows selecting a range between two values.</p>

                <div className="demo-container">
                    <Slider
                        value={rangeValue}
                        onChange={(value) => setRangeValue(value as [number, number])}
                        valueFormatter={formatCurrency}
                    />
                    <div className="demo-value">Range: {formatCurrency(rangeValue[0])} - {formatCurrency(rangeValue[1])}</div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70]);
  
  const formatCurrency = (value: number): string => {
    return \`$\${value.toFixed(2)}\`;
  };
  
  return (
    <Slider
      value={rangeValue}
      onChange={(value) => setRangeValue(value as [number, number])}
      valueFormatter={formatCurrency}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Multiple Values Slider</h2>
                <p>A slider that allows selecting multiple discrete values.</p>

                <div className="demo-container">
                    <Slider
                        value={multipleValues}
                        onChange={(value) => setMultipleValues(value as number[])}
                        multiple={true}
                        maxValues={5}
                        valueFormatter={formatPercentage}
                    />
                    <div className="demo-value">
                        Values: {multipleValues.map(formatPercentage).join(', ')}
                    </div>
                    <div className="demo-controls">
                        <button onClick={() => setMultipleValues([])}>Clear All</button>
                        <button onClick={() => setMultipleValues([25, 50, 75])}>Reset</button>
                    </div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [multipleValues, setMultipleValues] = useState<number[]>([25, 50, 75]);
  
  const formatPercentage = (value: number): string => {
    return \`\${value}%\`;
  };
  
  return (
    <Slider
      value={multipleValues}
      onChange={(value) => setMultipleValues(value as number[])}
      multiple={true}
      maxValues={5}
      valueFormatter={formatPercentage}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Vertical Slider</h2>
                <p>A slider with vertical orientation.</p>

                <div className="demo-container vertical-demo">
                    <Slider
                        value={verticalValue}
                        onChange={(value) => setVerticalValue(value as number)}
                        orientation="vertical"
                        height={200}
                        showTicks={true}
                    />
                    <div className="demo-value">Value: {verticalValue}</div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [value, setValue] = useState(50);
  
  return (
    <Slider
      value={value}
      onChange={(value) => setValue(value as number)}
      orientation="vertical"
      height={200}
      showTicks={true}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>Constrained Range with Range Selection</h2>
                <p>
                    A range slider with constrained minimum and maximum values. The user can only select values
                    within the constrained range.
                </p>

                <div className="demo-container">
                    <Slider
                        value={rangeValue}
                        onChange={(value) => setRangeValue(value as [number, number])}
                        min={0}
                        max={100}
                        constrainedMin={20}
                        constrainedMax={80}
                        showTicks={true}
                    />
                    <div className="demo-value">Range: {rangeValue[0]} - {rangeValue[1]}</div>
                </div>

                <CodeBlock code={`import Slider from '../components/Slider';

const MyComponent = () => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([30, 70]);
  
  return (
    <Slider
      value={rangeValue}
      onChange={(value) => setRangeValue(value as [number, number])}
      min={0}
      max={100}
      constrainedMin={20}
      constrainedMax={80}
      showTicks={true}
    />
  );
};`} language="tsx" />
            </section>

            <section className="demo-section">
                <h2>API Reference</h2>

                <table className="api-table">
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
                            <td>value</td>
                            <td>number | [number, number] | number[]</td>
                            <td>Required</td>
                            <td>Current value(s) of the slider</td>
                        </tr>
                        <tr>
                            <td>onChange</td>
                            <td>(value: SliderValue) => void</td>
                            <td>Required</td>
                            <td>Handler for value changes</td>
                        </tr>
                        <tr>
                            <td>min</td>
                            <td>number</td>
                            <td>0</td>
                            <td>Minimum possible value</td>
                        </tr>
                        <tr>
                            <td>max</td>
                            <td>number</td>
                            <td>100</td>
                            <td>Maximum possible value</td>
                        </tr>
                        <tr>
                            <td>step</td>
                            <td>number</td>
                            <td>1</td>
                            <td>Step size for value changes</td>
                        </tr>
                        <tr>
                            <td>constrainedMin</td>
                            <td>number</td>
                            <td>Same as min</td>
                            <td>Constrained minimum value - user cannot select below this</td>
                        </tr>
                        <tr>
                            <td>constrainedMax</td>
                            <td>number</td>
                            <td>Same as max</td>
                            <td>Constrained maximum value - user cannot select above this</td>
                        </tr>
                        <tr>
                            <td>multiple</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Whether to allow multiple values</td>
                        </tr>
                        <tr>
                            <td>maxValues</td>
                            <td>number</td>
                            <td>undefined</td>
                            <td>Maximum number of values when multiple is true</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Whether the slider is disabled</td>
                        </tr>
                        <tr>
                            <td>valueFormatter</td>
                            <td>(value: number) => string</td>
                            <td>value => value.toString()</td>
                            <td>Custom formatter for the displayed values</td>
                        </tr>
                        <tr>
                            <td>showLabels</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show value labels</td>
                        </tr>
                        <tr>
                            <td>showTicks</td>
                            <td>boolean</td>
                            <td>false</td>
                            <td>Whether to show tick marks</td>
                        </tr>
                        <tr>
                            <td>tickCount</td>
                            <td>number</td>
                            <td>5</td>
                            <td>Number of tick marks to show</td>
                        </tr>
                        <tr>
                            <td>className</td>
                            <td>string</td>
                            <td>''</td>
                            <td>Custom class name</td>
                        </tr>
                        <tr>
                            <td>showTooltip</td>
                            <td>boolean</td>
                            <td>true</td>
                            <td>Whether to show tooltip on hover/drag</td>
                        </tr>
                        <tr>
                            <td>orientation</td>
                            <td>'horizontal' | 'vertical'</td>
                            <td>'horizontal'</td>
                            <td>Orientation of the slider</td>
                        </tr>
                        <tr>
                            <td>height</td>
                            <td>string | number</td>
                            <td>200</td>
                            <td>Height for vertical slider</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default SliderDemo; 