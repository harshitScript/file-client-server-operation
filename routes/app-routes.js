const express = require("express");
const getLargePdfController = require("../controllers/getLargePdfController");
const getServerConfigController = require("../controllers/getServerConfigController");
const getSmallPdfController = require("../controllers/getSmallPdfController");
const postGenerateCustomPdf = require("../controllers/postGenerateCustomPdf");
const postUploadFileController = require("../controllers/postUploadFileController");
const { imageMulter, videoMulter } = require("../multer.config");
const { json } = require("body-parser");
const getDownloadCustomPdfController = require("../controllers/getDownlaodCustomPdf");
const {
  customPdfDataValidatorSchema,
} = require("../validations/customPdfDataValidationSchema");
const getStreamMovieController = require("../controllers/getStreamMovieController");
const appRoutes = express.Router();

appRoutes.post(
  "/upload-image",
  imageMulter.single("image"),
  postUploadFileController
);

appRoutes.post(
  "/upload-video",
  videoMulter.single("video"),
  postUploadFileController
);

appRoutes.post(
  "/generate-custom-pdf",
  json(),
  customPdfDataValidatorSchema,
  postGenerateCustomPdf
);

appRoutes.get("/get-small-pdf/:load_type", getSmallPdfController);

appRoutes.get("/get-large-pdf/:load_type", getLargePdfController);

appRoutes.get("/download-custom-pdf/:pdf_name", getDownloadCustomPdfController);

appRoutes.get("/stream-movie/:movie_name", getStreamMovieController);

appRoutes.get("/", getServerConfigController);

module.exports = appRoutes;
