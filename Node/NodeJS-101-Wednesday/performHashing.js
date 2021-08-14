const md5 = require('md5');
const fs = require('fs');

const fileName = 'data.txt';
// const fileData = fs.ReadStream(fileName);

fs.readFile(fileName, function (err, buf) {
	console.log(
		`Hash generated using md5\nHashed output is:${md5(
			buf
		)}\nFile name is:${fileName}`
	);
});
