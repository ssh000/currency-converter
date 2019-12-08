import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Actions, updateRates, updateCurrencyPair } from './actions';

const mockStore = configureMockStore([thunk]);

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

describe("Actions", () => {
    it("updates rates and converts inactive currency in the pair according to the rates", async () => {
        jest.spyOn(window, 'fetch').mockImplementationOnce(() => {
            return Promise.resolve({
                json: () => Promise.resolve({rates: { USD: 1, GBP: 1 } })
            })
        })
        const store = mockStore(initialState);
        await store.dispatch(updateRates());
        expect(store.getActions()).toEqual([
            { 
                type: Actions.UPDATE_RATES,
                payload: { rates: { USD: 1, GBP: 1, EUR: 1 } }
            },
            {
                type: Actions.UPDATE_CURRENCY_PAIR,
                payload: {
                    currencyPair: [
                        { id: 0, name: 'USD', amount: 0, isActive: true },
                        { id: 1, name: 'GBP', amount: 0, isActive: false }
                    ]
                }
            }
        ]);
    });

    it("updates currency and converts other currency in the pair according to the rates", async () => {
        const activeCurrency = { id: 0, name: 'USD', amount: 100, isActive: true };
        const store = mockStore({ ...initialState, currencyPair: [
            activeCurrency,
            { id: 1, name: 'GBP', amount: 0, isActive: false }
        ]});
        await store.dispatch(updateCurrencyPair(activeCurrency));
        expect(store.getActions()).toEqual([
            {
                type: Actions.UPDATE_CURRENCY_PAIR,
                payload: {
                    currencyPair: [
                        activeCurrency,
                        { id: 1, name: 'GBP', amount: 77.27, isActive: false }
                    ]
                }
            }
        ]);
    });
})
