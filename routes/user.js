import express from "express";
import { register, login } from "../controllers/user.js";
import { body, check, param } from "express-validator";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";
import db from "../database/database.js";
import { createError } from "../utils/createError.js";

const router = express.Router();

// Register
router.post(
  "/register",
  [
    body("first_name", "First Name is required").trim().notEmpty(),
    body("last_name", "Last Name is required").trim().notEmpty(),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail(),
    body("password", "Password is required and must be at least 6 characters")
      .trim()
      .notEmpty()
      .isLength({ min: 6 }),
  ],
  handleValidationErrors(),
  register
);

// Login
router.post(
  "/login",
  [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  handleValidationErrors(),
  login
);

router.get("/", (req, res) => {
  res.send("Hello World");
});

export default router;
