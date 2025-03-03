import './JsonTreeViewer.css';

import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// Types for our component
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

interface JsonTreeViewerProps {
    data: JsonValue;
    initialExpandedDepth?: number;
    name?: string;
    isRoot?: boolean;
}

interface JsonNodeProps {
    name: string | number | null;
    value: JsonValue;
    depth: number;
    initialExpandedDepth: number;
    path: string;
}

// Memoized JsonNode component to prevent unnecessary re-renders
const JsonNode = memo(({ name, value, depth, initialExpandedDepth, path }: JsonNodeProps) => {
    // State to track if this node is expanded
    const [isExpanded, setIsExpanded] = useState(depth < initialExpandedDepth);

    // Ref to store previous value for comparison
    const prevValueRef = useRef<JsonValue>(value);

    // State to track if this node should flash
    const [shouldFlash, setShouldFlash] = useState(false);

    // Ref to store animation timer
    const timerRef = useRef<number | null>(null);

    // Determine the type of the value
    const valueType = Array.isArray(value) ? 'array' : typeof value;

    // Format the display value based on type
    const getDisplayValue = useCallback((val: JsonValue): string => {
        if (val === null) return 'null';
        if (typeof val === 'string') return `"${val}"`;
        return String(val);
    }, []);

    // Toggle expansion state
    const toggleExpand = useCallback(() => {
        setIsExpanded(prev => !prev);
    }, []);

    // Determine if the value is expandable (object or array)
    const isExpandable = valueType === 'object' || valueType === 'array';

    // Count children for objects and arrays
    const childCount = useMemo(() => {
        if (!isExpandable || value === null) return 0;
        return Object.keys(value).length;
    }, [isExpandable, value]);

    // Check if value has changed and trigger flash animation
    useEffect(() => {
        // Skip for expandable values (objects/arrays) - we'll flash their children instead
        if (isExpandable) {
            prevValueRef.current = value;
            return;
        }

        // Check if the value has changed
        const hasChanged = JSON.stringify(prevValueRef.current) !== JSON.stringify(value);

        if (hasChanged) {
            // Clear any existing timer
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }

            // Force animation restart by removing the class first
            setShouldFlash(false);

            // Use requestAnimationFrame to ensure the DOM has time to update
            // before we add the class back
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Now add the class back to trigger the animation
                    setShouldFlash(true);

                    // Set timer to remove the class after animation completes
                    timerRef.current = window.setTimeout(() => {
                        setShouldFlash(false);
                        timerRef.current = null;
                    }, 1000); // Match this with CSS animation duration
                });
            });

            // Update ref with current value
            prevValueRef.current = value;
        }
    }, [value, isExpandable]);

    // Clean up timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    // Render the node
    return (
        <div className="json-tree-node" data-path={path}>
            <div
                className={`json-tree-node-content ${isExpandable ? 'expandable' : ''}`}
                onClick={isExpandable ? toggleExpand : undefined}
            >
                {/* Node label with toggle indicator */}
                <span className="json-tree-toggle">
                    {isExpandable && (
                        <span className="json-tree-toggle-icon">
                            {isExpanded ? '▼' : '►'}
                        </span>
                    )}
                </span>

                {/* Node key/name */}
                {name !== null && (
                    <span className="json-tree-key">
                        {typeof name === 'number' ? `[${name}]` : name}:
                    </span>
                )}

                {/* Node value or summary */}
                {isExpandable ? (
                    <span className="json-tree-summary">
                        {Array.isArray(value) ? 'Array' : 'Object'}
                        <span className="json-tree-count">({childCount})</span>
                    </span>
                ) : (
                    <span className={`json-tree-value json-tree-value-${valueType} ${shouldFlash ? 'json-tree-value-flash' : ''}`}>
                        {getDisplayValue(value)}
                    </span>
                )}
            </div>

            {/* Render children if expanded */}
            {isExpanded && isExpandable && value !== null && (
                <div className="json-tree-children">
                    {Object.entries(value).map(([key, val]) => (
                        <JsonNode
                            key={`${path}.${key}`}
                            name={Array.isArray(value) ? parseInt(key) : key}
                            value={val}
                            depth={depth + 1}
                            initialExpandedDepth={initialExpandedDepth}
                            path={`${path}.${key}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

// Main JsonTreeViewer component
const JsonTreeViewer: React.FC<JsonTreeViewerProps> = ({
    data,
    initialExpandedDepth = 1,
    name = null,
    isRoot = true
}) => {
    // Generate a stable key for the root node
    const rootKey = useMemo(() => 'root', []);

    return (
        <div className="json-tree-viewer">
            <JsonNode
                name={name}
                value={data}
                depth={0}
                initialExpandedDepth={initialExpandedDepth}
                path={rootKey}
            />
        </div>
    );
};

export default JsonTreeViewer; 