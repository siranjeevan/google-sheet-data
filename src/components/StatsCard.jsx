
import React from 'react';

const WhiteFlipUnit = ({ value, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div className="white-flip-container">
            {/* The Clack Card */}
            <div className="white-flip-card">
                {value.toString().padStart(2, '0')}
            </div>
            {/* The Mechanical Hinges */}
            <div className="white-flip-hinge hinge-left"></div>
            <div className="white-flip-hinge hinge-right"></div>
        </div>
        <span style={{
            fontSize: '0.7rem',
            fontWeight: 700,
            color: 'var(--text-secondary)',
            letterSpacing: '1px'
        }}>
            {label}
        </span>
    </div>
);

const StatsCard = ({ totalSeconds, sessionCount }) => {
    const formatTime = (totalSeconds) => {
        // Prevent NaN
        if (isNaN(totalSeconds)) totalSeconds = 0;

        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);
        return { h, m, s };
    };

    const { h, m, s } = formatTime(totalSeconds);

    return (
        <div style={{
            borderRadius: '16px',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            boxSizing: 'border-box',
            background: 'white',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-sm)',
            position: 'relative'
        }}>

            {/* Header */}
            <h3 style={{
                margin: '0 0 2rem 0',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 700,
                textAlign: 'center'
            }}>
                Daily Progress
            </h3>

            {/* Flip Clock Display */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <WhiteFlipUnit value={h} label="HRS" />
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--border-color)', marginTop: '-1.5rem' }}>:</div>
                <WhiteFlipUnit value={m} label="MIN" />
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--border-color)', marginTop: '-1.5rem' }}>:</div>
                <WhiteFlipUnit value={s} label="SEC" />
            </div>

            {/* Footer Stats */}
            <div style={{
                borderTop: '1px solid var(--bg-color)',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.5rem 1rem',
                    background: '#f8fafc',
                    borderRadius: '20px',
                    border: '1px solid var(--secondary-color)'
                }}>
                    <span style={{ color: 'var(--success-color)', fontSize: '1.1rem' }}>●</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{sessionCount}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sessions Data</span>
                </div>
            </div>

        </div>
    );
};

export default StatsCard;
