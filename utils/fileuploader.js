const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'student-papers', // Set your folder name here
    allowed_formats: ['pdf', 'jpg', 'png'], // Adjust based on your needs
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});