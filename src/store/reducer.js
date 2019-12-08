import { Actions } from './actions';

const initialState = {
    accountState: {
        USD: 1000,
        EUR: 500,
        GBP: 100
    },
    currencyPair: [
        { id: 0, name: 'USD', amount: 0, isActive: true },
        { id: 1, name: 'GBP', amount: 0, isActive: false }
    ],
    currencies: [ 'USD', 'EUR', 'GBP' ],
    rates: {
        USD: 1.1,
        GBP: 0.85,
        EUR: 1
    },
    transactions: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.UPDATE_RATES:
            return { ...state, rates: action.payload.rates };
        case Actions.CREATE_TRANSACTION:
            return { ...state, transactions: [ ...state.transactions, action.payload.transaction ] };
        case Actions.UPDATE_CURRENCY_PAIR:
            return { ...state, currencyPair: action.payload.currencyPair };
        case Actions.SET_ACCOUNT_STATE: {
            return { ...state, accountState: { ...state.accountState, ...action.payload.accountState } };
        }
        default:
            return state
    }
}

export default reducer;