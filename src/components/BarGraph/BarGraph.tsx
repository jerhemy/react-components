/**
 * BarGraph.tsx
 * 
 * A responsive SVG bar graph component with animation capabilities.
 * This component renders a customizable bar graph with optional animations
 * when data changes.
 */

import './BarGraph.css';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Data point interface for the bar graph
 */
export interface BarGraphDataPoint {
    /** Label for the data point */
    label: string;
    /** Value for the data point */
    value: number;
    /** Optional color for the specific bar */
    color?: string;
}

/**
 * Props for the BarGraph component
 */
export interface BarGraphProps {
    /** Array of data points to display */
    data: BarGraphDataPoint[];
    /** Width of the graph (default: 100%) */
    width?: string | number;
    /** Height of the graph (default: 400px) */
    height?: string | number;
    /** Title of the graph */
    title?: string;
    /** Whether to animate transitions (default: true) */
    animate?: boolean;
    /** Animation duration in milliseconds (default: 500) */
    animationDuration?: number;
    /** Base color for bars if not specified in data points */
    barColor?: string;
    /** Color for the bar on hover */
    hoverColor?: string;
    /** Whether to show values on bars (default: true) */
    showValues?: boolean;
    /** Whether to show the X-axis (default: true) */
    showXAxis?: boolean;
    /** Whether to show the Y-axis (default: true) */
    showYAxis?: boolean;
    /** Whether to show grid lines (default: true) */
    showGrid?: boolean;
    /** Number of Y-axis ticks (default: 5) */
    yAxisTicks?: number;
    /** Padding between bars as a ratio of bar width (default: 0.2) */
    barPadding?: number;
    /** Custom formatter for values */
    valueFormatter?: (value: number) => string;
    /** Custom formatter for labels */
    labelFormatter?: (label: string) => string;
    /** Callback when a bar is clicked */
    onBarClick?: (dataPoint: BarGraphDataPoint, index: number) => void;
    /** Force labels to be horizontal even with many data points (default: false) */
    forceHorizontalLabels?: boolean;
    /** Minimum value for the y-axis (default: 0) */
    minValue?: number;
    /** Maximum value for the y-axis (default: auto-calculated from data) */
    maxValue?: number;
}

/**
 * BarGraph Component
 * 
 * A responsive SVG bar graph with animation capabilities.
 */
