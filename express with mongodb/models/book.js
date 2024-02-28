const mongoose = require("mongoose");
const { Schema } = mongoose;

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const bookSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: [5, "Title must be at least 5 characters long"],
      maxlength: [100, "Title cannot exceed 100 characters"],
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      trim: true,
      minlength: [5, "Author name must be at least 5 characters long"],
      maxlength: [50, "Author name cannot exceed 50 characters"],
      required: [true, "Author name is required"],
    },
    price: {
      type: Number,
      min: [1, "Price must be at least 1"],
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      enum: ["fiction", "non-fiction"],
      required: [true, "Category is required"],
    },
  },
  { timestamps: true }
);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const Book = mongoose.model("Book", bookSchema);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
module.exports = Book;
