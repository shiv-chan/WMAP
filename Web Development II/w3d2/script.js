const input = document.querySelector('input[type="text"]');
const btn = document.querySelector('button[type="submit"]');
const tBody = document.querySelector('tbody');
const tableRow = document.getElementsByTagName('tr');
const noFound = document.querySelector('.noFound');

const users = [];

fetch('https://jsonplaceholder.typicode.com/users')
	.then((res) => {
		if (res.status !== 200) {
			console.log(`Error: ${res.status}`);
		}
		return res.json();
	})
	.then((data) => users.push(...data))
	.catch((err) => console.log(`Error: ${err}`));

function showData() {
	const tableData = users.map((user) => {
			return `<tr><td class="id">${user.id}</td><td class="name">${user.name}</td><td class="username">${user.username}</td><td class="email">${user.email}</td></tr>`;
		}).join('');

	tBody.innerHTML = tableData;
}

function updateData(arr) {
	const tableData = arr.map((user) => {
      const regex = new RegExp(input.value, 'g');
      const userId = user.id.toString().replace(regex, `<span class='hl'>${input.value}</span>`);

			return `<tr><td class="id">${userId}</td><td class="name">${user.name}</td><td class="username">${user.username}</td><td class="email">${user.email}</td></tr>`;
		})
		.join('');

	tBody.innerHTML = tableData;
}

window.addEventListener('load', showData);

btn.addEventListener('click', function (e) {
	e.preventDefault();
	const inputUserId = parseInt(input.value);

	const filteredUsers = users.filter((user) => {
    const regex = new RegExp(input.value, 'g');
		return user.id.toString().match(regex);
	});
  
	if (filteredUsers.length !== 0) {
    updateData(filteredUsers);
		noFound.classList.remove('show');
	} else if (filteredUsers.length <= 0) {
    updateData(filteredUsers);
		noFound.classList.add('show');
	}
  document.form.reset();
});
