const fs = require("fs");

let base64String = "";

const imageToBase64 = require("image-to-base64");

function encodeImage() {
    imageToBase64("../uploads/mypic-1638629599574.jpg") // insert image url here.
        .then((response) => {
            base64String = response;
            try {
                fs.writeFileSync("../base64encoded/test.txt", base64String);
                //file written successfully
            } catch (err) {
                console.error(err);
            }
            // console.log(response); // the response will be the string base64.
        })
        .catch((error) => {
            console.log(error);
        });

}
encodeImage();
module.exports = encodeImage;




// function displayString() {
// 	console.log("Base64String about to be printed");
// 	console.log(base64String);
// }
