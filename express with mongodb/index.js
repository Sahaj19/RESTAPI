const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const ExpressError = require("./utils/expressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
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
app.get(
  "/books",
  wrapAsync(async (req, res) => {
    let allBooks = await Book.find({});
    res.render("index.ejs", { allBooks });
  })
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.get("/books/new", (req, res) => {
  res.render("new.ejs");
});

//(post route)
app.post(
  "/books",
  wrapAsync(async (req, res) => {
    let book = new Book(req.body.book);
    console.log(book);
    await book.save();
    res.redirect("/books");
  })
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get(
  "/books/:id",
  wrapAsync(async (req, res, next) => {
    try {
      let { id } = req.params;

      if (!id) {
        return next(new ExpressError(404, "Book ID is missing!"));
      }

      let book = await Book.findById(id);

      if (!book) {
        return next(new ExpressError(404, "Book Data Don't Exist!"));
      }

      res.render("show.ejs", { book });
    } catch (error) {
      next(error);
    }
  })
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(edit route)
app.get(
  "/books/:id/edit",
  wrapAsync(async (req, res, next) => {
    try {
      let { id } = req.params;

      if (!id) {
        return next(new ExpressError(404, "Book ID is missing!"));
      }

      let book = await Book.findById(id);

      if (!book) {
        return next(new ExpressError(404, "Book Data Don't Exist!"));
      }

      res.render("edit.ejs", { book });
    } catch (error) {
      next(error);
    }
  })
);

//(update route)
app.put(
  "/books/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Book.findByIdAndUpdate(
      id,
      { ...req.body.book },
      { runValidators: true }
    );
    res.redirect(`/books/${id}`);
  })
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(delete route)
app.delete(
  "/books/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect("/books");
  })
);

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(error handling middlewares)
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

app.use((err, req, res, next) => {
  if (err instanceof mongoose.CastError) {
    next(new ExpressError(404, "Book Data Don't exist!"));
  } else {
    next(err);
  }
});

app.use((error, req, res, next) => {
  let { status = 500, message = "something went wrong, try again!" } = error;
  res.status(status).send(message);
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on http://localhost:3000");
});
