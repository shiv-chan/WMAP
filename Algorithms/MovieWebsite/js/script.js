const apikey = api_keys.API_KEY;
let allData = [];

//fetch the data of now playing
//show them on the top page list
async function fetchNowPlaying() {
	await fetch(`https://api.themoviedb.org/3/movie/now_playing?region=CA`, {
		headers: {
			Authorization: `Bearer ${apikey}`,
			'Content-Type': 'application/json;charset=utf-8',
		},
	})
		.then((res) => {
			if (res.status !== 200) {
				console.error(`Error: ${res.status}`);
			} else {
				return res.json();
			}
		})
		.then((data) => {
			allData.push(...data.results);
			// displayMoviePosters();
		})
		.catch((err) => console.error(err));
}

//make the movie posters to display now-playing movies
const movieList = document.querySelector('.movie-list');
const hero = document.querySelector('.hero');
const imageEndpoint = `http://image.tmdb.org/t/p/w500/`;

async function displayMoviePosters() {
	for (let data of allData) {
		let posterImage;
		if (data.poster_path == null) {
			posterImage = `https://dummyimage.com/500x750/8ac4c0/ffffff&text=${data.title}`;
		} else {
			posterImage = `${imageEndpoint}${data.poster_path}`;
		}
		const moviePoster = `
			<div class="movie-poster">
				<div class="card" style="width: 18rem">
					<img
						src="${posterImage}"
						class="card-img-top"
						alt="${data.title}"
					/>
					<div class="card-body">
						<h5 class="card-title">${data.title}</h5>
						<p class="card-text">
							<span class="duration">100 min.</span
							><span class="ratings">G</span>
						</p>
					</div>
					<div class="movie-poster-overlay">
						<a href="/movie.html">Book Ticket</a>
					</div>
				</div>
			</div>
			`;

		movieList.insertAdjacentHTML('beforeend', moviePoster);

		if (data.backdrop_path !== null) {
			const image = `<img src="${imageEndpoint}${data.backdrop_path}" alt="${data.title}">`;
			hero.insertAdjacentHTML('beforeend', image);
		}
	}
}

//hero image slider
const images = hero.getElementsByTagName('img');
let index = images.length - 1;

function heroImageSwitch() {
	if (index > 0) {
		images[index].style.opacity = 0;
		index--;
	} else if (index <= 0) {
		Array.from(images).map((image) => (image.style.opacity = 1));
		index = images.length - 1;
	}
}

//Set a home page
async function setHomePage() {
	await fetchNowPlaying();
	await displayMoviePosters();
	heroImageSwitch();
	setInterval(heroImageSwitch, 3000);
}

setHomePage();
