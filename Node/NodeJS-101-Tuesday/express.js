const express = require('express');
const app = express();
const port = 3000;
const osInfo = require('./myModules');

app.get('/osInfo', (req, res) => {
	const html = osInfo().html;
	res.send(html);
});

app.listen(port, () => {
	console.log(`Listening to port ${port}...`);
});
