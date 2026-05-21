import React from 'react';

interface PeopleInputProps {
    value: number;
    onChange: (val: number) => void;
    error?: string;
}

export default function PeopleInput({ value, onChange, error }: PeopleInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue === '') { onChange(0); return; }
        const cleanValue = inputValue.replace(/\D/g, '');
        if (cleanValue) {
            const parsed = parseInt(cleanValue, 10);
            onChange(parsed > 99 ? 99 : parsed);
        }
    };

    return (
        <div className="field-group">
            <label className="field-label">Number of people</label>
            <div className="input-wrapper">
                <span className="input-prefix">👤</span>
                <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={value === 0 ? '' : value}
                    onChange={handleChange}
                    placeholder="1"
                    className={`field-input ${error ? 'error' : ''}`}
                />
            </div>
            {error && <span className="error-msg">{error}</span>}
        </div>
    );
}