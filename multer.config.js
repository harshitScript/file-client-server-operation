const multer = require("multer");

const imageDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/user-images/");
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const videoDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "./public/user-videos/");
  },
  filename: (req, file, cb) => {
    return cb(null, file.originalname);
  },
});

const imageMulter = multer({ storage: imageDiskStorage });

const videoMulter = multer({ storage: videoDiskStorage });

module.exports = { imageMulter, videoMulter };
