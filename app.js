const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");
// const { randomBytes } = require("crypto");


//import scripts
const upload = require("./scripts/upload");
const { split } = require("./scripts/secrets");
const { randomBytes } = require("crypto");
const saveArrayAsFile = require("./scripts/saveArrayAsFile");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
	res.render("index");
});	

app.get("/encode", function (req, res) {
	res.render("encode");
});

app.post("/encode", function (req, res) {
	console.log(req.body.threshold);
	let threshold = req.body.threshold; //k
	let numShares = req.body.numShares; //n

	let base64string = "";
	fs.readFile("./base64encoded/test.txt", "utf8", function (err, data) {
		base64string = data;
		// console.log(base64string);

		

	});

	
});

app.post("/uploadImage", function (req, res, next) {
	// Error MiddleWare for multer file upload, so if any
	// error occurs, the image would not be uploaded!
	upload(req, res, function (err) {
		if (err) {
			res.send(err);
		} else {
			res.send("Success, Image uploaded!");
		}
	});
});

app.listen(8080, function (error) {
	if (error) throw error;
	console.log("Server created Successfully on PORT 8080");
});
