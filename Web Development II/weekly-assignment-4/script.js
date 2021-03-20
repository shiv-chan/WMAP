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
let fromCurr;
let toCurr;
let base;
let rateKey;

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
    fetchCurrencies();
    console.log(`Error1: ${err}`);
  }
}

//set options for select input
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

//get currency from selections
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

//convert
async function convert() {
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
    fromAmount.textContent = formatNumber(fromInput.value);
    displayTo.textContent = ` ${toCurr}`;
    toAmount.textContent = `${formatNumber((fromInput.value * rate).toFixed(2))}`;
    toInput.value = `${(fromInput.value * rate).toFixed(2)}`;
    main.style.display = 'flex';
    
  } catch(err) {
    convert();
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

//number formatting
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const startDate = document.querySelector('#startDate');
const endDate = document.querySelector('#endDate');
const showHistoryBtn = document.querySelector('.showHistory');

//get days array
let days = [];
const getDaysArray = (start, end) => {
  for(let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)){
      days.push(new Date(dt).toISOString().split("T")[0]);
  }
  console.log(days);
};


//map days and fetch each data
let rateHistory = [];
const fetchHistory = async(eachDay) => {
  await getCurrency();

  try {
    const res = await fetch(`https://currencyscoop.p.rapidapi.com/historical?base=${base}&date=${eachDay}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": apikey,
        "x-rapidapi-host": "currencyscoop.p.rapidapi.com"
      }
    });

    const data = await res.json();
    if(data.response.rates[rateKey] !== undefined){
      rateHistory.push(data.response.rates[rateKey]);
    } else {
      fetchHistory();
    }
    
  } catch(err) {
    console.log(`Error3: ${err}`);
  }
}

let DateRate = [];
const combineArr = (date, rate) => {
  DateRate = [['Date', 'Rate']];
  for(let i = 0; i < date.length; i++){
    DateRate.push([date[i], rate[i]]);
  }
}

convertBtn.addEventListener('click', convert);
switchBtn.addEventListener('click', switchCurr);
showHistoryBtn.addEventListener('click', () => {
  getDaysArray(new Date(startDate.value), new Date(endDate.value));
  days.map(async (day) => await fetchHistory(day));
  combineArr(days, rateHistory);
  days = [];
  rateHistory = [];
  google.charts.load('current', {'packages':['corechart']});
  google.charts.setOnLoadCallback(drawChart);
});

//google chart
function drawChart() {
  var data = google.visualization.arrayToDataTable(DateRate);

  var options = {
    title: `${selects[0].selectedOptions[0].textContent} / ${selects[1].selectedOptions[0].textContent}`,
    hAxis: {title: 'Date', titleTextStyle: {color: '#333'}},
    vAxis: {title: 'Rate', minValue: 0}
  };

  var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
  chart.draw(data, options);
}