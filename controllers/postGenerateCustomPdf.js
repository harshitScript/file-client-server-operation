const { validationResult } = require("express-validator");
const PDFDocument = require("pdfkit");
const path = require("path");
const rootDir = require("../utils/root-dir");
const fs = require("fs");

const postGenerateCustomPdf = (req, res, next) => {
  const validationErrors = validationResult(req);

  const { name, profession, age } = req.body;

  const pdf_name = `${name}_${age}.pdf`;

  const destinationPath = path.join(rootDir, "public", "user-pdf", pdf_name);

  if (!validationErrors.isEmpty()) {
    return res.status(412).json(validationErrors.errors);
  }

  try {
    //* stream created
    const pdfStream = new PDFDocument({});

    //* pipe started

    pdfStream.pipe(fs.createWriteStream(destinationPath));

    //* perform task (schema)
    [
      pdfStream
        .fontSize(24)
        .text("BIO-DATA", { underline: true, align: "center" }),
      pdfStream.text("__________________________________"),
      pdfStream.fontSize(20).text(`${name}, ${age}`),
      pdfStream.fontSize(16).text(profession),
    ];

    //* pipe ended
    pdfStream.end();
  } catch (error) {
    next(error);
  }

  return res.status(201).json({
    acknowledgement: `PDF generated at path /download-custom-pdf/${pdf_name}`,
    pdf_name,
  });
};

module.exports = postGenerateCustomPdf;
