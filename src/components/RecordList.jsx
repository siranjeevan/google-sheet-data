
import React from 'react';
import '../styles/CrudModule.css';

const RecordList = ({ records, onEdit, onDelete }) => {
    if (!records || records.length === 0) {
        return (
            <div className="table-container" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No records found.
            </div>
        );
    }

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString();
        } catch (e) {
            return dateString;
        }
    };

    return (
        <div className="table-container">
            <table className="data-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>User Name</th>
                        <th>Session</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr key={record.recordId || Math.random()}>
                            <td>{record.recordId}</td>
                            <td>{formatDate(record.date)}</td>
                            <td>
                                <span style={{ fontWeight: 500, color: 'white' }}>
                                    {record.userName}
                                </span>
                            </td>
                            <td>
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                    color: '#818cf8',
                                    fontSize: '0.85rem'
                                }}>
                                    Session {record.sessionNo}
                                </span>
                            </td>
                            <td>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => onEdit(record)}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(record.recordId)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.5rem', fontSize: '0.875rem' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecordList;
