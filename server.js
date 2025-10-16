const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

// Serve frontend files from 'public' folder
app.use(express.static("public"));
// Serve uploaded images
app.use('/uploads', express.static('uploads'));


// Upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  const fileName = req.file.originalname;
  fs.renameSync(req.file.path, path.join("uploads", fileName));
  let images = [];
  try {
    images = JSON.parse(fs.readFileSync("uploads/images.json", "utf8"));
  } catch (e) {}
  images.push(fileName);
  fs.writeFileSync("uploads/images.json", JSON.stringify(images, null, 2));
  res.send("Upload successful!");
});

// Serve images.json to frontend
app.get("/uploads/images.json", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "images.json"));
});

// Use proper port for Render/local
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

