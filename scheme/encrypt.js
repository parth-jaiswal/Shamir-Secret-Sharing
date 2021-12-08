const { split, join } = require('./Scheme');
const { randomBytes } = require('crypto');
const saveArrayAsFile = require('../scripts/saveArrayAsFile');
const fs = require('fs');
const decrypt = require("./decrypt");

function encrypt(filepath, n, k) {
    n = 5, k = 3;
    filepath = "../aesEncrypted/encrypted.txt";
    const secret = fs.readFileSync(filepath, 'utf8');
			// you can use any polyfill to covert between strings and Uint8Array
		const utf8Encoder = new TextEncoder();
		const utf8Decoder = new TextDecoder();
		const secretBytes = utf8Encoder.encode(secret);
		// console.log(secretBytes)
		// parts is a map of part numbers to Uint8Array
		const parts = split(randomBytes, n, k, secretBytes);
		// console.log(parts)
		for (let i = 0; i < n; i++) {
			// fs.writeFile('testfile',new Buffer(ui8a),...)
			saveArrayAsFile(parts[`${i + 1}`], `part${i + 1}`);
		}
		// console.log(parts['1'])
		// // we only need k of the parts to recover the secret
		// let parts_retrieved = {};
		
        console.log(parts['1']);
        
        delete parts["2"];
		delete parts["3"];

        console.log((parts['1'][1]))

		// recovered is an Unit8Array
		const recovered = join(parts);
		console.log(recovered);
		// prints 'hello there'
		console.log();

        fs.writeFileSync(
					"../base64encoded/combinedFile.txt",
					utf8Decoder.decode(recovered)
				);
}

encrypt();

// module.exports = encrypt;