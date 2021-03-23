const header = document.querySelector('header');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort');
const submitBtn = document.querySelector('button[type="submit"]');

let allData = [];

const corsAccess = 'https://cors-anywhere.herokuapp.com/'
let endpoint = `${corsAccess}https://api.yelp.com/v3/businesses/search?term=bubble+tea&limit=50`;
const apikey = config.YELP_API_KEY;

const fetchData = async() => {
  try {
    const res = await fetch(`${endpoint}&location=${searchInput.value == '' ? 'Vancouver, BC' : searchInput.value}`, {
      headers: {
        'Authorization': `Bearer ${apikey}`
        }
      })
    const data = await res.json();
    allData.push(...data.businesses);
    console.log(allData);
  } catch (err) {
    console.error('Error: ', err);
  }
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
  }).join();

  container.innerHTML = html;

  searchInput.value = '';
}

async function createCards() {
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

submitBtn.addEventListener('click', createCards);
searchInput.addEventListener('keyup', (e) => {
  if(e.key === 'Enter'){
    createCards();
  }
})
sortSelect.addEventListener('change', sort);
