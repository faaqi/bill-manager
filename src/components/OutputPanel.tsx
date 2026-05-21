import type { BillModel } from '../types';

interface OutputPanelProps {
    result: BillModel | null;
}

export default function OutputPanel({ result }: OutputPanelProps) {
    const fmt = (val: number | undefined) => (val ?? 0).toFixed(2);

    const rows = [
        { label: 'Tip amount', sub: null, value: result?.totalTip },
        { label: 'Grand total', sub: null, value: result?.grandTotal },
        { label: 'Per person', sub: '/ total', value: result?.billPerPerson },
    ];

    return (
        <div className="output-panel">
            {rows.map((row) => (
                <div key={row.label} className="output-row">
                    <div>
                        <p className="output-label">{row.label}</p>
                        {row.sub && <p className="output-sublabel">{row.sub}</p>}
                    </div>
                    <span className="output-value">${fmt(row.value)}</span>
                </div>
            ))}
        </div>
    );
}