const express = require("express");
const multer = require("multer");
const fs = require("fs");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("."));

app.post("/upload", upload.single("file"), (req, res) => {
  const fileName = req.file.originalname;
  fs.renameSync(req.file.path, "uploads/" + fileName);

  let images = [];
  try {
    images = JSON.parse(fs.readFileSync("uploads/images.json", "utf8"));
  } catch (e) {}
  
  images.push(fileName);
  fs.writeFileSync("uploads/images.json", JSON.stringify(images, null, 2));
  
  res.send("Upload successful");
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));