import { validationResult } from "express-validator";

export const handleValidationErrors = function () {
  return function (req, res, next) {
    const errors = validationResult(req);

    let allErrors = {};
    if (!errors.isEmpty()) {
      errors.errors.forEach(function (err) {
        allErrors[err.path] = err.msg;
      });
    }
    if (Object.keys(allErrors).length > 0)
      return res.json({
        status: "fail",
        data: allErrors,
      });
    next();
  };
};
