import './RadioDemo.css';

import React, { useState } from 'react';

import Radio from '../components/Radio/Radio';
import RadioGroup from '../components/Radio/RadioGroup';

const RadioDemo: React.FC = () => {
    const [selectedValue1, setSelectedValue1] = useState('');
    const [selectedValue2, setSelectedValue2] = useState('');
    const [selectedValue3, setSelectedValue3] = useState('');
    const [selectedValue4, setSelectedValue4] = useState('');

    return (
        <div className="radio-demo">
            <h2>Radio Component</h2>

            <div className="demo-info">
                <h3>Overview</h3>
                <p>
                    The Radio component provides a customizable radio button input with support for
                    different sizes, states, and grouping options. It can be used independently or
                    as part of a RadioGroup for managing related options.
                </p>
            </div>

            <div className="demo-variation">
                <h3>Basic Radio Buttons</h3>
                <p>Individual radio buttons with different states.</p>

                <div className="demo-preview">
                    <div className="radio-stack">
                        <Radio
                            label="Default Radio"
                            value="default"
                            checked={selectedValue1 === 'default'}
                            onChange={(e) => setSelectedValue1(e.target.value)}
                            name="demo1"
                        />
                        <Radio
                            label="Checked Radio"
                            value="checked"
                            checked={true}
                            onChange={() => { }}
                            name="demo1-checked"
                        />
                        <Radio
                            label="Disabled Radio"
                            value="disabled"
                            disabled
                            name="demo1-disabled"
                        />
                        <Radio
                            label="Error Radio"
                            value="error"
                            error
                            name="demo1-error"
                        />
                    </div>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<Radio
  label="Default Radio"
  value="default"
  checked={selectedValue === 'default'}
  onChange={(e) => setSelectedValue(e.target.value)}
  name="demo1"
/>

<Radio
  label="Disabled Radio"
  value="disabled"
  disabled
  name="demo1-disabled"
/>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>Radio Group - Vertical</h3>
                <p>A group of related radio buttons arranged vertically.</p>

                <div className="demo-preview">
                    <RadioGroup
                        name="demo2"
                        value={selectedValue2}
                        onChange={setSelectedValue2}
                    >
                        <Radio label="Option 1" value="1" />
                        <Radio label="Option 2" value="2" />
                        <Radio label="Option 3" value="3" />
                        <Radio label="Disabled Option" value="4" disabled />
                    </RadioGroup>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<RadioGroup
  name="demo2"
  value={selectedValue}
  onChange={setSelectedValue}
>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
  <Radio label="Option 3" value="3" />
  <Radio label="Disabled Option" value="4" disabled />
</RadioGroup>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>Radio Group - Horizontal</h3>
                <p>A group of related radio buttons arranged horizontally.</p>

                <div className="demo-preview">
                    <RadioGroup
                        name="demo3"
                        value={selectedValue3}
                        onChange={setSelectedValue3}
                        orientation="horizontal"
                    >
                        <Radio label="Small" value="sm" size="sm" />
                        <Radio label="Medium" value="md" size="md" />
                        <Radio label="Large" value="lg" size="lg" />
                    </RadioGroup>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<RadioGroup
  name="demo3"
  value={selectedValue}
  onChange={setSelectedValue}
  orientation="horizontal"
>
  <Radio label="Small" value="sm" size="sm" />
  <Radio label="Medium" value="md" size="md" />
  <Radio label="Large" value="lg" size="lg" />
</RadioGroup>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>Radio Group with Error</h3>
                <p>A radio group showing error state.</p>

                <div className="demo-preview">
                    <RadioGroup
                        name="demo4"
                        value={selectedValue4}
                        onChange={setSelectedValue4}
                        error={true}
                    >
                        <Radio label="Option 1" value="1" />
                        <Radio label="Option 2" value="2" />
                        <Radio label="Option 3" value="3" />
                    </RadioGroup>
                </div>

                <div className="demo-code">
                    <h4>Code Example</h4>
                    <pre>
                        <code>{`<RadioGroup
  name="demo4"
  value={selectedValue}
  onChange={setSelectedValue}
  error={true}
>
  <Radio label="Option 1" value="1" />
  <Radio label="Option 2" value="2" />
  <Radio label="Option 3" value="3" />
</RadioGroup>`}</code>
                    </pre>
                </div>
            </div>

            <div className="demo-variation">
                <h3>API Reference</h3>
                <div className="api-table">
                    <h4>Radio Props</h4>
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
                                <td>The label to display next to the radio button</td>
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
                                <td>The size of the radio button</td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether the radio button is disabled</td>
                            </tr>
                        </tbody>
                    </table>

                    <h4>RadioGroup Props</h4>
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
                                <td>name</td>
                                <td>string</td>
                                <td>required</td>
                                <td>The name attribute for the radio group</td>
                            </tr>
                            <tr>
                                <td>value</td>
                                <td>string</td>
                                <td>required</td>
                                <td>The currently selected value</td>
                            </tr>
                            <tr>
                                <td>onChange</td>
                                <td>(value: string) => void</td>
                                <td>required</td>
                                <td>Callback when selection changes</td>
                            </tr>
                            <tr>
                                <td>orientation</td>
                                <td>'horizontal' | 'vertical'</td>
                                <td>'vertical'</td>
                                <td>The layout orientation of the radio buttons</td>
                            </tr>
                            <tr>
                                <td>error</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether to show the error state</td>
                            </tr>
                            <tr>
                                <td>disabled</td>
                                <td>boolean</td>
                                <td>false</td>
                                <td>Whether the entire group is disabled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RadioDemo; 