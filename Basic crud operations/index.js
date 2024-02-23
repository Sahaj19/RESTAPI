const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class ExpressError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let posts = [
  {
    id: uuidv4(),
    username: "sahaj arora",
    content: "I Hope you are doing great!",
  },
  {
    id: uuidv4(),
    username: "arora sahaj",
    content: "Keep coding and keep learning",
  },
];

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Home page)
app.get("/", (req, res) => {
  res.send(`<h1>Basic Crud Blog App</h1>`);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Index route)
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//(post route)
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let post = { id: uuidv4(), username, content };
  posts.push(post);
  res.redirect("/posts");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/posts/:id", (req, res, next) => {
  try {
    let { id } = req.params;

    if (!id) {
      return next(new ExpressError(404, "Invalid ID"));
    }

    const post = posts.find((post) => post.id === id);

    if (!post) {
      return next(new ExpressError(404, "Post not found!"));
    }
    res.render("show.ejs", { post });
  } catch (error) {
    next(error);
  }
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Edit route)
app.get("/posts/:id/edit", (req, res, next) => {
  try {
    let { id } = req.params;
    if (!id) {
      return next(
        new ExpressError(404, "Edit page not found (i.e post doesn't exist)")
      );
    }

    const post = posts.find((post) => post.id === id);
    if (!post) {
      return next(
        new ExpressError(404, "Edit page not found (i.e post doesn't exist)")
      );
    }

    res.render("edit.ejs", { post });
  } catch (error) {
    next(error);
  }
});

//(update route)
app.put("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { username, content } = req.body;
  const post = posts.find((post) => post.id === id);
  post.username = username;
  post.content = content;
  res.redirect(`/posts/${id}`);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Delete route)
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((post) => {
    return post.id !== id;
  });
  res.redirect("/posts");
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something Went Wrong" } = err;
  res.status(status).send(message);
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on port http://localhost:3000");
});
