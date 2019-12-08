import React from 'react';
import './index.css';

const CurrencyInput = ({ currency, onChange, onFocus }) => (
    <input
        className="currency-input"
        type="number"
        value={currency.amount}
        onChange={(event) => onChange(currency, +event.target.value)}
        onFocus={(event) => { 
            event.target.select();
            onFocus(currency);
        }}
    />
);

export default CurrencyInput;