const BarGraph: React.FC<BarGraphProps> = ({
    data,
    width = '100%',
    height = 400,
    title,
    animate = true,
    animationDuration = 500,
    barColor = '#4f46e5',
    hoverColor = '#6366f1',
    showValues = true,
    showXAxis = true,
    showYAxis = true,
    showGrid = true,
    yAxisTicks = 5,
    barPadding = 0.2,
    valueFormatter = (value) => value.toString(),
    labelFormatter = (label) => label,
    onBarClick,
    forceHorizontalLabels = false,
    minValue = 0,
    maxValue
}) => {
    // Reference to the SVG element for measuring
    const svgRef = useRef<SVGSVGElement>(null);

    // State for dimensions and hover
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredBar, setHoveredBar] = useState<number | null>(null);

    // State for animated values
    const [animatedValues, setAnimatedValues] = useState<number[]>([]);

    // Calculate the maximum value for scaling
    const dataMaxValue = Math.max(...data.map(d => d.value), 0);

    // Use provided maxValue or calculate from data
    const yAxisMaxValue = maxValue !== undefined ? maxValue : dataMaxValue;

    // Use provided minValue
    const yAxisMinValue = minValue;

    // Calculate the range of values
    const valueRange = yAxisMaxValue - yAxisMinValue;

    // Set up animation when data changes
    useEffect(() => {
        if (animate) {
            // Start with current values or zeros for new data
            const startValues = animatedValues.length === data.length
                ? animatedValues
                : data.map(() => yAxisMinValue);

            // Target values from the data
            const targetValues = data.map(d => d.value);

            // Animation timing
            const startTime = performance.now();
            const endTime = startTime + animationDuration;

            // Animation frame function
            const animateValues = (timestamp: number) => {
                // Calculate progress (0 to 1)
                const progress = Math.min((timestamp - startTime) / animationDuration, 1);

                // Interpolate values based on progress
                const newValues = startValues.map((startValue, i) => {
                    return startValue + (targetValues[i] - startValue) * progress;
                });

                // Update state with interpolated values
                setAnimatedValues(newValues);

                // Continue animation if not complete
                if (progress < 1) {
                    requestAnimationFrame(animateValues);
                }
            };

            // Start animation
            requestAnimationFrame(animateValues);
        } else {
            // If not animating, just set to the actual values
            setAnimatedValues(data.map(d => d.value));
        }
    }, [data, animate, animationDuration, yAxisMinValue]);

    // Update dimensions on resize
    useEffect(() => {
        const updateDimensions = () => {
            if (svgRef.current) {
                const { width, height } = svgRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        // Initial update
        updateDimensions();

        // Add resize listener
        window.addEventListener('resize', updateDimensions);

        // Cleanup
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, []);

    // Determine if labels should be rotated (if there are many bars or labels are likely long)
    const shouldRotateLabels = !forceHorizontalLabels && (data.length > 6 || data.some(d => labelFormatter(d.label).length > 5));

    // SVG viewBox and dimensions
    const viewBox = `0 0 ${dimensions.width || 100} ${dimensions.height || 100 + (shouldRotateLabels ? 40 : 20)}`;

    // Calculate margins and chart area
    const margin = {
        top: title ? 40 : 20,
        right: 20,
        bottom: showXAxis ? (shouldRotateLabels ? 80 : 60) : 20,
        left: showYAxis ? 60 : 20
    };

    const chartWidth = (dimensions.width || 100) - margin.left - margin.right;
    const chartHeight = (dimensions.height || 100) - margin.top - margin.bottom;

    // Calculate bar width based on available space and padding
    const barWidth = chartWidth / data.length * (1 - barPadding);
    const barSpacing = chartWidth / data.length;

    // Generate Y-axis ticks
    const yTicks = Array.from({ length: yAxisTicks + 1 }, (_, i) => {
        return yAxisMinValue + (valueRange * (i / yAxisTicks));
    });

    // Scale a value to the chart height
    const scaleY = (value: number) => {
        if (valueRange === 0) return chartHeight; // Prevent division by zero
        return chartHeight - ((value - yAxisMinValue) / valueRange) * chartHeight || 0;
    };

    return (
        <div className="bar-graph-container" style={{ width, height }}>
            {title && <h3 className="bar-graph-title">{title}</h3>}

            <svg
                ref={svgRef}
                className="bar-graph"
                width="100%"
                height="100%"
                viewBox={viewBox}
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    {/* Grid lines */}
                    {showGrid && yTicks.map((tick, i) => (
                        <line
                            key={`grid-${i}`}
                            x1={0}
                            y1={scaleY(tick)}
                            x2={chartWidth}
                            y2={scaleY(tick)}
                            className="bar-graph-grid-line"
                        />
                    ))}

                    {/* Y-axis */}
                    {showYAxis && (
                        <>
                            <line
                                x1={0}
                                y1={0}
                                x2={0}
                                y2={chartHeight}
                                className="bar-graph-axis"
                            />
                            {yTicks.map((tick, i) => (
                                <g key={`y-tick-${i}`}>
                                    <line
                                        x1={-5}
                                        y1={scaleY(tick)}
                                        x2={0}
                                        y2={scaleY(tick)}
                                        className="bar-graph-tick"
                                    />
                                    <text
                                        x={-10}
                                        y={scaleY(tick)}
                                        dy="0.32em"
                                        textAnchor="end"
                                        className="bar-graph-tick-label"
                                    >
                                        {valueFormatter(tick)}
                                    </text>
                                </g>
                            ))}
                        </>
                    )}

                    {/* X-axis */}
                    {showXAxis && (
                        <>
                            <line
                                x1={0}
                                y1={chartHeight}
                                x2={chartWidth}
                                y2={chartHeight}
                                className="bar-graph-axis"
                            />
                            {data.map((d, i) => {
                                const x = i * barSpacing + barSpacing / 2;
                                const y = chartHeight + 25;
                                return (
                                    <text
                                        key={`x-label-${i}`}
                                        x={x}
                                        y={y}
                                        textAnchor={shouldRotateLabels ? "end" : "middle"}
                                        className={`bar-graph-tick-label ${shouldRotateLabels ? 'bar-graph-x-label' : ''}`}
                                        transform={shouldRotateLabels ? `rotate(-20, ${x}, ${y})` : undefined}
                                    >
                                        {labelFormatter(d.label)}
                                    </text>
                                );
                            })}
                        </>
                    )}

                    {/* Bars */}
                    {data.map((d, i) => {
                        const value = Math.max(Math.min(animatedValues[i] || 0, yAxisMaxValue), yAxisMinValue);
                        const barHeight = chartHeight - scaleY(value);
                        const isHovered = hoveredBar === i;

                        return (
                            <g key={`bar-${i}`}>
                                <rect
                                    x={i * barSpacing + (barSpacing - barWidth) / 2}
                                    y={chartHeight - barHeight}
                                    width={barWidth}
                                    height={barHeight}
                                    fill={isHovered ? hoverColor : (d.color || barColor)}
                                    className="bar-graph-bar"
                                    onMouseEnter={() => setHoveredBar(i)}
                                    onMouseLeave={() => setHoveredBar(null)}
                                    onClick={() => onBarClick && onBarClick(d, i)}
                                />

                                {/* Bar value */}
                                {showValues && barHeight > 20 && (
                                    <text
                                        x={i * barSpacing + barSpacing / 2}
                                        y={chartHeight - barHeight - 5}
                                        textAnchor="middle"
                                        className="bar-graph-value"
                                    >
                                        {valueFormatter(d.value)}
                                    </text>
                                )}
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default BarGraph; 