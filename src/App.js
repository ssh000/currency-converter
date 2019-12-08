import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { localeCurrencyFormat, getRates } from './utils';
import CurrencySelect from './components/CurrencySelect';
import CurrencyInput from './components/CurrencyInput';
import Transactions from './components/Transactions';

import { updateRates, updateCurrencyPair, createTransaction } from './store/actions';

import './App.css';

const App = ({
    rates,
    currencies,
    accountState,
    transactions,
    updateRates,
    currencyPair,
    updateCurrencyPair,
    createTransaction
}) => {
    useEffect(() => {
        updateRates();
        const timerId = setInterval(() => {
            updateRates();
        }, 10000);
        return () => clearInterval(timerId);
    }, []);

    const onInput = (currency, amount) => {
        updateCurrencyPair({ ...currency, amount, isActive: true });
    }

    const onSelectCurrency = (currency, currencyName) => {
        updateCurrencyPair({ ...currency, name: currencyName, isActive: true });
    }

    const onExchange = () => {
        createTransaction(currencyPair);
    }

    const setActive = (currency) => {
        updateCurrencyPair({ ...currency, isActive: true });
    }

    const renderRate = (currency) => {
        const other = currencyPair.find(cur => cur.id !== currency.id);
        const from = localeCurrencyFormat(1, other.name);
        const to = localeCurrencyFormat(getRates({ from: other.name, to: currency.name }, rates), currency.name);
        return `${from} = ${to}`;
    }

    return (
        <div className="exchange-page">
            <div className="exchange-page__currency-converter">
                {currencyPair.map((currency) =>
                    <div key={currency.id} className="exchange-page__pair">
                        <div className="exchange-page__pair-controls">
                            <CurrencySelect currencies={currencies} currency={currency} onChange={onSelectCurrency} />
                            <CurrencyInput currency={currency} onChange={onInput} onFocus={setActive} />
                        </div>
                        <div className="exchange-page__pair-details">
                            <div className="exchange-page__pair-balance">
                                You have: {localeCurrencyFormat(accountState[currency.name], currency.name)}
                            </div>
                            {!currency.isActive && <div className="exchange-page__pair-rate">
                                {renderRate(currency)}
                            </div>}
                        </div>
                    </div>
                )}
                <div className="exchange-page__button" onClick={onExchange}>Exchange</div>
                <Transactions items={transactions} />
            </div>
        </div>
    );
}

export default connect(
    (state) => ({
        rates: state.rates,
        currencies: state.currencies,
        transactions: state.transactions,
        currencyPair: state.currencyPair,
        accountState: state.accountState
    }),
    { updateRates, updateCurrencyPair, createTransaction }
)(App)
