interface BillInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function BillInput({ value, onChange, error }: BillInputProps) {
  const inputId = 'bill-amount-input';
  const errorId = 'bill-amount-error';

  return (
    <div className="field-group">
      <div className="label-container">
        <label htmlFor={inputId} className="field-label">
          Bill Amount
        </label>
        {error && (
          <span id={errorId} className="error-msg" role="alert">
            {error}
          </span>
        )}
      </div>

      <div className={`input-wrapper ${error ? 'has-error' : ''}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="input-icon"
          aria-hidden="true"
        >
          <line x1="12" y1="1" x2="12" y2="23"></line>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.00"
          className="field-input"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          required
        />
      </div>
    </div>
  );
}