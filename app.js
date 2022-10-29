const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const toDoItems = ["Buy food", "Cook food"];
const workItems = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", function (req, res) {

  const day = date.getDate(); 
 

  res.render("list", { listTitle: day, newListItems: toDoItems });
});

app.post("/", function (req, res) {

  const toDoItem = req.body.toDoItem;

  if (req.body.list === "Work") { // list = nome do botão. vai identificar o título da página que está inserindo um título (work ou root)
    workItems.push(toDoItem);
    res.redirect("/work");
  } else 
  
  toDoItems.push(toDoItem);
  res.redirect("/"); //redireciona ao app.get
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  const item = req.body.toDoItem;
  workItems.push();
  res.redirect("/work");
});

app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
