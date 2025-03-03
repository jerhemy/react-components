import React, { useState } from 'react';
import GlobalSearch from './GlobalSearch';
import './GlobalSearchDemo.css';

interface Person {
    name: string;
    age: number;
    joinDate: string;
    department: string;
    email?: string;
    skills?: string[];
    location?: string;
}

const GlobalSearchDemo: React.FC = () => {
    // Sample data for the demo
    const [people, setPeople] = useState<Person[]>([
        { name: 'John Doe', age: 30, joinDate: '2021-01-15', department: 'Engineering', email: 'john.doe@example.com', skills: ['JavaScript', 'React', 'Node.js'], location: 'New York' },
        { name: 'Jane Smith', age: 25, joinDate: '2020-06-23', department: 'Marketing', email: 'jane.smith@example.com', skills: ['Content Writing', 'SEO', 'Social Media'], location: 'San Francisco' },
        { name: 'Alice Johnson', age: 35, joinDate: '2019-11-02', department: 'Sales', email: 'alice.johnson@example.com', skills: ['Negotiation', 'CRM', 'Presentation'], location: 'Chicago' },
        { name: 'Bob Brown', age: 28, joinDate: '2022-03-14', department: 'Engineering', email: 'bob.brown@example.com', skills: ['Python', 'Django', 'AWS'], location: 'Seattle' },
        { name: 'Charlie Black', age: 40, joinDate: '2018-07-19', department: 'HR', email: 'charlie.black@example.com', skills: ['Recruitment', 'Training', 'Conflict Resolution'], location: 'Boston' },
        { name: 'Diana White', age: 32, joinDate: '2020-09-05', department: 'Marketing', email: 'diana.white@example.com', skills: ['Graphic Design', 'Branding', 'Analytics'], location: 'Los Angeles' },
        { name: 'Edward Green', age: 45, joinDate: '2017-04-30', department: 'Finance', email: 'edward.green@example.com', skills: ['Accounting', 'Budgeting', 'Financial Analysis'], location: 'Miami' },
        { name: 'Fiona Blue', age: 29, joinDate: '2021-08-12', department: 'Engineering', email: 'fiona.blue@example.com', skills: ['Java', 'Spring', 'Microservices'], location: 'Austin' },
        { name: 'George Gray', age: 38, joinDate: '2019-02-28', department: 'Sales', email: 'george.gray@example.com', skills: ['B2B Sales', 'Account Management', 'Lead Generation'], location: 'Denver' },
        { name: 'Hannah Red', age: 27, joinDate: '2022-01-10', department: 'Design', email: 'hannah.red@example.com', skills: ['UI/UX', 'Figma', 'Prototyping'], location: 'Portland' }
    ]);

    // State for search property and category property
    const [searchProperty, setSearchProperty] = useState<keyof Person>('name');
    const [categoryProperty, setCategoryProperty] = useState<keyof Person>('department');

    // Available properties for search and categorization
    const availableProperties: Array<{ label: string; value: keyof Person }> = [
        { label: 'Name', value: 'name' },
        { label: 'Department', value: 'department' },
        { label: 'Email', value: 'email' },
        { label: 'Location', value: 'location' }
    ];

    // Handle search property change
    const handleSearchPropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchProperty(e.target.value as keyof Person);
    };

    // Handle category property change
    const handleCategoryPropertyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategoryProperty(e.target.value as keyof Person);
    };

    // Selected person state for displaying details
    const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

    // Mock function to simulate selection (in a real app, this would be connected to the GlobalSearch)
    const handlePersonSelect = (person: Person) => {
        setSelectedPerson(person);
    };

    return (
        <div className="global-search-demo">
            <h2>Global Search Demo</h2>

            <div className="demo-controls">
                <div className="control-group">
                    <label htmlFor="search-property">Search Property:</label>
                    <select
                        id="search-property"
                        value={searchProperty}
                        onChange={handleSearchPropertyChange}
                        className="property-select"
                    >
                        {availableProperties.map((prop) => (
                            <option key={prop.value} value={prop.value}>{prop.label}</option>
                        ))}
                    </select>
                </div>

                <div className="control-group">
                    <label htmlFor="category-property">Category Property:</label>
                    <select
                        id="category-property"
                        value={categoryProperty}
                        onChange={handleCategoryPropertyChange}
                        className="property-select"
                    >
                        {availableProperties.map((prop) => (
                            <option key={prop.value} value={prop.value}>{prop.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="search-container">
                <GlobalSearch
                    data={people}
                    searchProperty={searchProperty}
                    categoryProperty={categoryProperty}
                />
            </div>

            <div className="demo-info">
                <h3>How to Use</h3>
                <p>
                    Type in the search box to find people based on the selected search property.
                    Results will be grouped by the selected category property.
                </p>
                <p>
                    Use the arrow keys to navigate through results and press Enter to select an item.
                </p>

                <h3>Sample Data</h3>
                <div className="data-table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Age</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {people.map((person, index) => (
                                <tr key={index} onClick={() => handlePersonSelect(person)}>
                                    <td>{person.name}</td>
                                    <td>{person.department}</td>
                                    <td>{person.age}</td>
                                    <td>{person.location}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default GlobalSearchDemo; 