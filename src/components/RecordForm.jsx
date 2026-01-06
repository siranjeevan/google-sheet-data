
import React, { useState, useEffect } from 'react';
import '../styles/CrudModule.css';

const RecordForm = ({ isOpen, onClose, onSubmit, editingRecord }) => {
    const [formData, setFormData] = useState({
        userName: '',
        sessionNo: '',
        date: new Date().toISOString().slice(0, 10),
        startTime: '',
        endTime: '',
        duration: '',
        workDescription: '',
        status: 'Pending',
        project: '',
        category: '',
        approvedState: 'Pending',
        approvedBy: ''
    });

    useEffect(() => {
        if (editingRecord) {
            // Helper to format date if it's a timestamp
            let formattedDate = editingRecord.date || '';
            if (formattedDate.includes('T')) formattedDate = formattedDate.split('T')[0];

            setFormData({
                userName: editingRecord.userName || '',
                sessionNo: editingRecord.sessionNo || '',
                date: formattedDate,
                startTime: editingRecord.startTime || '',
                endTime: editingRecord.endTime || '',
                duration: editingRecord.duration || '',
                workDescription: editingRecord.workDescription || '',
                status: editingRecord.status || 'Pending',
                project: editingRecord.project || '',
                category: editingRecord.category || '',
                approvedState: editingRecord.approvedState || 'Pending',
                approvedBy: editingRecord.approvedBy || ''
            });
        } else {
            // Reset
            setFormData({
                userName: '',
                sessionNo: '',
                date: new Date().toISOString().slice(0, 10),
                startTime: '',
                endTime: '',
                duration: '',
                workDescription: '',
                status: 'Pending',
                project: '',
                category: '',
                approvedState: 'Pending',
                approvedBy: ''
            });
        }
    }, [editingRecord, isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Auto Calculate Duration
        if (name === 'startTime' || name === 'endTime') {
            const start = name === 'startTime' ? value : formData.startTime;
            const end = name === 'endTime' ? value : formData.endTime;

            let newDuration = formData.duration;
            if (start && end) {
                const startDate = new Date(`1970-01-01T${start}`);
                const endDate = new Date(`1970-01-01T${end}`);
                let diff = (endDate - startDate) / 1000 / 60; // minutes
                if (diff < 0) diff += 24 * 60; // Handle overnight
                newDuration = diff;
            }

            setFormData(prev => ({
                ...prev,
                [name]: value,
                duration: newDuration
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            recordId: editingRecord ? editingRecord.recordId : null
        });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content" style={{ maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>
                    {editingRecord ? 'Edit Record' : 'Add New Record'}
                </h2>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>

                    {/* Row 1 */}
                    <div className="form-group">
                        <label className="form-label">User Name</label>
                        <input type="text" name="userName" value={formData.userName} onChange={handleChange} className="form-input" required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="form-input" required />
                    </div>

                    {/* Row 2 */}
                    <div className="form-group">
                        <label className="form-label">Session Number</label>
                        <input type="number" name="sessionNo" value={formData.sessionNo} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="form-input">
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="In Progress">In Progress</option>
                        </select>
                    </div>

                    {/* Row 3 - Time */}
                    <div className="form-group">
                        <label className="form-label">Start Time</label>
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">End Time</label>
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="form-input" />
                    </div>

                    {/* Row 4 - Dur/Proj */}
                    <div className="form-group">
                        <label className="form-label">Duration (min)</label>
                        <input type="number" name="duration" value={formData.duration} onChange={handleChange} className="form-input" readOnly style={{ background: 'rgba(255,255,255,0.05)' }} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Project</label>
                        <input type="text" name="project" value={formData.project} onChange={handleChange} className="form-input" />
                    </div>

                    {/* Row 5 - Cat/Approve */}
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <input type="text" name="category" value={formData.category} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Approval</label>
                        <select name="approvedState" value={formData.approvedState} onChange={handleChange} className="form-input">
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    {/* Row 6 - Description (Full Width) */}
                    <div className="form-group" style={{ gridColumn: 'span 2' }}>
                        <label className="form-label">Work Description</label>
                        <textarea name="workDescription" value={formData.workDescription} onChange={handleChange} className="form-input" rows="3"></textarea>
                    </div>

                    {/* Row 7 - Approved By */}
                    <div className="form-group">
                        <label className="form-label">Approved By</label>
                        <input type="text" name="approvedBy" value={formData.approvedBy} onChange={handleChange} className="form-input" />
                    </div>


                    <div className="form-actions" style={{ gridColumn: 'span 2' }}>
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
