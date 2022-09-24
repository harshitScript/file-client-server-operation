const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/root-dir");

const getDownloadCustomPdfController = (req, res) => {
  const { pdf_name } = req.params;

  const sourcePath = path.join(rootDir, "public", "user-pdf", pdf_name);

  if (fs.existsSync(sourcePath)) {
    const pdfStream = fs.createReadStream(sourcePath);

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader("Content-Disposition", `attachment; filename=${pdf_name}`);

    res.setHeader("Preferred-Location", "browser");

    pdfStream.pipe(res);
  } else {
    throw new Error("PDF not exist.");
  }
};
module.exports = getDownloadCustomPdfController;
