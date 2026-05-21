interface PeopleInputProps {
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function PeopleInput({ value, onChange, error }: PeopleInputProps) {
  const inputId = 'number-of-people-input';
  const errorId = 'people-error';

  return (
    <div className="field-group">
      <div className="label-container">
        <label htmlFor={inputId} className="field-label">
          Number of People
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
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <input
          id={inputId}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1"
          className="field-input"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          required
        />
      </div>
    </div>
  );
}