import React from 'react';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.65)',
            backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1100, // Higher than other modals
            fontFamily: "'Inter', sans-serif"
        }}>
            <div className="fade-in-up" style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                width: '100%', maxWidth: '400px',
                textAlign: 'center',
                border: '1px solid #e2e8f0'
            }}>
                <div style={{
                    width: '60px', height: '60px',
                    borderRadius: '50%',
                    backgroundColor: '#fee2e2',
                    color: '#ef4444',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.75rem',
                    margin: '0 auto 1.5rem auto'
                }}>
                    🗑️
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', color: '#0f172a', fontSize: '1.25rem' }}>Are you sure?</h3>
                <p style={{ margin: '0 0 2rem 0', color: '#64748b', lineHeight: '1.5' }}>
                    Do you really want to delete this session? This process cannot be undone.
                </p>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            backgroundColor: 'white',
                            color: '#475569',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.95rem'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '0.75rem 1.5rem',
                            borderRadius: '8px',
                            border: 'none',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.95rem',
                            boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)'
                        }}
                    >
                        Delete It
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
