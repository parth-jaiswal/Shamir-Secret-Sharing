const fs = require("fs");
const saveArrayAsFile = (arrayBuffer, filePath) => {
	var b64encoded = arrayBuffer.toString("base64");
	fs.writeFileSync(filePath, b64encoded, (err) => {
		if (err) {
			console.log("There was an error writing the share");
		} else {
			console.log("Written File :" + filePath);
		}
	});
};
module.exports = saveArrayAsFile;