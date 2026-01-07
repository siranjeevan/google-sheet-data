import React from 'react';

const CheckInModal = ({ isOpen, onClose, onContinue, onStop }) => {
    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}>
            <div style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '2rem',
                width: '90%',
                maxWidth: '400px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    marginTop: 0,
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                    fontSize: '1.5rem'
                }}>
                    Still Working?
                </h2>

                <p style={{
                    color: 'var(--text-secondary)',
                    marginBottom: '2rem',
                    lineHeight: '1.5'
                }}>
                    Your session has been running for a while. Just checking in to see if you are still active.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <button
                        onClick={onContinue}
                        style={{
                            padding: '0.9rem',
                            backgroundColor: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        Yes, I'm Still Working
                    </button>

                    <button
                        onClick={onStop}
                        style={{
                            padding: '0.9rem',
                            backgroundColor: 'white',
                            color: '#ef4444',
                            border: '1px solid #ef4444',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s'
                        }}
                    >
                        No, Stop Session
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckInModal;
