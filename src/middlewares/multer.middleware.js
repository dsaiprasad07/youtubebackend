const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where files will be saved.
    cb(null, "./public/tem"); // Creates 'uploads' directory if it doesn't exist.
  },
  filename: function (req, file, cb) {
    // Customize the filename.
   
    cb(null, file.originalname);
    //Example: 'profile-1625071234567-890.jpg'
  }
});

export const upload = multer({ storage, });