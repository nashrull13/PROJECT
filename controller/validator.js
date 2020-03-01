const { check, validationResult } = require("express-validator");
const asyncMiddleware = require("express-async-handler");

const articleValidationRules = () => {
  return [
    check("title")
      .notEmpty()
      .withMessage("title is empty"),
    check("content")
      .notEmpty()
      .withMessage("content is empty"),    
    check("status")
      .notEmpty()
      .withMessage("status is empty"),
    
  ];
};

const userValidationRules = () => {
  return [
    check("name")
      .notEmpty()
      .isString()
      .withMessage("Name is empty"),
    check("username")
      .notEmpty()
      .isString()
      .withMessage("Username is empty"),
    check("email")
      .notEmpty()
      .isEmail(),
    check("password")
      .isLength({ min: 3 })
      .notEmpty(),
    check("admin")
      .notEmpty()
      .isBoolean()
      .withMessage("Admin is empty"),
    check("status")
      .notEmpty()
      .isBoolean()
      .withMessage("Status is empty")
  ];
};
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

module.exports = {
  articleValidationRules,
  userValidationRules,
  validate
};
