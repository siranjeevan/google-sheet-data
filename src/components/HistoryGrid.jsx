import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const HistoryGrid = ({ sessions, onEdit }) => {

    // Process Data: Sort by Date Desc + Insert Header Rows
    const rowData = useMemo(() => {
        if (!sessions) return [];

        // 1. Sort by Date (Desc) then Session (Desc)
        const sorted = [...sessions].sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            if (dateA !== dateB) return dateB - dateA; // Newest date first
            return (parseInt(b.sessionNo) || 0) - (parseInt(a.sessionNo) || 0);
        });

        // 2. Insert Headers
        const processed = [];
        let currentDate = null;

        sorted.forEach(row => {
            // Robust date string extraction (Handle T separator if present)
            const rowDate = row.date ? String(row.date).split('T')[0] : 'Unknown Date';

            if (rowDate !== currentDate) {
                // Create formatted date string "Jan 7 - Wednesday"
                const d = new Date(rowDate);
                // "Jan 7 - Wednesday" format construction
                const options = { month: 'short', day: 'numeric' };
                const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
                const datePart = d.toLocaleDateString('en-US', options);

                const label = isNaN(d.getTime())
                    ? rowDate
                    : `${datePart} - ${weekday}`;

                processed.push({ isHeader: true, dateLabel: label });
                currentDate = rowDate;
            }
            processed.push(row);
        });

        return processed;
    }, [sessions]);

    // Full Width Row Logic
    const isFullWidthRow = (params) => {
        return params.rowNode.data && params.rowNode.data.isHeader;
    };

    const fullWidthCellRenderer = (params) => {
        return (
            <div style={{
                width: '100%',
                height: '100%',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                background: 'var(--surface-2)',
                padding: '0 1.5rem',
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                📅 {params.data.dateLabel}
            </div>
        );
    };

    // Column Definitions
    const colDefs = useMemo(() => [
        {
            field: 'sessionNo',
            headerName: 'Session',
            width: 90,
            sortable: false, // Sorting handled pre-grid
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' }
        },
        {
            field: 'startTime',
            headerName: 'Start Time',
            width: 110,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            valueFormatter: (p) => {
                if (!p.value) return '-';
                let d;
                if (String(p.value).includes('T')) {
                    d = new Date(p.value);
                } else {
                    const [h, m] = String(p.value).split(':');
                    d = new Date();
                    d.setHours(h || 0, m || 0);
                }
                if (!isNaN(d.getTime())) {
                    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                }
                return p.value;
            }
        },
        {
            field: 'endTime',
            headerName: 'End Time',
            width: 110,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            valueFormatter: (p) => {
                if (!p.value) return '...';
                let d;
                if (String(p.value).includes('T')) {
                    d = new Date(p.value);
                } else {
                    const [h, m] = String(p.value).split(':');
                    d = new Date();
                    d.setHours(h || 0, m || 0);
                }
                if (!isNaN(d.getTime())) {
                    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
                }
                return p.value;
            }
        },
        {
            field: 'duration',
            headerName: 'Duration',
            width: 110,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
            valueFormatter: (p) => p.value ? p.value : '-'
        },
        {
            field: 'workDescription',
            headerName: 'Description',
            flex: 2,
            minWidth: 200,
            wrapText: true,
            autoHeight: true,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: 'project',
            headerName: 'Project',
            width: 120,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 120,
            cellStyle: { display: 'flex', alignItems: 'center' }
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 130,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            cellRenderer: (p) => {
                const s = String(p.value).toLowerCase();
                let color = 'gray';
                if (s === 'completed') color = 'green';
                if (s === 'in progress') color = 'blue';
                return (
                    <span style={{
                        color: color,
                        fontWeight: 600,
                        textTransform: 'capitalize'
                    }}>
                        ● {p.value}
                    </span>
                );
            }
        },
        {
            field: 'approvedState',
            headerName: 'Approval',
            width: 120,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            cellRenderer: (p) => {
                const s = String(p.value || 'Pending').toLowerCase();
                const isApproved = s === 'approved';
                return (
                    <span style={{
                        padding: '2px 8px',
                        borderRadius: '4px',
                        backgroundColor: isApproved ? '#DEF7EC' : '#FEECDC',
                        color: isApproved ? '#03543E' : '#8A2C0D',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        letterSpacing: '0.5px'
                    }}>
                        {String(p.value || 'Pending').toUpperCase()}
                    </span>
                );
            }
        },
        {
            headerName: 'Action',
            width: 90,
            cellStyle: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
            cellRenderer: (p) => (
                <button
                    onClick={() => p.context.onEdit(p.data)}
                    style={{
                        padding: '6px 14px',
                        background: 'transparent',
                        color: '#2563EB',
                        border: '1px solid #2563EB',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                    }}
                >
                    Edit
                </button>
            ),
            sortable: false,
        }
    ], []);

    // Default Col Def
    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: false, // Disable default sorting to preserve group order
        filter: false,
        suppressMenu: true,
        cellStyle: { display: 'flex', alignItems: 'center' }
    }), []);

    // Empty State
    if (!sessions || sessions.length === 0) {
        return (
            <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '3rem',
                textAlign: 'center',
                border: '1px solid #e2e8f0',
                marginTop: '2rem'
            }}>
                <h3 style={{ margin: 0, color: '#64748b' }}>No Sessions Found</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem', color: '#94a3b8' }}>
                    Data for today will appear here.
                </p>
            </div>
        );
    }

    return (
        <div style={{
            marginTop: '0.5rem',
            height: 'calc(100vh - 220px)',
            width: '100%',
            backgroundColor: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            border: '1px solid #cbd5e1',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
        }}>
            <AgGridReact
                rowData={rowData} // Use Processed Data
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
                rowHeight={52}
                headerHeight={48}
                pagination={true}
                paginationPageSize={20}
                context={{ onEdit }}
                // Header Row Config
                isFullWidthRow={isFullWidthRow}
                fullWidthCellRenderer={fullWidthCellRenderer}
            />
        </div>
    );
};

export default HistoryGrid;
