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
	let posterSrc = '';
	if (detailData.poster_path == null) {
		posterSrc = `https://dummyimage.com/500x750/8ac4c0/ffffff&text=${detailData.title}`;
	} else {
		posterSrc = `${imageEndpoint}${detailData.poster_path}`;
	}
	const posterHTML = `
	<div class="poster" style="width: 30%;">
  	<img src="${posterSrc}" alt="${detailData.title}">
	</div>`;
	hero.insertAdjacentHTML('beforebegin', posterHTML);

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
	<div class="title-book">
  <h1>${detailData.title}</h1>
	<button type="button" class="btn btn-success">Book ticket</button>
	</div>
  <ul>
    <li class="genres">${genres}</li>
		<li class="duration">${detailData.runtime} min.</li>
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
