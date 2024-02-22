const express = require("express");
const app = express();
const path = require("path");

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.get("/", (req, res) => {
  res.send("success");
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.listen(3000);
