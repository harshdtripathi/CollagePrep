const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("../../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "study-material",
    resource_type: "auto",
    allowed_formats: ["pdf"],
  },
});

const upload = multer({ storage });

module.exports = upload;
