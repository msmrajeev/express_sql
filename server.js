import express from "express";
import dotenv from "dotenv";
import mysql from "mysql";
import db from "./database/database.js";
// import mysql from "mysql2/promise";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
// console.log("db.connect()", db.connect());

db.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + db.threadId);
});

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// middlewares
app.use("/api/users", userRoutes);

// app.get("/books", (req, res) => {
//   const q = "SELECT * FROM books";
//   db.query(q, (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.get("/books/:id", (req, res) => {
//   const q = "SELECT * FROM books WHERE id = ?";
//   const bookId = req.params.id;
//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.post("/books", (req, res) => {
//   const q = "INSERT INTO books (`title`, `description`, `cover`) VALUES(?)";
//   const values = [req.body.title, req.body.description, req.body.cover];

//   db.query(q, [values], (err, data) => {
//     if (err) return res.json(err);
//     return res.json(data);
//   });
// });

// app.delete("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q = "DELETE FROM books WHERE id = ?";
//   db.query(q, [bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.send("Data deleted successfully");
//   });
// });

// app.put("/books/:id", (req, res) => {
//   const bookId = req.params.id;
//   const q =
//     "UPDATE books SET `title` = ?, `description` = ?, `cover` = ? WHERE id = ?";

//   const values = [req.body.title, req.body.description, req.body.cover];
//   db.query(q, [...values, bookId], (err, data) => {
//     if (err) return res.json(err);
//     return res.send("book  updated successfully");
//   });
// });

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
