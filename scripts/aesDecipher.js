const { key, iv } = require("../AESsecrets.js");
const fs = require("fs");
const crypto = require("crypto");
const algorithm = "aes-256-cbc";

const decipher = (encryptedData) => {
    encryptedData = fs.readFileSync("../aesEncrypted/encrypted.txt", "utf8");
    console.log(encryptedData);
	const decipher = crypto.createDecipheriv(algorithm, key, iv);

	let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

	decryptedData += decipher.final("utf8");

	console.log("Decrypted message: " + decryptedData);
};
module.exports = decipher();