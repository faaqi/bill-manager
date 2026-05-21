
interface TipSelectorProps {
  value: number;
  customValue: string;
  onPresetSelect: (preset: number) => void;
  onCustomChange: (val: string) => void;
  error?: string;
}

export default function TipSelector({
  value,
  customValue,
  onPresetSelect,
  onCustomChange,
  error,
}: TipSelectorProps) {
  const presets = [5, 10, 15, 20, 25];
  const isCustomActive = customValue !== '';
  const activePreset = isCustomActive ? null : value;
  const inputId = 'custom-tip-input';
  const errorId = 'tip-error';

  return (
    <div className="field-group">
      <div className="label-container">
        <label className="field-label" htmlFor={inputId}>
          Select Tip %
        </label>
        {error && (
          <span id={errorId} className="error-msg" role="alert">
            {error}
          </span>
        )}
      </div>

      <div className="tip-grid" role="group" aria-label="Tip Percentage Presets">
        {presets.map((preset) => {
          const isActive = activePreset === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => onPresetSelect(preset)}
              className={`preset-btn ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
            >
              {preset}%
            </button>
          );
        })}

        <div className={`custom-tip-container ${isCustomActive ? 'active' : ''} ${error ? 'has-error' : ''}`}>
          <input
            id={inputId}
            type="text"
            inputMode="decimal"
            placeholder="Custom"
            value={customValue}
            onChange={(e) => onCustomChange(e.target.value)}
            className="custom-tip-input-field"
            aria-label="Custom tip percentage"
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
          <span className="percent-suffix" aria-hidden="true">%</span>
        </div>
      </div>
    </div>
  );
}
