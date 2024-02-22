const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
let posts = [
  {
    id: uuidv4(),
    username: "sahaj arora",
    content: "I love Web Dev",
  },
  {
    id: uuidv4(),
    username: "arora sahaj",
    content: "I love JS",
  },
];

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Home page)
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
  let post = { id: uuidv4(), username, content };
  posts.push(post);
  res.redirect("/posts");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(show route)
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.filter((post) => {
    return post.id === id;
  });
  res.render("show.ejs", { post });
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Edit route)
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.filter((post) => {
    return post.id === id;
  });
  res.render("edit.ejs", { post });
});

//(update route)
app.put("/posts/:id", (req, res) => {
  let { id } = req.params;
  let { username, content } = req.body;
  let post = posts.filter((post) => {
    return post.id === id;
  });
  post[0].username = username;
  post[0].content = content;
  res.redirect(`/posts/${id}`);
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//(Delete route)
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;

  //it will return something like [{post details}]
  let post = posts.filter((post) => {
    return post.id === id;
  });

  //let's grab the index of our required post
  let requiredIndex = posts.indexOf(post[0]);
  if (requiredIndex != -1) {
    posts.splice(requiredIndex, 1); //it will remove the entire post object
  } else {
    throw new Error("post does't exist");
  }
  res.redirect("/posts");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000, function () {
  console.log("server is active on port http://localhost:3000");
});
