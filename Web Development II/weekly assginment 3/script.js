const input = document.querySelector('input[type="text"]');
const btn = document.querySelector('button[type="submit"]');
const tBody = document.querySelector('tbody');
const tableRow = document.getElementsByTagName('tr');
const noFound = document.querySelector('.noFound');

const photos = [];

fetch('https://jsonplaceholder.typicode.com/photos?_limit=500')
	.then((res) => {
		if (res.status !== 200) {
			console.log(`Error: ${res.status}`);
		}
		return res.json();
	})
	.then((data) => photos.push(...data)) //pass all data to photos array
	.then(() => updateData(photos))
	.catch((err) => console.log(`Error: ${err}`));


function updateData(arr) {
	const tableData = arr.map((photo) => {
			const regex = new RegExp(`^${input.value}`); //begin-with match
			const photoId = photo.id.toString().replace(regex, `<span class='hl'>${input.value}</span>`); //highlight matches

			return `<tr><td class="id">${photoId}</td><td class="albumId">${photo.albumId}</td><td class="title">${photo.title}</td><td class="image"><img src="${photo.url}"></td><td class="thumbnail"><img src="${photo.thumbnailUrl}"></td></tr>`;
		})
		.join('');

	tBody.innerHTML = tableData;
}

//onload
//window.addEventListener('load', showData);

//click button
btn.addEventListener('click', function (e) {
	e.preventDefault();
	const inputPhotoId = parseInt(input.value);

	const filteredPhotos = photos.filter((photo) => {
		const regex = new RegExp(`^${input.value}`); //begin-with match
		return photo.id.toString().match(regex);
	});

	if (filteredPhotos.length !== 0) {
		updateData(filteredPhotos);
		noFound.classList.remove('show');
	} else if (filteredPhotos.length <= 0) {
		updateData(filteredPhotos);
		noFound.classList.add('show');
	}
	document.form.reset();
});
