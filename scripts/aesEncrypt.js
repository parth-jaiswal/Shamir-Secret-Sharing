const {key, iv} = require("../AESsecrets.js")
const fs  = require ('fs');
const crypto = require("crypto");
const algorithm = "aes-256-cbc";


//16 bytes 
const initVector = iv;

//32 bytes
const Securitykey = key;
console.log(iv, key);
// console.log(initVector);
// protected data

const aesencryptData = (filepath) => {
    const message = "hello";
    // const message = fs.readFileSync("./base64encoded/test.txt", "utf8");
    // secret key generate 32 bytes of random data
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");

    encryptedData += cipher.final("hex");

    console.log("Encrypted message: " + encryptedData);
    fs.writeFileSync("../aesEncrypted/encrypted.txt", encryptedData);
}

module.exports = aesencryptData();



