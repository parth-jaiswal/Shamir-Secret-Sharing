const fs = require("fs");

base64Image = fs.readFileSync("../base64encoded/test.txt", "utf8");
fs.writeFile("../decodedImage/image.png", base64Image, { encoding: "base64" }, function (err) {
	console.log("File created");
});
