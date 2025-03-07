/**
 * Slider.tsx
 * 
 * A customizable slider component that supports:
 * - Single value selection
 * - Range selection (min/max)
 * - Multiple value selection
 * - Constrained ranges (disabled sections)
 */

import './Slider.css';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export type SliderValue = number | [number, number] | number[];

export interface SliderProps {
    /** Current value of the slider */
    value: SliderValue;
    /** Handler for value changes */
    onChange: (value: SliderValue) => void;
    /** Minimum possible value (default: 0) */
    min?: number;
    /** Maximum possible value (default: 100) */
    max?: number;
    /** Step size for value changes (default: 1) */
    step?: number;
    /** Constrained minimum value - user cannot select below this (default: same as min) */
    constrainedMin?: number;
    /** Constrained maximum value - user cannot select above this (default: same as max) */
    constrainedMax?: number;
    /** Whether to allow multiple values (default: false) */
    multiple?: boolean;
    /** Maximum number of values when multiple is true (default: unlimited) */
    maxValues?: number;
    /** Whether the slider is disabled (default: false) */
    disabled?: boolean;
    /** Custom formatter for the displayed values */
    valueFormatter?: (value: number) => string;
    /** Whether to show value labels (default: true) */
    showLabels?: boolean;
    /** Whether to show tick marks (default: false) */
    showTicks?: boolean;
    /** Number of tick marks to show (default: 5) */
    tickCount?: number;
    /** Custom class name */
    className?: string;
    /** Whether to show tooltip on hover/drag (default: true) */
    showTooltip?: boolean;
    /** Orientation of the slider (default: 'horizontal') */
    orientation?: 'horizontal' | 'vertical';
    /** Height for vertical slider (default: 200px) */
    height?: string | number;
}

/**
 * Slider component with support for ranges and multiple values
 */
