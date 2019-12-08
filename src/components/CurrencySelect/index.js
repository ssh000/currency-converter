import React from 'react';
import './index.css';

const CurrencySelect = ({ currencies, currency, onChange }) => (
    <select
        className="currency-select"
        defaultValue={currency.name}
        onChange={(event) => onChange(currency, event.target.value)}
    >
        {currencies.map(currency => (
            <option key={currency} value={currency}>
                {currency}
            </option>
        ))}
    </select>
)

export default CurrencySelect