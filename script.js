const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const exchangeRate = document.getElementById('exchangeRate');
const convertBtn = document.getElementById('convert');

// কারেন্সি কোড এবং সিম্বল/ফ্ল্যাগ ম্যাপ
const currencyList = {
"SAR": "🇸🇦 Saudi Arabia (SAR - ﷼)",
"BDT": "🇧🇩 Bangladesh (BDT - ৳)",
"USD": "🇺🇸 United States (USD - )",
"AUD": "🇦🇺 Australia (AUD - )"
};

// কারেন্সি লিস্ট লোড করার ফাংশন
async function loadCurrencies() {
try {
const response = await fetch('https://open.er-api.com/v6/latest/USD');
const data = await response.json();
const apiCurrencies = data.rates;

fromCurrency.innerHTML = '';
toCurrency.innerHTML = '';

// কাস্টম লিস্ট থেকে অপশন তৈরি
for (const code in currencyList) {
if (apiCurrencies[code]) {
const option1 = new Option(currencyList[code], code);
const option2 = new Option(currencyList[code], code);

fromCurrency.add(option1);
toCurrency.add(option2);
}
}

// বাকী সকল দেশের কারেন্সি যোগ করার জন্য
for (const code in apiCurrencies) {
if (!currencyList[code]) {
const option1 = new Option(${code}, code); const option2 = new Option(``${code}, code);

fromCurrency.add(option1);
toCurrency.add(option2);
}
}

// ডিফল্ট সিলেক্ট: Saudi Arabia (SAR) -> Bangladesh (BDT)
fromCurrency.value = 'SAR';
toCurrency.value = 'BDT';

} catch (error) {
result.innerText = 'Failed to load country list.';
console.error(error);
}
}

// কারেন্সি কনভার্ট করার ফাংশন
async function convertCurrency() {
const from = fromCurrency.value;
const to = toCurrency.value;
const amt = parseFloat(amount.value);

if (!amt || amt <= 0) {
result.innerText = 'Please enter a valid amount.';
exchangeRate.innerText = '';
return;
}

result.innerText = 'Converting...';
exchangeRate.innerText = '';

try {
const response = await fetch(https://open.er-api.com/v6/latest/${from}`);
const data = await response.json();

if (data.result === "success") {
const rate = data.rates[to];
const totalAmount = (amt * rate).toFixed(2);

// মূল রেজাল্ট
result.innerText = ``${amt} {totalAmount} ${to};

// নিচে ১ ইউনিট কারেন্সির বর্তমান রেট দেখাবে
exchangeRate.innerText = Current Rate: 1${from} = {to}`;
} else {
result.innerText = 'Conversion error!';
}
} catch (error) {
result.innerText = 'Failed to fetch conversion rate.';
console.error(error);
}
}

// ইভেন্ট লিসেনার
convertBtn.addEventListener('click', convertCurrency);
window.addEventListener('DOMContentLoaded', loadCurrencies);