
import React, { useState } from 'react';

const EndSessionModal = ({ isOpen, onClose, onSubmit, sessionData }) => {
    const [description, setDescription] = useState('');
    const [project, setProject] = useState('LifeOps'); // Default
    const [category, setCategory] = useState('Development'); // Default

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            workDescription: description,
            project,
            category
        });
        // Reset
        setDescription('');
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 100
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
                width: '100%', maxWidth: '500px',
                border: '1px solid var(--border-color)'
            }}>
                <h2 style={{ marginTop: 0, color: 'var(--text-primary)' }}>End Work Session</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Great job! Summarize what you worked on.
                </p>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            Project
                        </label>
                        <input
                            type="text"
                            value={project}
                            onChange={(e) => setProject(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem',
                                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                                fontSize: '1rem', boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            Category
                        </label>
                        <input
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            style={{
                                width: '100%', padding: '0.75rem',
                                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                                fontSize: '1rem', boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                            What did you work on?
                        </label>
                        <textarea
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={4}
                            placeholder="e.g. Implemented the new dashboard layout..."
                            style={{
                                width: '100%', padding: '0.75rem',
                                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                                fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                backgroundColor: 'transparent', color: 'var(--text-secondary)',
                                border: 'none', padding: '0.75rem 1.5rem', fontWeight: 600, cursor: 'pointer'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'var(--primary-color)', color: 'white',
                                border: 'none', padding: '0.75rem 2rem', borderRadius: 'var(--radius-md)',
                                fontWeight: 600, cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
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

export default EndSessionModal;
