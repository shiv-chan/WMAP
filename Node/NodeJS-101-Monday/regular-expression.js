const { argv } = require('process');

const password = argv[2];

// Password at least 6 digits
// At least one lowercase
// At least one uppercase
// At least one special character from @ # $ % ^ & *
const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[@#$%^&*]).{6,}$/;

if (Boolean(password)) {
	const matches = password.match(regex);
	if (matches) {
		console.log('Valid Password!');
	} else {
		console.log(
			'Invalid Password...\nPlease enter at least 6 charactors include at least one lowercase and uppercase letter and one of the following special charactors: @ # $ % ^ & *.'
		);
	}
}
