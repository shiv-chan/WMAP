const {
	arch,
	cpus,
	totalmem,
	freemem,
	hostname,
	networkInterfaces,
} = require('os');
const process = require('process');
const diskspace = require('diskspace');

// node yourapp.js -arch ----> shows architecture
// node yourapp.js -cpu ----> shows cpus

// node yourapp.js -ram----> shows ram

// node yourapp.js -hdd----> shows disk space

// node yourapp.js -hostname ----> shows hostname

// node yourapp.js -ip ----> shows ip address

const isHyphen = process.argv[2].startsWith('-');

if (isHyphen) {
	const command = process.argv[2];

	switch (command) {
		case '-arch':
			console.log(arch());
			break;
		case '-cpu':
			console.log(JSON.stringify(cpus()));
			break;
		case '-ram':
			console.log(`Total RAM: ${totalmem()}\nAvailable RAM: ${freemem()}`);
			break;
		case '-hdd':
			diskspace.check('C', function (err, result) {
				console.log(JSON.stringify(result));
			});
			break;
		case '-hostname':
			console.log(hostname());
			break;
		case '-ip':
			console.log(JSON.stringify(networkInterfaces().lo0[0].address));
			break;
		case '-help':
			console.info(
				'-arch ---> shows architecture\n-cpu ---> shows cpus\n-ram ---> shows ram\n-hdd ---> shows disk spae\n-hostname ---> shows host name\n-ip ---> shows ip address'
			);
			break;
		default:
			console.log(
				'Please type the valid command. To see commands, type "-help".'
			);
	}
} else {
	console.log('Please type the valid command. To see commands, type "-help".');
}
