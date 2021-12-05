const saveArrayAsFile = (arrayBuffer, filePath) => {
	fs.writeFile(filePath, Buffer.from(arrayBuffer), "binary", (err) => {
		if (err) {
			console.log("There was an error writing the image");
		} else {
			console.log("Written File :" + filePath);
		}
	});
};
module.exports = saveArrayAsFile;