const header = document.querySelector('header');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort');
const submitBtn = document.querySelector('button[type="submit"]');
const loopWrap = document.querySelector('.loop-wrap');
const imageWrap1 = document.querySelector('.image-wrap1');
const imageWrap2 = document.querySelector('.image-wrap2');
const spinner = document.getElementById("spinner");

let allData = [];

const corsAccess = 'https://cors-anywhere.herokuapp.com/'
let endpoint = `${corsAccess}https://api.yelp.com/v3/businesses/search?term=bubble+tea&limit=50`;
const apikey = config.YELP_API_KEY;

const fetchData = async() => {
  try {
    spinner.removeAttribute('hidden');
    const res = await fetch(`${endpoint}&location=${searchInput.value == '' ? 'Vancouver, BC' : searchInput.value}`, {
      headers: {
        'Authorization': `Bearer ${apikey}`
        }
      })
    const data = await res.json();
    allData.push(...data.businesses);
    spinner.setAttribute('hidden', '');
    console.log(allData);
  } catch (err) {
    console.error('Error: ', err);
  }
}

async function imageForLoopWrap () {
  await fetchData();
  const imageGroup1 = [];
  const imageGroup2 = [];

  const halfPoint = allData.length / 2;
  
  for(let i = 0; i < halfPoint; i++){
    imageGroup1.push(`<img src=${allData[i].image_url}>`);
  }

  for(let j = halfPoint; j < allData.length; j++){
    imageGroup2.push(`<img src=${allData[j].image_url}>`);
  }
  
  imageWrap1.innerHTML = imageGroup1.join('');
  imageWrap2.innerHTML = imageGroup2.join('');
}

function displayCards() {
  const html = allData.map((business) => {
    return `
      <a class="card" href=${business.url}>
        <div class="image" style="background-image: url(${business.image_url})"></div>
        <div class="description">
        <h1>${business.name}</h1>
        <div>
          ${business.is_closed ? '<p style="background-color: red">Closed</p>' : '<p>Open</p>'}
          <p>${formatNumber((Math.round(business.distance) / 1000).toFixed(2))} km from the location</p>
          <p><i class="fas fa-star"></i>${business.rating}</p>
          <p>${business.review_count} reviews</p>
        </div>
          <ul>
            <li>${business.location.display_address.join(', ')}</li>
            <li>${business.display_phone}</li>
          </ul>
        </div>
      </a>
    `
  }).join('');

  container.innerHTML = html;
  container.style.display = 'block';

  searchInput.value = '';
}

async function createCards() {
  loopWrap.style.display = 'none';
  container.style.display = 'none';
  allData = [];
  await fetchData();
  displayCards();
}

function sort() {
  const sortBy = sortSelect.selectedOptions[0].textContent;
  if(allData.length !== 0){
    if(sortBy === 'Rating'){
      allData.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Review Count'){
      allData.sort((a, b) => b.review_count - a.review_count);
    } else if (sortBy === 'Distance'){
      allData.sort((a, b) => a.distance - b.distance);
    }
    displayCards();
  }
}

//number formatting
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

document.addEventListener('DOMContentLoaded', imageForLoopWrap)
submitBtn.addEventListener('click', createCards);
searchInput.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    createCards();
  }
})
sortSelect.addEventListener('change', sort);
