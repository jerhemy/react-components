import './CheckboxDemo.css';

import React, { useState } from 'react';

import Checkbox from '../components/Checkbox/Checkbox';

const CheckboxDemo: React.FC = () => {
    const [checked1, setChecked1] = useState(false);
    const [checked2, setChecked2] = useState(true);
    const [checked3, setChecked3] = useState(false);
    const [parentChecked, setParentChecked] = useState(false);
    const [childChecked, setChildChecked] = useState([false, false, false]);

    // Handle parent checkbox change
    const handleParentChange = () => {
        const newParentState = !parentChecked;
        setParentChecked(newParentState);
        setChildChecked(childChecked.map(() => newParentState));
    };

    // Handle child checkbox change
    const handleChildChange = (index: number) => {
        const newChildChecked = [...childChecked];
        newChildChecked[index] = !newChildChecked[index];
        setChildChecked(newChildChecked);

        // Update parent state based on children
        const allChecked = newChildChecked.every(state => state);
        const someChecked = newChildChecked.some(state => state);
        setParentChecked(allChecked);
        setParentIndeterminate(someChecked && !allChecked);
    };

    const [parentIndeterminate, setParentIndeterminate] = useState(false);

    return (
        <div className="checkbox-demo">
            <h2>Checkbox Component</h2>

            <div className="demo-info">
                <h3>Overview</h3>
                <p>
                    The Checkbox component provides a customizable checkbox input with support for
                    different sizes, states, and an indeterminate state. It can be used for single
                    selections or as part of a group.
                </p>
            </div>

            <div className="demo-variation">
                <h3>Basic Checkboxes</h3>
                <p>Individual checkboxes with different states.</p>

                <div className="demo-preview">
                    <div className="checkbox-stack">
                        <Checkbox
                            label="Default Checkbox"
                            checked={checked1}
                            onChange={(e) => setChecked1(e.target.checked)}
                        />
                        <Checkbox
                            label="Checked Checkbox"
                            checked={checked2}
                            onChange={(e) => setChecked2(e.target.checked)}
                        />
                        <Checkbox
                            label="Disabled Checkbox"
                            disabled
                            checked={false}
                        />
                        <Checkbox
                            label="Error Checkbox"
                            error
                            checked={checked3}
                            onChange={(e) => setChecked3(e.target.checked)}
                        />
                    </div>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<Checkbox
  label="Default Checkbox"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<Checkbox
  label="Disabled Checkbox"
  disabled
  checked={false}
/>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>Checkbox Sizes</h3>
                <p>Checkboxes are available in three sizes.</p>

                <div className="demo-preview">
                    <div className="checkbox-stack">
                        <Checkbox
                            label="Small Checkbox"
                            size="sm"
                            checked={checked1}
                            onChange={(e) => setChecked1(e.target.checked)}
                        />
                        <Checkbox
                            label="Medium Checkbox"
                            size="md"
                            checked={checked1}
                            onChange={(e) => setChecked1(e.target.checked)}
                        />
                        <Checkbox
                            label="Large Checkbox"
                            size="lg"
                            checked={checked1}
                            onChange={(e) => setChecked1(e.target.checked)}
                        />
                    </div>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<Checkbox
  label="Small Checkbox"
  size="sm"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>

<Checkbox
  label="Large Checkbox"
  size="lg"
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>Indeterminate State</h3>
                <p>Checkbox with indeterminate state for parent-child relationships.</p>

                <div className="demo-preview">
                    <div className="checkbox-stack">
                        <Checkbox
                            label="Parent Checkbox"
                            checked={parentChecked}
                            indeterminate={parentIndeterminate}
                            onChange={handleParentChange}
                        />
                        <div className="checkbox-children">
                            {childChecked.map((checked, index) => (
                                <Checkbox
                                    key={index}
                                    label={`Child Checkbox ${index + 1}`}
                                    checked={checked}
                                    onChange={() => handleChildChange(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<Checkbox
  label="Parent Checkbox"
  checked={parentChecked}
  indeterminate={parentIndeterminate}
  onChange={handleParentChange}
/>
<div className="checkbox-children">
  <Checkbox
    label="Child Checkbox 1"
    checked={childChecked[0]}
    onChange={() => handleChildChange(0)}
  />
  {/* More child checkboxes */}
</div>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>API Reference</h3>
                <div className="api-table">
                    <h4>Checkbox Props</h4>
                    <table>
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
                                <td>label</td>
                                <td>ReactNode</td>
                                <td>undefined</td>
                                <td>The label to display next to the checkbox</td>
                            </tr>
                            <tr>
                                <td>checked</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether the checkbox is checked</td>
                            </tr>
                            <tr>
                                <td>indeterminate</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether the checkbox is in an indeterminate state</td>
                            </tr>
                            <tr>
                                <td>error</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether to show the error state</td>
                            </tr>
                            <tr>
                                <td>size</td>
                                <td>'sm' | 'md' | 'lg'</td>
                                <td>'md'</td>
                                <td>The size of the checkbox</td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether the checkbox is disabled</td>
                            </tr>
                            <tr>
                                <td>onChange</td>
                                <td>(e: ChangeEvent) => void</td>
                                <td>undefined</td>
                                <td>Callback when the checkbox state changes</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CheckboxDemo; 