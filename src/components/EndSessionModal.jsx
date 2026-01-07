
import React, { useState } from 'react';

const EndSessionModal = ({ isOpen, onClose, onSubmit, sessionData }) => {
    const [description, setDescription] = useState('');
    const [project, setProject] = useState(''); // Default Empty
    const [category, setCategory] = useState('Normal');
    const [status, setStatus] = useState('Completed');
    const [approval, setApproval] = useState('Pending');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            workDescription: description,
            project,
            category,
            status,
            approvedState: approval
        });
        // Reset
        setDescription('');
        setProject('');
        setCategory('Normal');
        setStatus('Completed');
        setApproval('Pending');
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)', // Darker, premium backdrop
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="fade-in-up" style={{
                backgroundColor: 'white',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                width: '100%', maxWidth: '550px',
                border: '1px solid rgba(255,255,255,0.2)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Decorative top accent */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)' }}></div>

                <h2 style={{
                    marginTop: 0, marginBottom: '0.5rem',
                    color: '#0f172a', fontSize: '1.75rem', fontWeight: 700
                }}>
                    Session Complete
                </h2>
                <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '1rem', lineHeight: '1.5' }}>
                    Great work! Please categorize your session details below.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                    {/* Row 1: Project & Category */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Project Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Cab Admin"
                                value={project}
                                onChange={(e) => setProject(e.target.value)}
                                style={inputStyle}
                                required
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={inputStyle}
                            >
                                <option value="Critical">Critical</option>
                                <option value="Good to have">Good to have</option>
                                <option value="Normal">Normal</option>
                                <option value="Not Required">Not Required</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 2: Status & Approval */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                        <div>
                            <label style={labelStyle}>Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={inputStyle}
                            >
                                <option value="Completed">Completed</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Blocked">Blocked</option>
                            </select>
                        </div>
                        <div>
                            <label style={labelStyle}>Approval State</label>
                            <select
                                value={approval}
                                onChange={(e) => setApproval(e.target.value)}
                                style={inputStyle}
                            >
                                <option value="Approved">Approved</option>
                                <option value="Rework Needed">Rework Needed</option>
                                <option value="In Reviewing">In Reviewing</option>
                                <option value="Pending">Pending</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={labelStyle}>What did you modify?</label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="Briefly describe your work..."
                            style={{
                                ...inputStyle,
                                minHeight: '100px',
                                resize: 'vertical'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: 'transparent',
                                color: '#64748b',
                                border: 'none',
                                padding: '0.875rem 1.5rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontSize: '1rem',
                                transition: 'color 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.color = '#0f172a'}
                            onMouseOut={(e) => e.target.style.color = '#64748b'}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                                color: 'white',
                                border: 'none',
                                padding: '0.875rem 2.5rem',
                                borderRadius: '12px',
                                fontWeight: 600,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                                transition: 'transform 0.1s, box-shadow 0.2s'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-1px)';
                                e.target.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
                            }}
                        >
                            Save & Finish
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 600,
    color: '#334155',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
};

const inputStyle = {
    width: '100%',
    padding: '0.875rem 1rem',
    borderRadius: '12px',
    border: '1px solid #cbd5e1',
    backgroundColor: '#fff',
    fontSize: '0.95rem',
    boxSizing: 'border-box',
    color: '#0f172a',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    outline: 'none'
};

export default EndSessionModal;
