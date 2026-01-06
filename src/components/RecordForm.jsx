
import React, { useState, useEffect } from 'react';
import '../styles/CrudModule.css';

const RecordForm = ({ isOpen, onClose, onSubmit, editingRecord }) => {
    const [formData, setFormData] = useState({
        userName: '',
        sessionNo: '',
        date: new Date().toISOString().slice(0, 16) // Default to now
    });

    useEffect(() => {
        if (editingRecord) {
            // Format date for datetime-local input
            const formattedDate = editingRecord.date
                ? new Date(editingRecord.date).toISOString().slice(0, 16)
                : '';

            setFormData({
                userName: editingRecord.userName || '',
                sessionNo: editingRecord.sessionNo || '',
                date: formattedDate
            });
        } else {
            // Reset for adding new record
            setFormData({
                userName: '',
                sessionNo: '',
                date: new Date().toISOString().slice(0, 16)
            });
        }
    }, [editingRecord, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            // If editing, keep the ID, otherwise generate a temp one (logic in parent)
            recordId: editingRecord ? editingRecord.recordId : null
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 style={{ marginBottom: '1.5rem' }}>
                    {editingRecord ? 'Edit Record' : 'Add New Record'}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">User Name</label>
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="Enter user name"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Session Number</label>
                        <input
                            type="number"
                            name="sessionNo"
                            value={formData.sessionNo}
                            onChange={handleChange}
                            className="form-input"
                            required
                            min="1"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input
                            type="datetime-local"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {editingRecord ? 'Update Record' : 'Add Record'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecordForm;
