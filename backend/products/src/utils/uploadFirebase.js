// const express = require("express");
const { bucket } = require("../config/firebaseInit.js");
// const multer = require('multer');
const path = require("path");

// const router = express.Router();
// const upload = multer({ dest: 'uploads/' });

async function uploadFile(filePath, destination) {
  console.log("Destination => ", destination);

  try {
    const newFileName = Date.now() + path.extname(filePath.originalname);
    const options = {
      destination: destination ? destination + "/products" + newFileName : newFileName,
    };

    console.log("Options => ", options);

    const data = await bucket.upload(filePath.path, options);
    return {
      error: null,
      uploaded: true,
      oldFileName: filePath.originalname,
      fileSize: filePath.size,
      name: newFileName,
      url: `https://firebasestorage.googleapis.com/v0/b/wingfi-9b5b7.appspot.com/o/${encodeURIComponent(
        newFileName
      )}?alt=media`,
    };
  } catch (error) {
    return { error: error.message, uploaded: false };
  }
}

module.exports = uploadFile;
