const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convert');

// Load currency symbols
async function loadCurrencies() {
  try {
    const response = await fetch('https://api.exchangerate.host/symbols');
    const data = await response.json();
    const symbols = data.symbols;

    for (const key in symbols) {
      const option1 = document.createElement('option');
      option1.value = key;
      option1.text = `${key} - ${symbols[key].description}`;

      const option2 = option1.cloneNode(true);

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    fromCurrency.value = 'USD';
    toCurrency.value = 'BDT';

  } catch (error) {
    result.innerText = 'Failed to load currencies.';
    console.error(error);
  }
}

convertBtn.addEventListener('click', async () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (!from || !to || !amt) return;

  try {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amt}`);
    const data = await response.json();

    result.innerText = `${amt} ${from} = ${data.result.toFixed(2)} ${to}`;
  } catch (error) {
    result.innerText = 'Conversion failed.';
    console.error(error);
  }
});

// Load currencies on page load
window.addEventListener('DOMContentLoaded', loadCurrencies);