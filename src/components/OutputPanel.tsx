import type { BillModel } from '../types';

interface OutputPanelProps {
  result: BillModel | null;
}

export default function OutputPanel({ result }: OutputPanelProps) {
  const fmt = (val: number | undefined) => {
    const formatted = (val ?? 0).toFixed(2);
    if (formatted.endsWith('.00')) {
      return formatted.slice(0, -3);
    }
    return formatted;
  };

  return (
    <div className="output-container">
      <div className="output-row">
        <div className="output-label-group">
          <span className="output-label-title">Total Tip</span>
          <span className="output-label-subtitle">total tip amount</span>
        </div>
        <span className="output-value" aria-live="polite">
          ${fmt(result?.totalTip)}
        </span>
      </div>

      <div className="output-row">
        <div className="output-label-group">
          <span className="output-label-title">Grand Total</span>
          <span className="output-label-subtitle">bill + tip total</span>
        </div>
        <span className="output-value" aria-live="polite">
          ${fmt(result?.grandTotal)}
        </span>
      </div>

      <div className="output-divider" aria-hidden="true" />

      <div className="output-row highlight">
        <div className="output-label-group">
          <span className="output-label-title">Per Person</span>
          <span className="output-label-subtitle">individual share</span>
        </div>
        <span className="output-value" aria-live="polite">
          ${fmt(result?.billPerPerson)}
        </span>
      </div>
    </div>
  );
}