const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const Book = require("./models/book.js");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Restapi");
    console.log("Restapi connected successfully!");
  } catch (error) {
    console.log("Restapi failed to connect");
    throw new Error(error);
  }
}

main();

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(home route)
app.get("/", (req, res) => {
  res.render("home.ejs");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(index route)
app.get("/books", async (req, res) => {
  let allBooks = await Book.find({});
  res.render("index.ejs", { allBooks });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

//(post route)
app.post("/books", async (req, res) => {
  let book = new Book(req.body.book);
  console.log(book);
  await book.save();
  res.redirect("/books");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/books/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let book = await Book.findById(id);
    res.render("show.ejs", { book });
  } catch (error) {
    console.log(error);
  }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on http://localhost:3000");
});
