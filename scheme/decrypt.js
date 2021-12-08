const { split, join } = require("./Scheme");
const { randomBytes } = require("crypto");
const fs = require("fs");

// // we only need k parts from n total parts to recover the secret
let n = 5, k = 3;


const decrypt = (parts) => {
    const utf8Decoder = new TextDecoder();
    delete parts['2'];
    delete parts['3'];
    const recovered = join(parts);
    console.log(recovered);
    fs.writeFileSync("../base64encoded/combinedFile", utf8Decoder.decode(recovered)
    );

}

module.exports = decrypt;