const Book = require("../models/book.js");
const { booksData } = require("./data.js");
const mongoose = require("mongoose");

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
async function initDB() {
  try {
    await Book.deleteMany({});
    await Book.insertMany(booksData);
    console.log("books data inserted successfully!");
  } catch (error) {
    console.log(error);
  }
}
initDB();
