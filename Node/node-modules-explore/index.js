const { json } = require('express');
const express = require('express');
const app = express();
const port = 5500;
const fs = require('fs');
const os = require('os');
const path = require('path');

const cpuArc = os.arch();
const load = os.loadavg();
const ram = os.totalmem();

const directories = path.dirname(__dirname);

let userData = [];

fs.readFile(path.join(__dirname, './userData.json'), (err, data) => {
	if (err) throw err;
	userData.push(...JSON.parse(data));
});

app.get('/', (req, res) => {
	res.send(`
  <h1>Node Modules</h1>
  <section>
    <ul>
      <li>CPU architecture: ${cpuArc}</li>
      <li>Load avarages: ${load}</li>
      <li>RAM: ${ram}</li>
      <li>Directories: ${directories}</li>
    </ul>
  </section>
  <section>
    <h2>User Data</h2>
    ${userData
			.map(
				(user) =>
					`
    <hr/>
    <ul>
      <li>${user.name}</li>
      <li>${user.username}</li>
      <li>${user.email}</li>
    </ul>
  `
			)
			.join('')}
  </section>
  `);
});

app.listen(port, () => {
	console.log(`On port ${port}`);
	console.log(userData);
});
