export const localeTimeFormat = new Intl.DateTimeFormat(navigator.language, {
    hour: "numeric",
    minute: "numeric"
}).format;

export const localeCurrencyFormat = (value, currency) => 
    new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency
    }).format(value);

export const getRates = ({ from, to }, rates) => {
    if (rates[from] === 1) return rates[to];
    return rates[to] / rates[from];
}

export const exchangeCurrencies = ({ from, to, amount }, rates) => {
    return parseFloat((amount * getRates({ from, to }, rates)).toFixed(2));
};
