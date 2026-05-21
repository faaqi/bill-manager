import { useState } from 'react'
import './App.css'
import type { BillModel, Errors } from './types'
import BillInput from './components/BillInput';
import TipSelector from './components/TipSelector';
import PeopleInput from './components/PeopleInput';
import OutputPanel from './components/OutputPanel';
import ResetButton from './components/ResetButton';


function calculateBill(billAmount: number, tipPercent: number, people: number): BillModel {
  const totalTip = billAmount * (tipPercent / 100);
  const grandTotal = billAmount + totalTip;
  const billPerPerson = Math.round((grandTotal / people) * 100) / 100;

  return {
    totalTip,
    grandTotal,
    billPerPerson,
  };
}

function App() {
  const [billAmount, setBillAmount] = useState('')
  const [tipPercent, setTipPercent] = useState(5)
  const [people, setPeople] = useState(1)
  const [errors, setErrors] = useState<Errors>({});

  const bill = parseFloat(billAmount);
  const hasErrors = Object.keys(errors).length > 0;
  const result = !hasErrors && bill > 0 ? calculateBill(bill, tipPercent, people) : null;

  const isActive = billAmount !== '' || tipPercent !== 15 || people !== 1;

  const handleBillChange = (val: string) => {
    setBillAmount(val);
    const parsed = parseFloat(val);
    const newErrors = { ...errors };

    if (val === '' || isNaN(parsed) || parsed <= 0) {
      newErrors.bill = 'Enter a valid amount greater than $0';
    } else if (parsed > 999999) {
      newErrors.bill = 'Amount too large (max $999,999)';
    } else {
      delete newErrors.bill;
    }

    setErrors(newErrors);
  };

  const handleTipChange = (val: number) => {
    setTipPercent(val);
    const newErrors = { ...errors };

    if (val < 0) {
      newErrors.tip = 'Tip cannot be negative';
    } else if (val > 25) {
      newErrors.tip = 'Tip cannot exceed 25%';
    } else {
      delete newErrors.tip;
    }

    setErrors(newErrors);
  };

  const handlePeopleChange = (val: number) => {
    setPeople(val);
    const newErrors = { ...errors };

    if (val < 1) {
      newErrors.people = 'At least 1 person required';
    } else {
      delete newErrors.people;
    }

    setErrors(newErrors);
  };

  const handleReset = () => {
    setBillAmount('')
    setTipPercent(5)
    setPeople(1)
    setErrors({})
  }

  return (
    <div className="app-container">
      <h1>Tip Calculator</h1>
      <h2>Simple & Fast</h2>

      <div className="calculator-layout">
        <div className="input-section">
          <BillInput value={billAmount} onChange={handleBillChange} error={errors.bill} />
          <TipSelector value={tipPercent} onChange={handleTipChange} error={errors.tip} />
          <PeopleInput value={people} onChange={handlePeopleChange} error={errors.people} />
          <ResetButton onReset={handleReset} isActive={isActive} />
        </div>

        <OutputPanel result={result} />
      </div>
    </div>
  );
}

export default App
