import { exchangeCurrencies } from './index';

const rates = {
    USD: 1.1,
    GBP: 0.85,
    EUR: 1
}

it('checks correct conversion based on rates', () => {
    expect(exchangeCurrencies({ from: 'USD', to: 'EUR', amount: 1 }, rates)).toBe(0.91);
    expect(exchangeCurrencies({ from: 'EUR', to: 'EUR', amount: 1 }, rates)).toBe(1);
    expect(exchangeCurrencies({ from: 'USD', to: 'GBP', amount: 1 }, rates)).toBe(0.77);
    expect(exchangeCurrencies({ from: 'USD', to: 'GBP', amount: 0 }, rates)).toBe(0);
    expect(exchangeCurrencies({ from: 'GBP', to: 'USD', amount: 77.27 }, rates)).toBe(100);
});