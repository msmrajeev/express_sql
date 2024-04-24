import db from "../database/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  let query = "SELECT * FROM users WHERE email=?";
  db.query(query, [req.body.email], (err, data) => {
    if (err) return err.stack;
    if (data.length > 0) {
      return res.json({
        status: "fail",
        data: "Email already exists",
      });
    } else {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      const q =
        "INSERT INTO users (`first_name`, `last_name`, `email`, `password`) VALUES(?)";
      const values = [
        req.body.first_name,
        req.body.last_name,
        req.body.email,
        hash,
      ];
      db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.json({
          status: "success",
          data: "User registered successfully",
        });
      });
    }
  });
};

export const login = (req, res) => {
  let query = "SELECT * FROM users WHERE email=?";
  db.query(query, [req.body.email], (err, data) => {
    if (err) return err.stack;
    if (data.length < 1) {
      return res.json({
        status: "fail",
        data: "Email not found",
      });
    } else {
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );
      if (!passwordIsValid) {
        return res.json({
          status: "fail",
          data: "Invalid password",
        });
      } else {
        const token = jwt.sign({ _id: data[0].id }, process.env.JWT);
        console.log(token);
        return res.json({
          status: "success",
          data: "User logged in successfully",
          token: token,
        });
      }
    }
  });
};
