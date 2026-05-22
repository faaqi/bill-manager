import { useState, useEffect } from 'react';
import './App.css';
import type { BillModel, Errors } from './types';
import BillInput from './components/BillInput';
import TipSelector from './components/TipSelector';
import PeopleInput from './components/PeopleInput';
import OutputPanel from './components/OutputPanel';
import ResetButton from './components/ResetButton';

function calculateBill(billAmount: number, tipPercent: number, people: number): BillModel {
  const totalTip = Math.round(billAmount * (tipPercent / 100) * 100) / 100;
  const grandTotal = Math.round((billAmount + totalTip) * 100) / 100;
  const billPerPerson = Math.ceil((grandTotal / people) * 100) / 100;

  return {
    totalTip,
    grandTotal,
    billPerPerson,
  };
}

function App() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [people, setPeople] = useState('1');

  const [touched, setTouched] = useState({
    bill: false,
    tip: false,
    people: false,
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const errors: Errors = {};

  if (touched.bill && billAmount !== '') {
    const parsed = parseFloat(billAmount);
    if (isNaN(parsed) || parsed <= 0) {
      errors.bill = 'Must be greater than $0';
    } else if (parsed > 10000000) {
      errors.bill = 'Max amount is $10M';
    }
  } else if (touched.bill && billAmount === '') {
    errors.bill = 'Bill is required';
  }

  const activeTipStr = customTip !== '' ? customTip : String(tipPercent);
  if (touched.tip && activeTipStr !== '') {
    const parsed = parseFloat(activeTipStr);
    if (isNaN(parsed) || parsed < 0) {
      errors.tip = 'Cannot be negative';
    } else if (parsed > 40) {
      errors.tip = 'Max tip is 40%';
    }
  }

  if (touched.people && people !== '') {
    const parsed = parseFloat(people);
    if (isNaN(parsed) || !Number.isInteger(parsed) || parsed < 1) {
      errors.people = 'Must be a whole number ≥ 1';
    } else if (parsed > 1000) {
      errors.people = 'Max is 1,000 people';
    }
  } else if (touched.people && people === '') {
    errors.people = 'Cannot be empty';
  }

  const billVal = parseFloat(billAmount);
  const peopleVal = parseInt(people, 10);
  const activeTipVal = customTip !== '' ? parseFloat(customTip) : tipPercent;

  const hasErrors = Object.keys(errors).length > 0;
  const canCalculate = !hasErrors &&
    billAmount !== '' && !isNaN(billVal) && billVal > 0 &&
    people !== '' && !isNaN(peopleVal) && peopleVal >= 1 &&
    !isNaN(activeTipVal) && activeTipVal >= 0;

  const result = canCalculate ? calculateBill(billVal, activeTipVal, peopleVal) : null;

  const isActive = billAmount !== '' || customTip !== '' || tipPercent !== 15 || people !== '1';

  const handleBillChange = (val: string) => {
    setTouched(prev => ({ ...prev, bill: true }));
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setBillAmount(val);
    }
  };

  const handlePresetSelect = (preset: number) => {
    setTouched(prev => ({ ...prev, tip: true }));
    setTipPercent(preset);
    setCustomTip('');
  };

  const handleCustomTipChange = (val: string) => {
    setTouched(prev => ({ ...prev, tip: true }));
    if (val === '' || /^\d*\.?\d*$/.test(val)) {
      setCustomTip(val);
    }
  };

  const handlePeopleChange = (val: string) => {
    setTouched(prev => ({ ...prev, people: true }));
    if (val === '' || /^\d*$/.test(val)) {
      setPeople(val);
    }
  };

  const handleReset = () => {
    setBillAmount('');
    setTipPercent(15);
    setCustomTip('');
    setPeople('1');
    setTouched({
      bill: false,
      tip: false,
      people: false,
    });
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <span className="logo-accent">Bill</span> Splitter
        </div>
        <button
          onClick={toggleTheme}
          className="theme-toggle-btn"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <main className="calculator-layout">
        <section className="input-section" aria-label="Calculator Inputs">
          <BillInput
            value={billAmount}
            onChange={handleBillChange}
            error={errors.bill}
          />

          <TipSelector
            value={tipPercent}
            customValue={customTip}
            onPresetSelect={handlePresetSelect}
            onCustomChange={handleCustomTipChange}
            error={errors.tip}
          />

          <PeopleInput
            value={people}
            onChange={handlePeopleChange}
            error={errors.people}
          />
        </section>

        <section className="output-section" aria-label="Calculation Results">
          <OutputPanel result={result} />
          <ResetButton onReset={handleReset} isActive={isActive} />
        </section>
      </main>
    </div>
  );
}

export default App;
