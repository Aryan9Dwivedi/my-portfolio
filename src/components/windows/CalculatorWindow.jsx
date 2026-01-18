import React, { useState } from 'react';

export default function CalculatorWindow() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num);
      setNewNumber(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op) => {
    const current = parseFloat(display);
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(result);
    }
    setOperation(op);
    setNewNumber(true);
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (operation && previousValue !== null) {
      const result = calculate(previousValue, parseFloat(display), operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setNewNumber(false);
    }
  };

  const Button = ({ value, onClick, className = '', span = 1 }) => (
    <button
      onClick={onClick}
      className={`p-3 text-sm font-bold transition-all hover:brightness-110 active:brightness-90 ${className}`}
      style={{
        background: className.includes('operator') 
          ? 'linear-gradient(180deg, #dfdfdf 0%, #c0c0c0 50%, #a0a0a0 100%)'
          : '#c0c0c0',
        border: '2px solid',
        borderColor: '#ffffff #000000 #000000 #ffffff',
        boxShadow: '1px 1px 0 rgba(0,0,0,0.3)',
        gridColumn: span > 1 ? `span ${span}` : 'auto'
      }}
    >
      {value}
    </button>
  );

  return (
    <div className="h-full flex flex-col bg-[#c0c0c0] p-3">
      {/* Display */}
      <div 
        className="mb-3 p-3 text-right text-2xl font-bold"
        style={{
          background: '#d4d0c8',
          border: '2px solid',
          borderColor: '#808080 #ffffff #ffffff #808080',
          color: '#000000',
          fontFamily: 'Courier New, monospace',
          minHeight: '60px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        {display}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        <Button value="7" onClick={() => handleNumber('7')} />
        <Button value="8" onClick={() => handleNumber('8')} />
        <Button value="9" onClick={() => handleNumber('9')} />
        <Button value="÷" onClick={() => handleOperation('/')} className="operator" />
        
        <Button value="4" onClick={() => handleNumber('4')} />
        <Button value="5" onClick={() => handleNumber('5')} />
        <Button value="6" onClick={() => handleNumber('6')} />
        <Button value="×" onClick={() => handleOperation('*')} className="operator" />
        
        <Button value="1" onClick={() => handleNumber('1')} />
        <Button value="2" onClick={() => handleNumber('2')} />
        <Button value="3" onClick={() => handleNumber('3')} />
        <Button value="-" onClick={() => handleOperation('-')} className="operator" />
        
        <Button value="0" onClick={() => handleNumber('0')} />
        <Button value="." onClick={handleDecimal} />
        <Button value="C" onClick={handleClear} className="operator" />
        <Button value="+" onClick={() => handleOperation('+')} className="operator" />
        
        <Button value="=" onClick={handleEquals} span={4} className="operator" />
      </div>

      {/* Info */}
      <div className="mt-3 text-xs text-center text-gray-600">
        Retro Calculator v1.0
      </div>
    </div>
  );
}