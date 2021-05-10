const playBtn = document.querySelector('.playBtn');
let movieId = parseInt(localStorage.getItem('movie-id'));
let detailData;
let videoKey;
let casts;

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

//get the trailer
async function fetchTrailer() {
	await fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/videos?&type=Trailer&site=YouTube&language=en-US`,
		{
			headers: {
				Authorization: `Bearer ${apikey}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
		}
	)
		.then((res) => {
			if (res.status !== 200) {
				console.error(res.status);
			} else {
				return res.json();
			}
		})
		.then((data) => {
			videoKey = data.results[0].key;
		})
		.catch((err) => console.error(err));
}

//get the casts
async function fetchCast() {
	fetch(
		`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
		{
			headers: {
				Authorization: `Bearer ${apikey}`,
				'Content-Type': 'application/json;charset=utf-8',
			},
		}
	)
		.then((res) => {
			if (res.status !== 200) {
				console.error(res.status);
			} else {
				return res.json();
			}
		})
		.then((data) => {
			casts = data.cast.map((cast) => cast.name);
		})
		.catch((err) => console.error(err));
}

//Set a content
function setContent() {
	const hero = document.querySelector('.hero');
	const content = document.querySelector('.content');
	const imageEndpoint = `http://image.tmdb.org/t/p/w500/`;

	//set a background image
	let imageSrc;
	detailData.backdrop_path == null
		? (imageSrc = `./assets/primary-full-logo.svg`)
		: (imageSrc = `${imageEndpoint}${detailData.backdrop_path}`);

	const imageHTML = `<img src="${imageSrc}" alt="${detailData.title}">`;
	hero.insertAdjacentHTML('afterbegin', imageHTML);

	//set a trailer video
	if (videoKey) {
		const videoHTML = `<iframe class="video" src="https://www.youtube.com/embed/${videoKey}"></iframe>`;
		hero.insertAdjacentHTML('beforeend', videoHTML);
	} else {
		playBtn.style.display = 'none';
	}

	//set a poster image
	let posterSrc;
	detailData.poster_path == null
		? (posterSrc = `https://dummyimage.com/500x750/8ac4c0/ffffff&text=${detailData.title}`)
		: (posterSrc = `${imageEndpoint}${detailData.poster_path}`);

	const posterHTML = `
	<div class="poster" style="width: 30%;">
  	<img src="${posterSrc}" alt="${detailData.title}">
	</div>`;
	hero.insertAdjacentHTML('beforebegin', posterHTML);

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

	const castsHTML = casts
		.map((cast) => {
			return `${cast}`;
		})
		.join(', ');

	//set a content
	const contentHTML = `
	<div class="title-book">
  <h1>${detailData.title}</h1>
	<a href="/booking.html"><button type="button" class="btn btn-success">Book ticket</button></a>
	</div>
  <ul>
    <li class="genres">${genres}</li>
		<li class="duration"><span class="content-header">Runtime: </span><br>${
			detailData.runtime
		} min.</li>
    <li class="production">${
			productions ? '<span class="content-header">Productions: </span><br>' : ''
		} ${productions}</li>
		<li class="casts"><span class="content-header">Casts: </span><br>${castsHTML}</li>
    <li class="homepage"><a href="${detailData.homepage}" target="_blanc">${
		detailData.homepage
	} <i class="fas fa-external-link-alt"></i></a></li>
  </ul>
  <h3>Synopsis:</h3>
  <p>${detailData.overview}</p>
  `;

	content.insertAdjacentHTML('beforeend', contentHTML);
}

// play the button for a trailer
const playButton = document.querySelector('.playBtn');
function playTrailer(e) {
	console.log(e.target);
	e.stopPropagation();
	const video = document.querySelector('.video');
	video.classList.add('video-on');
	const youtubeURL = video.getAttribute('src');
	if (youtubeURL.indexOf('?autoplay=1') == -1) {
		video.setAttribute(
			'src',
			`https://www.youtube.com/embed/${videoKey}?autoplay=1`
		);
	}
}

playButton.addEventListener('click', playTrailer);

// close a trailer
function closeTrailer(e) {
	const video = document.querySelector('.video');
	video.classList.remove('video-on');
	const youtubeURL = video.getAttribute('src');
	if (youtubeURL.indexOf('?autoplay=1') !== -1) {
		video.setAttribute(
			'src',
			`https://www.youtube.com/embed/${videoKey}?autoplay=0`
		);
	}
}

document.addEventListener('click', closeTrailer);

async function showDetails() {
	await fetchMovieDetails();
	await fetchCast();
	await fetchTrailer();
	setContent();
}

try {
	showDetails();
} catch (err) {
	console.error(`You've got the error: ${err}`);
}
