const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/root-dir");

const getLargePdfController = (req, res, next) => {
  const { load_type } = req.params;

  const pdfPath = path.join(rootDir, "public", "user-pdf", "large_50MB.pdf");

  const preloadResponse = () => {
    fs.readFile(pdfPath, (err, data) => {
      if (err) return next(err);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=large_50MB.pdf`
      );
      return res.send(data);
    });
  };

  const streamBufferResponse = () => {
    const fileBuffer = fs.createReadStream(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=large_50MB.pdf`);
    fileBuffer.pipe(res);
  };

  if (load_type === "preload") {
    //? STEPS
    //* READ THE ENTIRE FILE
    //* STORES FILE BUFFER TO MEMORY
    //* RETURN FILE BUFFER AS RESPONSE.
    console.time("preloadResponse");
    console.timeEnd("preloadResponse");
    preloadResponse();
  }

  if (load_type === "stream") {
    //? STEPS
    //* READ A SMALL CHUNK OF FILE INITIALLY
    //* RETURN IT DYNAMICALLY TO THE RESPONSE
    //* REPEAT THE PROCESS UNTIL ALL CHUNKS ARE DONE.
    //* REQUEST COMPLETES FASTER.
    console.time("streamBufferResponse");
    console.timeEnd("streamBufferResponse");
    streamBufferResponse();
  }
};

module.exports = getLargePdfController;
