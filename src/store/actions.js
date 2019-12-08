import { exchangeCurrencies } from '../utils';
import uuid from 'uuid/v4';

export const Actions = {
    UPDATE_RATES: "UPDATE_RATES",
    CREATE_TRANSACTION: "CREATE_TRANSACTION",
    UPDATE_CURRENCY_PAIR: "UPDATE_CURRENCY_PAIR",
    SET_ACCOUNT_STATE: "SET_ACCOUNT_STATE"
}

export const updateRates = () => {
    return async (dispatch, getStore) => {
        const { currencyPair } = getStore();
        const response = await fetch('https://api.openrates.io/latest?base=EUR');
        const { rates } = await response.json();
        const newRates = { ...rates, EUR: 1 };
        dispatch({ type: Actions.UPDATE_RATES, payload: { rates: newRates }});
        dispatch(updateCurrencyPair(currencyPair.find(currency => !currency.isActive)));
    }
}

export const createTransaction = (currencyPair) => {
    return (dispatch) => {
        const [from, to] = currencyPair;
        const transaction = {
            id: uuid(),
            createdAt: +new Date(),
            from: { name: from.name, amount: parseFloat(from.amount) },
            to: { name: to.name, amount: parseFloat(to.amount) }
        };
        dispatch({ type: Actions.CREATE_TRANSACTION, payload: { transaction }});
        dispatch(setAccountState(transaction));
    }
}

const setAccountState = (transaction) => {
    return (dispatch, getStore) => {
        const { accountState } = getStore();
        const { from, to } = transaction;
        const newAccountState = {
            [from.name]: accountState[from.name] - from.amount,
            [to.name]: accountState[to.name] + to.amount
        };
        dispatch({ type: Actions.SET_ACCOUNT_STATE, payload: { accountState: newAccountState }});
    }
}

export const updateCurrencyPair = (newCurrency) => {
    return (dispatch, getState) => {
        const { currencyPair, rates } = getState();
        const newCurrencyPair = currencyPair.map((currency) => {
            if (currency.id === newCurrency.id) return newCurrency;
            return {
                ...currency,
                isActive: !newCurrency.isActive,
                amount: exchangeCurrencies({
                    from: newCurrency.name,
                    to: currency.name,
                    amount: newCurrency.amount
                }, rates)
            }
        });
        dispatch({
            type: Actions.UPDATE_CURRENCY_PAIR,
            payload: { currencyPair: newCurrencyPair }
        });
    }
}
