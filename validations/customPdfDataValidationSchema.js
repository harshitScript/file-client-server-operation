const { body } = require("express-validator");

const customPdfDataValidatorSchema = [
  body("name")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Name must 3 to 30 characters long."),
  body("profession")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("profession must 3 to 30 characters long."),
  body("age")
    .trim()
    .isNumeric()
    .withMessage("Age must be numeric.")
    .isLength({ min: 1, max: 2 })
    .withMessage("Invalid age")
    .custom((value) => {
      if (value === 0) {
        throw new Error("Age cant be 0.");
      }
      return true;
    }),
];

module.exports = { customPdfDataValidatorSchema };
