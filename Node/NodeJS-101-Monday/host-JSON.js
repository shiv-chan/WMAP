const http = require('http');
const fs = require('fs');
const port = 3000;

const server = http.createServer(function (req, res) {
	console.log(`Listening to Port ${port}...`);

	let json_response = {
		status: 200,
		message: 'succssful',
		result: ['sunday', 'monday', 'tuesday', 'wednesday'],
		code: 2000,
	};
	console.log('Server Running');
	res.end(JSON.stringify(json_response));
});

server.listen(port);
