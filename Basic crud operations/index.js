const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let posts = [
  {
    username: "sahaj arora",
    content: "I love Web Dev",
  },
  {
    username: "arora sahaj",
    content: "I love JS",
  },
];

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/", (req, res) => {
  res.send(`<h1>Basic Crud Blog App</h1>`);
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Index route)
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(new route)
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

//(post route)
app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let post = { username, content };
  posts.push(post);
  res.redirect("/posts");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on port http://localhost:3000");
});
