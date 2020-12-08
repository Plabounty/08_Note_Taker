var express = require("express");
var path = require("path");
const db = require("./db/db.json");
const fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
  return res.json(db);
});

app.post("/api/notes", function (req, res) {
  fs.readFile("./db/db.json", "utf8", (error, data) => {
    const arr = JSON.parse(data);
    console.log(arr);
    arr.push(req.body);
    console.log(arr);

    fs.writeFile("./db/db.json", JSON.stringify(arr), (err) => {
      res.json(req.body);
    });
  });
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
