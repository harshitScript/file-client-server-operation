const multer = require("multer");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/user-files/");
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const customMulter = multer({ storage: diskStorage });

module.exports = customMulter;
