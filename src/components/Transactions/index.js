import React from 'react';
import { localeTimeFormat, localeCurrencyFormat } from '../../utils';

import './index.css';

const Transactions = ({ items }) => (
    <div className="transactions">
        {items.map(transaction =>
            <div key={transaction.id} className="transaction">
                <div className="transaction-info">
                    <div className="transaction-info__title">Exchanged from {transaction.from.name}</div>
                    <div className="transaction-info__time">{localeTimeFormat(transaction.createdAt)}</div>
                </div>
                <div className="transaction-details">
                    <div className="transaction-details__from">-{localeCurrencyFormat(transaction.from.amount, transaction.from.name)}</div>
                    <div className="transaction-details__to">+{localeCurrencyFormat(transaction.to.amount, transaction.to.name)}</div>
                </div>
            </div>
        )}
    </div>
);

export default Transactions;
