
import React, { useState, useEffect } from 'react';
import { fetchData, createRecord, updateRecord, deleteRecord } from '../api';
import RecordList from './RecordList';
import RecordForm from './RecordForm';
import '../styles/CrudModule.css';

const CrudModule = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal State
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const result = await fetchData();
            const dataArray = Array.isArray(result) ? result : (result.data || []);
            setData(dataArray);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAddClick = () => {
        setEditingRecord(null);
        setIsFormOpen(true);
    };

    const handleEditClick = (record) => {
        setEditingRecord(record);
        setIsFormOpen(true);
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                setLoading(true);
                await deleteRecord(id);
                await loadData(); // Reload to sync
            } catch (err) {
                alert('Failed to delete: ' + err.message);
                setLoading(false);
            }
        }
    };

    const handleFormSubmit = async (record) => {
        try {
            setLoading(true);
            if (editingRecord) {
                await updateRecord(record);
            } else {
                await createRecord(record);
            }
            setIsFormOpen(false);
            // Wait a moment for GAS to update (sometimes it takes a second)
            setTimeout(async () => {
                await loadData();
            }, 1000);
        } catch (err) {
            alert('Failed to save: ' + err.message);
            setLoading(false);
        }
    };

    return (
        <div className="crud-container">
            <div className="crud-header">
                <h1 className="crud-title">Session Management</h1>
                <button onClick={handleAddClick} className="btn btn-primary">
                    <span>+</span> Add Session
                </button>
            </div>

            {loading ? (
                <div className="loading-container">
                    <div className="loader">Loading data...</div>
                </div>
            ) : error ? (
                <div className="loading-container" style={{ color: 'var(--danger-color)', flexDirection: 'column', gap: '1rem' }}>
                    <p>Error: {error}</p>
                    <button onClick={loadData} className="btn btn-secondary">Retry</button>
                </div>
            ) : (
                <RecordList
                    records={data}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteClick}
                />
            )}

            <RecordForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSubmit={handleFormSubmit}
                editingRecord={editingRecord}
            />

            {/* Footer */}
            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <p>Connected to Google Sheets</p>
            </div>
        </div>
    );
};

export default CrudModule;
