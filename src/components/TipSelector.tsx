import React from 'react';

interface TipSelectorProps {
    value: number;
    onChange: (val: number) => void;
    error?: string;
}

export default function TipSelector({ value, onChange, error }: TipSelectorProps) {
    const presets = [10, 15, 20];

    const isPresetActive = (preset: number) => value === preset;

    const isCustomActive = value !== 0 && !presets.includes(value);

    const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numValue = parseFloat(e.target.value);
        onChange(isNaN(numValue) ? 0 : numValue);
    };

    return (
        <div className="field-group">
            <label className="field-label">Select tip %</label>
            <div className='tip-presets'>
                {presets.map((preset) => (
                    <button
                        key={preset}
                        type="button"
                        onClick={() => onChange(preset)}
                        className={`preset-btn ${isPresetActive(preset) ? 'active' : ''}`}
                    >
                        {preset}%
                    </button>
                ))}
            </div>
            <input
                type="number"
                placeholder="Custom %"
                min="0"
                max="25"
                inputMode="decimal"
                value={isCustomActive ? value : ''}
                onChange={handleCustomChange}
                className={`custom-tip-input ${isCustomActive ? 'active' : ''} ${error ? 'error' : ''}`}
            />
            {error && <span className="error-msg">{error}</span>}
        </div>
    );
}
