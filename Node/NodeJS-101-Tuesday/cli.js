const osInfo = require('./myModules');
const { argv } = require('process');

const command = argv[2];

if (command === '--os-info') {
	const osInfoObj = osInfo();
	const arr = Object.entries(osInfoObj);
	for (let i = 0; i < arr.length - 2; i++) {
		if (typeof arr[i][1] === 'object') {
			console.log(`${arr[i][0]}: ${JSON.stringify(arr[i][1])}`);
		} else {
			console.log(`${arr[i][0]}: ${arr[i][1]}`);
		}
	}
} else {
	console.log('Please try again. *type command "--os-info".');
}
