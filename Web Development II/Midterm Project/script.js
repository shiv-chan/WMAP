const input = document.querySelector('input[type="text"]');
const updateBtn = document.querySelector('i.fa-sync-alt');
const date = document.querySelector('.date');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const weatherMain = document.querySelector('.weatherMain');
const weatherDescription = document.querySelector('.weatherDescription');
const kanji = document.querySelector('.kanji');
const presentTemp = document.querySelector('.presentTemp');
const maxTemp = document.querySelector('.maxTemp');
const minTemp = document.querySelector('.minTemp');
const feelsLike = document.querySelector('.feelsLike');
const humidity = document.querySelector('.humidity');
const sunrise = document.querySelector('.sunrise');
const sunset = document.querySelector('.sunset');
const lookup = require('country-code-lookup'); 
let allData = [];

//fetch data of Vancouver by default
fetch(`http://api.openweathermap.org/data/2.5/weather?q=vancouver&appid=22fafb856d9955a1dbb7727e950adf36`)
    .then((res) => {
      if(res.status !== 200){
        console.log(`Error: ${res.status}`)
      }
      return res.json();
    })
    .then((data) => {
      allData = data;
      console.log(data);
    })
    .catch((err) => console.log(`Error: ${err}`))

//fetch data function
const fetchData = () => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=22fafb856d9955a1dbb7727e950adf36`)
    .then((res) => {
      if(res.status !== 200){
        console.log(`Error: ${res.status}`)
      }
      return res.json();
    })
    .then((data) => {
      allData = data;
      console.log(data);
    })
    .catch((err) => console.log(`Error: ${err}`))
}

const updateContent = (arr) => {
  //date
  const unixTimestamp = allData.dt;
  const milliseconds = unixTimestamp * 1000;
  const dateObj = new Date(milliseconds);
  const shownDate = (`${dateObj.toLocaleString('en-CA', {month: 'long'})} ${dateObj.toLocaleString("en-CA", {day: "numeric"})}, ${dateObj.toLocaleString("en-CA", {weekday: "long"})}`);
  date.textContent = shownDate;

  //city & country
  city.textContent = arr.name;
  const countryCode = arr.sys.country;
  const countryName = lookup.byIso(countryCode).country;
  country.textContent = countryName;
}


// Hook up the event listeners
input.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    fetchData();
  }
})

updateBtn.addEventListener('click', fetchData);
