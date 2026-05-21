interface BillInputProps {
    value: string;
    onChange: (val: string) => void;
    error?: string;
}

export default function BillInput({ value, onChange, error }: BillInputProps) {
    return (
        <div className="field-group">
            <label className="field-label">Bill amount</label>

            <div className="input-wrapper">
                <span className="input-prefix">$</span>
                <input
                    type="text"
                    inputMode="decimal"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="0.00"
                    className={`field-input ${error ? 'error' : ''}`}
                />
            </div>

            {error && <span className="error-msg">{error}</span>}
        </div>
    );
}