const Slider: React.FC<SliderProps> = ({
    value,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    constrainedMin = min,
    constrainedMax = max,
    multiple = false,
    maxValues,
    disabled = false,
    valueFormatter = (val) => val.toString(),
    showLabels = true,
    showTicks = false,
    tickCount = 5,
    className = '',
    showTooltip = true,
    orientation = 'horizontal',
    height = 200,
}) => {
    // Validate props
    if (constrainedMin < min) constrainedMin = min;
    if (constrainedMax > max) constrainedMax = max;
    if (constrainedMin > constrainedMax) constrainedMin = constrainedMax;

    // Reference to the track element
    const trackRef = useRef<HTMLDivElement>(null);

    // State for active thumb (the one being dragged)
    const [activeThumb, setActiveThumb] = useState<number | null>(null);

    // State for hover/tooltip
    const [hoveredValue, setHoveredValue] = useState<number | null>(null);

    // Normalize the value to an array for consistent handling
    const normalizedValue = Array.isArray(value) ? value : [value];

    // Calculate the percentage for a given value
    const getPercentage = useCallback((val: number): number => {
        // Clamp the value to the min/max range
        const clampedValue = Math.min(Math.max(val, min), max);
        return ((clampedValue - min) / (max - min)) * 100;
    }, [min, max]);

    // Calculate the value for a given percentage
    const getValueFromPercentage = useCallback((percentage: number): number => {
        // Calculate the raw value
        let rawValue = min + (percentage / 100) * (max - min);

        // Apply step constraints
        const steppedValue = Math.round(rawValue / step) * step;

        // Apply min/max constraints
        return Math.min(Math.max(steppedValue, min), max);
    }, [min, max, step]);

    // Handle track click
    const handleTrackClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || !trackRef.current) return;

        // Get track dimensions
        const rect = trackRef.current.getBoundingClientRect();

        // Calculate percentage based on orientation
        let percentage;
        if (orientation === 'horizontal') {
            percentage = ((e.clientX - rect.left) / rect.width) * 100;
        } else {
            percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
        }

        // Get the value from percentage
        let clickValue = getValueFromPercentage(percentage);

        // Apply constrained range
        clickValue = Math.min(Math.max(clickValue, constrainedMin), constrainedMax);

        // Handle different value types
        if (multiple) {
            // For multiple values, add a new value if under maxValues limit
            if (maxValues && normalizedValue.length >= maxValues) {
                // Replace the closest value
                const closestIndex = normalizedValue.reduce((closest, val, index) => {
                    const currentDiff = Math.abs(val - clickValue);
                    const closestDiff = Math.abs(normalizedValue[closest] - clickValue);
                    return currentDiff < closestDiff ? index : closest;
                }, 0);

                const newValues = [...normalizedValue];
                newValues[closestIndex] = clickValue;
                onChange(newValues);
            } else {
                // Add new value
                onChange([...normalizedValue, clickValue]);
            }
        } else if (normalizedValue.length === 2 && !multiple) {
            // For range slider, move the closest thumb
            const [minVal, maxVal] = normalizedValue;
            const minDiff = Math.abs(clickValue - minVal);
            const maxDiff = Math.abs(clickValue - maxVal);

            if (minDiff <= maxDiff) {
                onChange([clickValue, maxVal]);
            } else {
                onChange([minVal, clickValue]);
            }
        } else {
            // For single value slider
            onChange(clickValue);
        }
    }, [
        disabled,
        orientation,
        getValueFromPercentage,
        constrainedMin,
        constrainedMax,
        multiple,
        maxValues,
        normalizedValue,
        onChange
    ]);

    // Handle thumb mousedown
    const handleThumbMouseDown = useCallback((index: number) => (e: React.MouseEvent) => {
        if (disabled) return;

        // Prevent text selection during drag
        e.preventDefault();

        // Set the active thumb
        setActiveThumb(index);
    }, [disabled]);

    // Handle mouse move for dragging
    useEffect(() => {
        if (activeThumb === null || disabled || !trackRef.current) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (!trackRef.current) return;

            // Get track dimensions
            const rect = trackRef.current.getBoundingClientRect();

            // Calculate percentage based on orientation
            let percentage;
            if (orientation === 'horizontal') {
                percentage = ((e.clientX - rect.left) / rect.width) * 100;
            } else {
                percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
            }

            // Clamp percentage to 0-100
            percentage = Math.min(Math.max(percentage, 0), 100);

            // Get the value from percentage
            let newValue = getValueFromPercentage(percentage);

            // Apply constrained range
            newValue = Math.min(Math.max(newValue, constrainedMin), constrainedMax);

            // Update the value based on the active thumb
            const newValues = [...normalizedValue];

            if (normalizedValue.length === 2 && !multiple) {
                // For range slider, ensure min <= max
                if (activeThumb === 0) {
                    newValues[0] = Math.min(newValue, normalizedValue[1]);
                } else {
                    newValues[1] = Math.max(newValue, normalizedValue[0]);
                }
            } else {
                newValues[activeThumb] = newValue;
            }

            // Update the value
            if (multiple) {
                onChange(newValues);
            } else if (normalizedValue.length === 2 && !multiple) {
                onChange([newValues[0], newValues[1]]);
            } else {
                onChange(newValues[0]);
            }

            // Update hover value for tooltip
            setHoveredValue(newValue);
        };

        const handleMouseUp = () => {
            setActiveThumb(null);
            setHoveredValue(null);
        };

        // Add event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // Clean up
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [
        activeThumb,
        disabled,
        orientation,
        getValueFromPercentage,
        constrainedMin,
        constrainedMax,
        normalizedValue,
        multiple,
        onChange
    ]);

    // Handle track hover for tooltip
    const handleTrackHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled || !trackRef.current || !showTooltip) return;

        // Get track dimensions
        const rect = trackRef.current.getBoundingClientRect();

        // Calculate percentage based on orientation
        let percentage;
        if (orientation === 'horizontal') {
            percentage = ((e.clientX - rect.left) / rect.width) * 100;
        } else {
            percentage = ((rect.bottom - e.clientY) / rect.height) * 100;
        }

        // Get the value from percentage
        const hoverValue = getValueFromPercentage(percentage);

        // Update hover value
        setHoveredValue(hoverValue);
    }, [disabled, orientation, getValueFromPercentage, showTooltip]);

    // Handle track mouse leave
    const handleTrackMouseLeave = useCallback(() => {
        if (activeThumb === null) {
            setHoveredValue(null);
        }
    }, [activeThumb]);

    // Generate tick marks
    const ticks = showTicks ? Array.from({ length: tickCount }, (_, i) => {
        const tickValue = min + (i / (tickCount - 1)) * (max - min);
        const percentage = getPercentage(tickValue);
        return { value: tickValue, percentage };
    }) : [];

    // Determine if a value is within the constrained range
    const isValueConstrained = (val: number) => {
        return val >= constrainedMin && val <= constrainedMax;
    };

    // Generate CSS variables for positioning
    const cssVars = {
        '--slider-min': `${getPercentage(min)}%`,
        '--slider-max': `${getPercentage(max)}%`,
        '--slider-constrained-min': `${getPercentage(constrainedMin)}%`,
        '--slider-constrained-max': `${getPercentage(constrainedMax)}%`,
        '--slider-height': typeof height === 'number' ? `${height}px` : height,
    } as React.CSSProperties;

    // Add value positions to CSS variables
    normalizedValue.forEach((val, index) => {
        cssVars[`--slider-value-${index}`] = `${getPercentage(val)}%`;
    });

    // Add hover position to CSS variables
    if (hoveredValue !== null) {
        cssVars['--slider-hover'] = `${getPercentage(hoveredValue)}%`;
    }

    return (
        <div
            className={`slider ${orientation} ${disabled ? 'disabled' : ''} ${className}`}
            style={cssVars}
        >
            {showLabels && (
                <div className="slider-labels">
                    <span className="slider-label slider-label-min">{valueFormatter(min)}</span>
                    <span className="slider-label slider-label-max">{valueFormatter(max)}</span>
                </div>
            )}

            <div
                className="slider-track"
                ref={trackRef}
                onClick={handleTrackClick}
                onMouseMove={handleTrackHover}
                onMouseLeave={handleTrackMouseLeave}
            >
                {/* Constrained range indicators */}
                <div className="slider-track-constrained-min"></div>
                <div className="slider-track-constrained-max"></div>

                {/* Active range for range slider */}
                {normalizedValue.length === 2 && !multiple && (
                    <div className="slider-track-active"></div>
                )}

                {/* Tick marks */}
                {showTicks && ticks.map((tick, index) => (
                    <div
                        key={`tick-${index}`}
                        className={`slider-tick ${isValueConstrained(tick.value) ? 'enabled' : 'disabled'}`}
                        style={{
                            [orientation === 'horizontal' ? 'left' : 'bottom']: `${tick.percentage}%`
                        }}
                    />
                ))}

                {/* Thumbs */}
                {normalizedValue.map((val, index) => (
                    <div
                        key={`thumb-${index}`}
                        className={`slider-thumb ${activeThumb === index ? 'active' : ''} ${isValueConstrained(val) ? 'enabled' : 'disabled'}`}
                        style={{
                            [orientation === 'horizontal' ? 'left' : 'bottom']: `${getPercentage(val)}%`
                        }}
                        onMouseDown={handleThumbMouseDown(index)}
                    >
                        {showTooltip && (hoveredValue !== null || activeThumb === index) && activeThumb === index && (
                            <div className="slider-tooltip">
                                {valueFormatter(val)}
                            </div>
                        )}
                    </div>
                ))}

                {/* Hover tooltip */}
                {showTooltip && hoveredValue !== null && activeThumb === null && (
                    <div
                        className="slider-hover-tooltip"
                        style={{
                            [orientation === 'horizontal' ? 'left' : 'bottom']: `${getPercentage(hoveredValue)}%`
                        }}
                    >
                        {valueFormatter(hoveredValue)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Slider; 