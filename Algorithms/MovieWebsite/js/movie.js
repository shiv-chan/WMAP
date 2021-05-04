let movieId = parseInt(localStorage.getItem('movie-id'));
let detailData = '';

//get the movie details
async function fetchMovieDetails() {
	await fetch(`https://api.themoviedb.org/3/movie/${movieId}?&language=en-US`, {
		headers: {
			Authorization: `Bearer ${apikey}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
		.then((res) => {
			if (res.status !== 200) {
				console.error(res.status);
			} else {
				return res.json();
			}
		})
		.then((data) => {
			detailData = data;
		})
		.catch((err) => console.error(err));
}

//Set a content
function setContent() {
	const hero = document.querySelector('.hero');
	const content = document.querySelector('.content');
	const imageEndpoint = `http://image.tmdb.org/t/p/w500/`;

	//set a background image
	let imageSrc = '';
	if (detailData.backdrop_path == null) {
		imageSrc = `./assets/primary-full-logo.svg`;
	} else {
		imageSrc = `${imageEndpoint}${detailData.backdrop_path}`;
	}
	const imageHTML = `<img src="${imageSrc}" alt="${detailData.title}">`;
	hero.insertAdjacentHTML('afterbegin', imageHTML);

	//set a poster image

	//set a tagline

	//set a content
	const genres = detailData.genres
		.map((genre) => {
			return `<span class="genre">${genre.name}</span>`;
		})
		.join('');

	const productions = detailData.production_companies
		.map((company) => {
			return company.name;
		})
		.join(', ');

	const contentHTML = `
  <h1>${detailData.title}</h1>
  <ul>
    <li class="genres">${genres}</li>
    <li class="production">${
			productions ? 'Productions:' : ''
		} ${productions}</li>
    <li class="homepage"><a href="${detailData.homepage}" target="_blanc">${
		detailData.homepage
	}</a></li>
  </ul>
  <h3>Synopsis</h3>
  <p>${detailData.overview}</p>
  `;

	content.insertAdjacentHTML('beforeend', contentHTML);
}

async function showDetails() {
	await fetchMovieDetails();
	await setContent();
}

showDetails();
