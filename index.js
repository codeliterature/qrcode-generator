const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qr-image');
const path = require('path');
const fs = require('fs')
const app = express();
let url = "";
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

const folderPath = 'public/images';
const imagePath = path.join(folderPath, 'img.png'); 
function deleteImageAfterTime() {
  setTimeout(() => {
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
      console.log('Image deleted after a set amount of time.');
    }
  }, 5000); 
}

app.get("/", (req, res) => {
deleteImageAfterTime();
  
  res.render("index")
});

app.post("/", (req, res) => {
  url = req.body.qurl;
  const qr_text = url;
  const qr_options = { type: 'png' };

  const folderPath = 'public/images';

  const qr_img = qr.image(qr_text, qr_options);

  const outputPath = path.join(folderPath, 'img.png');
  const outputStream = fs.createWriteStream(outputPath);

  qr_img.pipe(outputStream);

  res.redirect("/")
})



app.listen(process.env.PORT || 3000, () => {
  console.log("server is running!!!");
});