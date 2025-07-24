const apiURL = 'https://api.exchangerate.host/latest';

// DOM Elements
const fromCurrency = document.getElementById('from-currency');
const toCurrency   = document.getElementById('to-currency');
const amountInput  = document.getElementById('amount');
const convertBtn   = document.getElementById('convert-btn');
const resultDiv    = document.getElementById('result');

// প্রাথমিক কারেন্সি লোড
fetch(apiURL)
  .then(res => res.json())
  .then(data => {
    const rates = data.rates;
    const currencies = Object.keys(rates);
    currencies.forEach(cur => {
      const opt1 = document.createElement('option');
      opt1.value = cur; opt1.textContent = cur;
      const opt2 = opt1.cloneNode(true);
      fromCurrency.append(opt1);
      toCurrency.append(opt2);
    });
    // Default select
    fromCurrency.value = 'USD';
    toCurrency.value   = 'BDT';
  });

// রূপান্তর ফাংশন
convertBtn.addEventListener('click', () => {
  const from = fromCurrency.value;
  const to   = toCurrency.value;
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount)) {
    resultDiv.textContent = 'একটি সঠিক সংখ্যা প্রবেশ করান!';
    return;
  }

  fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
    .then(res => res.json())
    .then(data => {
      if (data.result !== undefined) {
        resultDiv.textContent = `${amount} ${from} = ${data.result.toFixed(2)} ${to}`;
      } else {
        resultDiv.textContent = 'রেট পাওয়া যায়নি, পরে চেষ্টা করুন।';
      }
    })
    .catch(err => {
      console.error(err);
      resultDiv.textContent = 'ইন্টারনেট সমস্যা!';
    });
});