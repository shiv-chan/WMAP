const button = document.querySelector('button');
const container = document.querySelector('.container');
const books = [];

const endpoint = 'https://www.anapioficeandfire.com/api/books?pageSize=30';

const fetchData = () => {
  fetch(endpoint)
    .then (res => res.json())
    .then (data => books.length == 0 ? books.push(...data) : '')
    .catch (e => console.log('Error:', e))
}

fetchData();

async function displayCards(){
  await fetchData();

  document.body.style.height = '100%';

  const html = books.map((book, index) => {
    const number = index + 1;
    const title = book.name;
    const author = book.authors;
    const pages = book.numberOfPages;
    const country = book.country;
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'};
    const releasedDate = new Date(book.released).toLocaleString('en-CA', options);
    const regex = /(\.|,)/g;
    const released = releasedDate.replace(regex, '');

    return `
    <div class="card">
				<h2>Book ${number}</h2>
				<h1>${title}</h1>
				<p>✍️: ${author}</p>
				<p>📖: ${pages} pages</p>
				<p>🌐: ${country}</p>
				<p>⏰: ${released}</p>
		</div>
    `
  }).join('');

  console.log(html);
  container.innerHTML = html;
}

button.addEventListener('click', displayCards);

