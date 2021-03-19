const apikey = api_keys.API_KEY;
const currencies = [];
const selects = document.querySelectorAll('select');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
const switchBtn = document.querySelector('.switch');
const convertBtn = document.querySelector('button[type="submit"]');
const displayFrom = document.querySelector('.from');
const displayTo = document.querySelector('.to');
const fromAmount = document.querySelector('.fromAmount');
const toAmount = document.querySelector('.toAmount');
const main = document.querySelector('main');

window.onload = setOptions;

const fetchCurrencies = async() => {
  try {
    const res = await fetch("https://currencyscoop.p.rapidapi.com/currencies", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "currencyscoop.p.rapidapi.com"
      }
    });

    const data = await res.json();
    Object.keys(data.response.fiats).map((key) => currencies.push(data.response.fiats[key]))
  } catch(err) {
    console.log(`Error1: ${err}`);
  }
}

async function setOptions() {
  await fetchCurrencies();

  const options = [];
  for(let currency of currencies){
    options.push(`<option value=${currency.currency_name}>${currency.currency_name}</option>`);
  }

  for(let select of selects){
    select.innerHTML = options;
  }
}

//convert
async function convert() {
  let fromCurr;
  let toCurr;
  let base;
  let rateKey;

  function getCurrency(){
      //selected currencies
      fromCurr = selects[0].selectedOptions[0].textContent;
      toCurr = selects[1].selectedOptions[0].textContent;
      
      //get currency code according to currency name
      if(fromCurr !== ''){
        const index = currencies.findIndex((obj) => obj.currency_name == fromCurr);
        base = currencies[index].currency_code;
      }

      if(toCurr !== ''){
        const index = currencies.findIndex((obj) => obj.currency_name == toCurr);
        rateKey = currencies[index].currency_code;
      }
    }

      await getCurrency();

      try {const res = await fetch(`https://currencyscoop.p.rapidapi.com/latest?base=${base}`, {
          "method": "GET",
          "headers": {
            "x-rapidapi-key": apikey,
            "x-rapidapi-host": "currencyscoop.p.rapidapi.com"
          }
        });

    const data = await res.json();
    const rate = data.response.rates[rateKey];
    
    //display results

    displayFrom.textContent = ` ${fromCurr}`;
    fromAmount.textContent = fromInput.value;
    displayTo.textContent = ` ${toCurr}`;
    toAmount.textContent = `${(fromInput.value * rate).toFixed(2)}`;
    toInput.value = `${(fromInput.value * rate).toFixed(2)}`;
    main.style.display = 'flex';
    
  } catch(err) {
    console.log(`Error2: ${err}`);
  }
}

//switch each input's value
function switchCurr() {
    let tmpInput = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = tmpInput;

    let tmpSelect = selects[0].selectedOptions[0].textContent;
    selects[0].selectedOptions[0].textContent = selects[1].selectedOptions[0].textContent;
    selects[1].selectedOptions[0].textContent = tmpSelect;
}


convertBtn.addEventListener('click', convert);
switchBtn.addEventListener('click', switchCurr);
