const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert');

// Load currency symbols
async function loadCurrencies() {
try {
const response = await fetch('https://api.frankfurter.app/currencies');
const currencies = await response.json();

for (const code in currencies) {
const option1 = document.createElement('option');
option1.value = code;
option1.text = ${code} - ${currencies[code]};

const option2 = option1.cloneNode(true);

fromCurrency.appendChild(option1);
toCurrency.appendChild(option2);
}

fromCurrency.value = 'USD';
toCurrency.value = 'EUR';

} catch (error) {
result.innerText = 'Failed to load currencies.';
console.error(error);
}
}

// Convert Currency
convertBtn.addEventListener('click', async () => {
const from = fromCurrency.value;
const to = toCurrency.value;
const amt = amount.value;

if (!from || !to || !amt || amt <= 0) {
result.innerText = 'Please enter a valid amount.';
return;
}

if (from === to) {
result.innerText = ${amt} ${from} = ${amt} ${to};
return;
}

try {
result.innerText = 'Converting...';
const response = await fetch(https://api.frankfurter.app/latest?amount=${amt}&from=${from}&to=${to}`);
const data = await response.json();

const convertedAmount = data.rates[to].toFixed(2);
result.innerText = ``${amt} {convertedAmount} ${to}`;
} catch (error) {
result.innerText = 'Conversion failed.';
console.error(error);
}
});

// Load currencies on page load
window.addEventListener('DOMContentLoaded', loadCurrencies);