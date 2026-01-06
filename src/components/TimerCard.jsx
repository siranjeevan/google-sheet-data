
import React, { useState, useEffect } from 'react';

const NeonRing = ({ value, max, label, colorStops }) => {
    const radius = 60;
    const strokeWidth = 6;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(value / max, 0), 1);
    const strokeDashoffset = circumference * (1 - progress);

    const gradientId = `grad-${label}`;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 10px', position: 'relative' }}>

            {/* Subtle professional background hint */}
            <div style={{
                position: 'absolute', top: '15%', left: '15%', width: '70%', height: '70%',
                borderRadius: '50%',
                background: colorStops[0],
                filter: 'blur(20px)',
                opacity: 0.05,
                zIndex: 0
            }}></div>

            <div style={{ position: 'relative', width: '140px', height: '140px', zIndex: 1 }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
                    <defs>
                        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={colorStops[0]} />
                            <stop offset="100%" stopColor={colorStops[1]} />
                        </linearGradient>
                    </defs>

                    {/* Track */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                    />

                    {/* Progress Ring */}
                    <circle
                        cx="70"
                        cy="70"
                        r={radius}
                        fill="transparent"
                        stroke={`url(#${gradientId})`}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        style={{
                            transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                    />
                </svg>

                {/* Center Value */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '2.5rem', fontWeight: 600, color: 'var(--text-primary)',
                    fontFamily: "'Inter', sans-serif",
                }}>
                    {value.toString().padStart(2, '0')}
                </div>
            </div>

            {/* Label */}
            <span style={{
                marginTop: '1rem',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 600
            }}>
                {label}
            </span>
        </div>
    );
};

const TimerCard = ({ onStart, onEnd, activeSession }) => {
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval = null;
        if (activeSession) {
            const updateTimer = () => {
                const now = new Date();
                const start = new Date(activeSession.startTimeFull || activeSession.startTimeStr);
                if (!isNaN(start.getTime())) {
                    const diffSeconds = Math.floor((now - start) / 1000);
                    setElapsed(diffSeconds > 0 ? diffSeconds : 0);
                } else {
                    setElapsed(prev => prev + 1);
                }
            };
            updateTimer();
            interval = setInterval(updateTimer, 1000);
        } else {
            setElapsed(0);
        }
        return () => clearInterval(interval);
    }, [activeSession]);

    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;

    // Professional Blue Palette for Rings
    const ringColors = {
        h: ['#0f172a', '#334155'], // Slate 900 -> 700 (Dark Navy)
        m: ['#3b82f6', '#2563eb'], // Blue 500 -> 600
        s: ['#0ea5e9', '#38bdf8']  // Sky 500 -> 400
    };

    return (
        <div style={{
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%'
        }}>

            {/* Date Header */}
            <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
                <h2 style={{
                    margin: '0 0 0.8rem 0',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--text-secondary)',
                    fontWeight: 600
                }}>
                    {activeSession ? 'Tracking Time' : 'Ready to Start'}
                </h2>
                <div style={{
                    display: 'inline-flex',
                    padding: '0.5rem 1.25rem',
                    borderRadius: '8px',
                    background: 'white',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                    fontSize: '1rem',
                    alignItems: 'center', gap: '0.5rem'
                }}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Professional Rings */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '1.5rem',
                marginBottom: '4rem'
            }}>
                <NeonRing value={h} max={12} label="Hours" colorStops={ringColors.h} />
                <NeonRing value={m} max={60} label="Minutes" colorStops={ringColors.m} />
                <NeonRing value={s} max={60} label="Seconds" colorStops={ringColors.s} />
            </div>

            {/* Button - Clean Professional Blue */}
            {!activeSession ? (
                <button
                    onClick={onStart}
                    style={{
                        background: 'var(--primary-color)', /* Deep Navy */
                        color: 'white',
                        border: 'none',
                        padding: '1rem 3.5rem',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.2)',
                        transition: 'all 0.2s ease',
                        display: 'flex', alignItems: 'center', gap: '0.8rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--primary-hover)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'var(--primary-color)'}
                >
                    <span style={{ fontSize: '1.2rem' }}>▸</span> Start Session
                </button>
            ) : (
                <button
                    onClick={onEnd}
                    style={{
                        background: 'white',
                        color: '#ef4444',
                        border: '1px solid #ef4444',
                        padding: '1rem 3rem',
                        borderRadius: '8px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        boxShadow: 'var(--shadow-sm)'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = '#ef4444';
                        e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = '#ef4444';
                    }}
                >
                    Stop Session
                </button>
            )}

        </div>
    );
};

export default TimerCard;
