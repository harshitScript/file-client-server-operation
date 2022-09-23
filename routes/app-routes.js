const express = require("express");
const getLargePdfController = require("../controllers/getLargePdfController");
const getServerConfigController = require("../controllers/getServerConfigController");
const getSmallPdfController = require("../controllers/getSmallPdfController");
const postUploadFileController = require("../controllers/postUploadFileController");
const customMulter = require("../multer.config");
const appRoutes = express.Router();

appRoutes.post(
  "/upload-file",
  customMulter.single("image"),
  postUploadFileController
);

appRoutes.get("/get-small-pdf/:load_type", getSmallPdfController);

appRoutes.get("/get-large-pdf/:load_type", getLargePdfController);

appRoutes.get("/", getServerConfigController);

module.exports = appRoutes;
