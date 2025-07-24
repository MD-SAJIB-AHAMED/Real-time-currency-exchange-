const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const swapBtn = document.getElementById('swap-btn');
const historyList = document.getElementById('history-list');

function updateFlag(selectEl, flagImg) {
  const countryCode = selectEl.value.slice(0, 2);
  flagImg.src = `https://flagsapi.com/${countryCode}/flat/32.png`;
}

// Populate dropdowns
fetch('https://api.exchangerate.host/symbols')
  .then(res => res.json())
  .then(data => {
    const symbols = data.symbols;
    for (let code in symbols) {
      const opt1 = document.createElement('option');
      opt1.value = code;
      opt1.textContent = `${code}`;

      const opt2 = opt1.cloneNode(true);

      fromCurrency.appendChild(opt1);
      toCurrency.appendChild(opt2);
    }

    fromCurrency.value = 'USD';
    toCurrency.value = 'BDT';
    updateFlag(fromCurrency, fromFlag);
    updateFlag(toCurrency, toFlag);
  });

// Update flags on change
fromCurrency.addEventListener('change', () => updateFlag(fromCurrency, fromFlag));
toCurrency.addEventListener('change', () => updateFlag(toCurrency, toFlag));

// Swap button
swapBtn.addEventListener('click', () => {
  let temp = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = temp;
  updateFlag(fromCurrency, fromFlag);
  updateFlag(toCurrency, toFlag);
});

// Convert logic
convertBtn.addEventListener('click', () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amount = parseFloat(amountInput.value);

  if (!from || !to || isNaN(amount)) {
    resultDiv.textContent = 'Enter valid amount and select currencies.';
    return;
  }

  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== undefined) {
        const converted = data.result.toFixed(2);
        const resultText = `${amount} ${from} = ${converted} ${to}`;
        resultDiv.textContent = resultText;

        // Add to history
        const li = document.createElement('li');
        li.textContent = resultText;
        historyList.prepend(li);
        if (historyList.children.length > 5) {
          historyList.removeChild(historyList.lastChild);
        }
      } else {
        resultDiv.textContent = 'Conversion failed.';
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.textContent = 'Error fetching conversion.';
    });
});