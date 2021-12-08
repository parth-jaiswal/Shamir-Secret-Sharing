const express = require("express");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");

//import scripts
// const encrypt = require("./scheme/encrypt");
const upload = require("./scripts/upload");

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

// app.post("/encode", function (req, res) {
// 	console.log(req.body.threshold);
// 	let threshold = req.body.threshold; //k
// 	let numShares = req.body.numShares; //n

// 	encrypt('./base64encoded/test.txt', numShares, threshold);

	
// });

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
