
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
            if (!dateString) return '';
            // If it's just a date string like "2026-01-06", keep it
            if (dateString.length === 10) return dateString;
            return new Date(dateString).toLocaleDateString();
        } catch (e) {
            return dateString;
        }
    };

    const getStatusColor = (status) => {
        switch (String(status).toLowerCase()) {
            case 'completed': return 'var(--success-color)';
            case 'pending': return 'orange';
            case 'rejected': return 'var(--danger-color)';
            case 'approved': return 'var(--success-color)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="table-container" style={{ overflowX: 'auto' }}>
            <table className="data-table" style={{ minWidth: '1500px' }}>
                <thead>
                    <tr>
                        <th style={{ width: '60px' }}>ID</th>
                        <th>Date</th>
                        <th>User</th>
                        <th>Session</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Dur (m)</th>
                        <th style={{ width: '200px' }}>Description</th>
                        <th>Status</th>
                        <th>Project</th>
                        <th>Category</th>
                        <th>Approval</th>
                        <th>By</th>
                        <th style={{ position: 'sticky', right: 0, background: 'var(--card-bg)', boxShadow: '-5px 0 10px -5px rgba(0,0,0,0.5)' }}>Actions</th>
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
                            <td>{record.sessionNo}</td>
                            <td>{record.startTime}</td>
                            <td>{record.endTime}</td>
                            <td>{record.duration}</td>
                            <td title={record.workDescription}>
                                <div style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    {record.workDescription}
                                </div>
                            </td>
                            <td>
                                <span style={{ color: getStatusColor(record.status) }}>
                                    {record.status}
                                </span>
                            </td>
                            <td>{record.project}</td>
                            <td>{record.category}</td>
                            <td>
                                <span style={{
                                    padding: '0.2rem 0.5rem',
                                    borderRadius: '4px',
                                    fontSize: '0.75rem',
                                    backgroundColor: String(record.approvedState).toLowerCase() === 'approved' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                                    color: getStatusColor(record.approvedState)
                                }}>
                                    {record.approvedState}
                                </span>
                            </td>
                            <td>{record.approvedBy}</td>
                            <td style={{ position: 'sticky', right: 0, background: 'var(--card-bg)', boxShadow: '-5px 0 10px -5px rgba(0,0,0,0.5)' }}>
                                <div className="action-buttons">
                                    <button
                                        onClick={() => onEdit(record)}
                                        className="btn btn-secondary"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(record.recordId)}
                                        className="btn btn-danger"
                                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.75rem' }}
                                    >
                                        Del
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
