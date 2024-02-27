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
app.get("/", (req, res) => {
  res.send(
    `<h1>
      Welcome to RESTAPI tutorial <br /> Express with MongoDB
    </h1>`
  );
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on http://localhost:3000");
});
