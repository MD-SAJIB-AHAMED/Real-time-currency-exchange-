const apiURL = 'https://api.exchangerate.host/symbols';
const fromCurrency = document.getElementById('from-currency');
const toCurrency   = document.getElementById('to-currency');
const amountInput  = document.getElementById('amount');
const convertBtn   = document.getElementById('convert-btn');
const resultDiv    = document.getElementById('result');

// Load currency list
fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const symbols = data.symbols;
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';

    for (let key in symbols) {
      const option1 = document.createElement('option');
      option1.value = key;
      option1.textContent = `${key} - ${symbols[key].description}`;

      const option2 = option1.cloneNode(true);

      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    }

    fromCurrency.value = 'USD';
    toCurrency.value = 'BDT';
  })
  .catch(error => {
    console.error('Error loading symbols:', error);
    resultDiv.textContent = 'Error loading currency list.';
  });

// Convert
convertBtn.addEventListener('click', () => {
  const from = fromCurrency.value;
  const to   = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!from || !to || isNaN(amount)) {
    resultDiv.textContent = 'Please select currencies and enter valid amount.';
    return;
  }

  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== undefined) {
        resultDiv.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
      } else {
        resultDiv.textContent = 'Conversion failed.';
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.textContent = 'Conversion error. Please check your internet.';
    });
});