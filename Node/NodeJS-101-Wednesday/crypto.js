const crypto = require('crypto');

// createHash(<algorithm>) returns hash
const md5Hash = crypto
	.createHash('md5')
	// hash.update(<data>, <inputEncoding>)
	.update('nodejs', 'utf-8')
	// hash.digest(<encoding>) returns string
	.digest('hex');

console.log(`md5 hash: ${md5Hash}`);

const whirlpoolHash = crypto
	.createHash('whirlpool')
	.update('nodejs', 'utf-8')
	.digest('hex');

console.log(`whirlpool hash: ${whirlpoolHash}`);

// sha1, sha224, sha256, sha384, sha512, ripemd160
