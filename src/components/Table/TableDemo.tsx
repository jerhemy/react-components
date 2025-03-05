import './Table.css';

import React, { useState } from 'react';
import Table, { Column } from './Table';

import CodeBlock from '../CodeBlock/CodeBlock';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    status: 'active' | 'inactive';
    joinDate: string;
}

const TableDemo: React.FC = () => {
    const [loading, setLoading] = useState(false);

    // Sample data
    const users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john@example.com',
            role: 'Admin',
            status: 'active',
            joinDate: '2023-01-15'
        },
        {
            id: 2,
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'User',
            status: 'active',
            joinDate: '2023-02-20'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            email: 'bob@example.com',
            role: 'Editor',
            status: 'inactive',
            joinDate: '2023-03-10'
        },
        {
            id: 4,
            name: 'Alice Brown',
            email: 'alice@example.com',
            role: 'User',
            status: 'active',
            joinDate: '2023-04-05'
        },
        {
            id: 5,
            name: 'Charlie Wilson',
            email: 'charlie@example.com',
            role: 'Editor',
            status: 'active',
            joinDate: '2023-05-12'
        }
    ];

    // Define columns
    const columns: Column<User>[] = [
        {
            key: 'name',
            header: 'Name',
            sortable: true
        },
        {
            key: 'email',
            header: 'Email',
            sortable: true
        },
        {
            key: 'role',
            header: 'Role',
            sortable: true
        },
        {
            key: 'status',
            header: 'Status',
            sortable: true,
            render: (value: string) => (
                <span
                    style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: value === 'active' ? '#C6F6D5' : '#FED7D7',
                        color: value === 'active' ? '#22543D' : '#822727'
                    }}
                >
                    {value}
                </span>
            )
        },
        {
            key: 'joinDate',
            header: 'Join Date',
            sortable: true,
            render: (value: string) => new Date(value).toLocaleDateString()
        }
    ];

    // Handle row click
    const handleRowClick = (row: User) => {
        console.log('Clicked row:', row);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h2 style={{ marginBottom: '1rem' }}>Users Table</h2>
            <Table
                data={users}
                columns={columns}
                pageSize={3}
                loading={loading}
                onRowClick={handleRowClick}
                hoverable
                striped
            />

            <div style={{ marginTop: '2rem' }}>
                <button
                    onClick={() => setLoading(prev => !prev)}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#3182ce',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.375rem',
                        cursor: 'pointer'
                    }}
                >
                    Toggle Loading State
                </button>
            </div>
        </div>
    );
};

export default TableDemo;