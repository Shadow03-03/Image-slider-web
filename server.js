const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static('public')); // Serve all files from /public

app.post("/upload", upload.single("file"), (req, res) => {
  const fileName = req.file.originalname;
