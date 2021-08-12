const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (req, res) {
	console.log(`Listening to Port ${port}...`);

	// res.writeHead(200, {
	// 	'Content-Type': 'text/html',
	// });

	// no try-catch? absolute path?
	fs.readFile('./index.html', (err, data) => {
		if (err) throw err;
		console.log(`Read the File.`);
		res.end(data);
	});
});

server.listen(port);
