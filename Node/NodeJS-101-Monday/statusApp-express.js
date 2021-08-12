const express = require('express');
const app = express();
const port = 3000;
const {
	arch,
	cpus,
	totalmem,
	freemem,
	hostname,
	networkInterfaces,
} = require('os');
const diskspace = require('diskspace');

app.get('/api', (req, res) => {
	res.send(`<h1>Status App with Express</h1>`);
});

app.get('/api/arch', (req, res) => {
	res.send(`
    <h1>Architecture</h1>
    <p>${arch()}</p>
  `);
});

app.get('/api/cpu', (req, res) => {
	res.send(`
    <h1>CPU</h1>
    <p>${JSON.stringify(cpus())}</p>
  `);
});

app.get('/api/ram', (req, res) => {
	res.send(`
    <h1>RAM</h1>
    <p>Total RAM: ${totalmem()}</p>
    <p>Available RAM: ${freemem()}</p>
  `);
});

app.get('/api/hdd', (req, res) => {
	const result = diskspace.check('C', function (err, result) {
		return result;
	});

	console.log(result);
	res.send(`
    <h1>Disk Space</h1>
    <p>${result}</p>
  `);
});

app.get('/api/hostname', (req, res) => {
	res.send(`
    <h1>Host Name</h1>
    <p>${hostname()}</p>
  `);
});

app.get('/api/ip', (req, res) => {
	res.send(`
    <h1>IP Address</h1>
    <p>${JSON.stringify(networkInterfaces().lo0[0].address)}</p>
  `);
});

app.get('*', (req, res) => {
	res.send(`
    <h1>Oops...!</h1>
    <h2>Page 404</h2>
  `);
});

app.listen(port, () => {
	console.log(`Listening to Port ${port}...`);
});
