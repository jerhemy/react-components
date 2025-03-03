import React, { useState, useCallback, useEffect } from 'react';
import JsonTreeViewer from './JsonTreeViewer';
import './JsonTreeViewerDemo.css';

const JsonTreeViewerDemo: React.FC = () => {
    // Sample JSON data
    const initialData = {
        name: "Product Catalog",
        version: 2.1,
        lastUpdated: "2023-05-15",
        isActive: true,
        categories: [
            {
                id: 1,
                name: "Electronics",
                products: [
                    {
                        id: 101,
                        name: "Smartphone",
                        price: 699.99,
                        inStock: true,
                        specs: {
                            display: "6.5 inch OLED",
                            processor: "Octa-core",
                            camera: "48MP",
                            battery: "4500mAh"
                        }
                    },
                    {
                        id: 102,
                        name: "Laptop",
                        price: 1299.99,
                        inStock: false,
                        specs: {
                            display: "15.6 inch IPS",
                            processor: "Quad-core",
                            memory: "16GB RAM",
                            storage: "512GB SSD"
                        }
                    }
                ]
            },
            {
                id: 2,
                name: "Clothing",
                products: [
                    {
                        id: 201,
                        name: "T-Shirt",
                        price: 19.99,
                        inStock: true,
                        variants: ["S", "M", "L", "XL"]
                    }
                ]
            }
        ],
        metadata: {
            tags: ["retail", "products", "inventory"],
            settings: {
                caching: true,
                expiry: null
            }
        }
    };

    // State for the JSON data
    const [jsonData, setJsonData] = useState(initialData);

    // State for the JSON string in the editor
    const [jsonString, setJsonString] = useState(JSON.stringify(initialData, null, 2));

    // State for error message
    const [error, setError] = useState<string | null>(null);

    // State for expanded depth
    const [expandedDepth, setExpandedDepth] = useState(1);

    // Update JSON data when the string changes
    const handleJsonChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newJsonString = e.target.value;
        setJsonString(newJsonString);

        try {
            const newData = JSON.parse(newJsonString);
            setJsonData(newData);
            setError(null);
        } catch (err) {
            setError("Invalid JSON: " + (err as Error).message);
        }
    }, []);

    // Handle depth change
    const handleDepthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const depth = parseInt(e.target.value);
        setExpandedDepth(depth);
    }, []);

    // Reset to initial data
    const handleReset = useCallback(() => {
        setJsonData(initialData);
        setJsonString(JSON.stringify(initialData, null, 2));
        setError(null);
    }, []);

    // Simulate random data updates
    const simulateRandomUpdate = useCallback(() => {
        // Create a deep copy of the current data
        const newData = JSON.parse(JSON.stringify(jsonData));

        // Make some random changes
        if (newData.categories && newData.categories.length > 0) {
            // Update a product price
            const categoryIndex = Math.floor(Math.random() * newData.categories.length);
            const category = newData.categories[categoryIndex];

            if (category.products && category.products.length > 0) {
                const productIndex = Math.floor(Math.random() * category.products.length);
                const product = category.products[productIndex];

                // Update price with a random adjustment
                product.price = +(product.price + (Math.random() * 10 - 5)).toFixed(2);

                // Toggle in-stock status occasionally
                if (Math.random() > 0.7) {
                    product.inStock = !product.inStock;
                }
            }
        }

        // Update version
        newData.version = +(newData.version + 0.1).toFixed(1);

        // Update last updated date
        newData.lastUpdated = new Date().toISOString().split('T')[0];

        setJsonData(newData);
        setJsonString(JSON.stringify(newData, null, 2));
    }, [jsonData]);

    // Update specific properties to demonstrate flash animation
    const updateSpecificProperties = useCallback(() => {
        // Create a deep copy of the current data
        const newData = JSON.parse(JSON.stringify(jsonData));

        // Update specific properties that will be visible in the UI
        // 1. Update version number
        newData.version = +(newData.version + 0.1).toFixed(1);

        // 2. Update last updated date
        newData.lastUpdated = new Date().toISOString().split('T')[0];

        // 3. Update smartphone price
        if (newData.categories && newData.categories[0] && newData.categories[0].products) {
            const smartphone = newData.categories[0].products.find((p: any) => p.id === 101);
            if (smartphone) {
                smartphone.price = +(smartphone.price + 10).toFixed(2);
            }
        }

        // 4. Update t-shirt price
        if (newData.categories && newData.categories[1] && newData.categories[1].products) {
            const tshirt = newData.categories[1].products.find((p: any) => p.id === 201);
            if (tshirt) {
                tshirt.price = +(tshirt.price + 2).toFixed(2);
            }
        }

        // 5. Add a new tag to metadata
        if (newData.metadata && newData.metadata.tags) {
            const tags = [...newData.metadata.tags];
            const newTag = `tag-${Math.floor(Math.random() * 1000)}`;
            tags.push(newTag);
            newData.metadata.tags = tags;
        }

        setJsonData(newData);
        setJsonString(JSON.stringify(newData, null, 2));
    }, [jsonData]);

    // Format the JSON string
    const formatJson = useCallback(() => {
        try {
            const parsed = JSON.parse(jsonString);
            const formatted = JSON.stringify(parsed, null, 2);
            setJsonString(formatted);
            setError(null);
        } catch (err) {
            setError("Cannot format invalid JSON: " + (err as Error).message);
        }
    }, [jsonString]);

    return (
        <div className="json-tree-viewer-demo">
            <h2>JSON Tree Viewer Demo</h2>

            <div className="demo-controls">
                <div className="control-group">
                    <label htmlFor="expanded-depth">Initial Expanded Depth:</label>
                    <input
                        id="expanded-depth"
                        type="range"
                        min="0"
                        max="10"
                        value={expandedDepth}
                        onChange={handleDepthChange}
                        className="depth-slider"
                    />
                    <span className="depth-value">{expandedDepth}</span>
                </div>

                <div className="button-group">
                    <button onClick={updateSpecificProperties} className="update-button highlight-button">
                        Update Properties (Flash)
                    </button>
                    <button onClick={simulateRandomUpdate} className="update-button">
                        Random Update
                    </button>
                    <button onClick={formatJson} className="format-button">
                        Format JSON
                    </button>
                    <button onClick={handleReset} className="reset-button">
                        Reset
                    </button>
                </div>
            </div>

            <div className="viewer-container">
                <div className="json-editor-container">
                    <h3>JSON Editor</h3>
                    <textarea
                        value={jsonString}
                        onChange={handleJsonChange}
                        className={`json-editor ${error ? 'has-error' : ''}`}
                        spellCheck="false"
                    />
                    {error && <div className="error-message">{error}</div>}
                </div>

                <div className="tree-viewer-container">
                    <h3>Tree View</h3>
                    <JsonTreeViewer
                        data={jsonData}
                        initialExpandedDepth={expandedDepth}
                    />
                </div>
            </div>

            <div className="demo-info">
                <h3>How to Use</h3>
                <ul>
                    <li>Edit the JSON in the editor to see real-time updates in the tree view</li>
                    <li>Click on objects and arrays to expand/collapse them</li>
                    <li>Use the depth slider to control the initial expansion level</li>
                    <li><strong>Click "Update Properties (Flash)" to see specific properties flash when updated</strong></li>
                    <li>Click "Random Update" to make random changes to the data</li>
                    <li>Click "Format JSON" to prettify the JSON in the editor</li>
                    <li>Click "Reset" to restore the initial sample data</li>
                </ul>

                <h3>Performance Features</h3>
                <ul>
                    <li>Uses React.memo to prevent unnecessary re-renders</li>
                    <li>Each node in the tree is memoized and only updates when its data changes</li>
                    <li>Expansion state is preserved during updates</li>
                    <li>Efficient key generation ensures proper reconciliation</li>
                    <li><strong>Visual flash animation highlights properties that have been updated</strong></li>
                </ul>
            </div>
        </div>
    );
};

export default JsonTreeViewerDemo; 