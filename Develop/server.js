const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;
let notesData = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/notes", function (err, res) {
  notesData = fs.readFileSync("db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  res.json(notesData);
});

// writes the new note to the json file
app.post("/api/notes", function (req, res) {
  notesData = fs.readFileSync("./db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  req.body.id = notesData.length;
  notesData.push(req.body);
  notesData = JSON.stringify(notesData);
  // writes the new note to file
  fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
    if (err) throw err;
  });

  res.json(JSON.parse(notesData));
});

// Delete a note

app.delete("/api/notes/:id", function (req, res) {
  notesData = fs.readFileSync("./db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  // delete the old note from the array on note objects
  notesData = notesData.filter(function (note) {
    return note.id != req.params.id;
  });
  notesData = JSON.stringify(notesData);
  // write the new notes to the file
  fs.writeFile("./db/db.json", notesData, "utf8", function (err) {
    if (err) throw err;
  });

  // change it back to an array of objects & send it back to the browser (client)
  res.send(JSON.parse(notesData));
});

// api call response
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function (req, res) {
  return res.sendFile(path.json(__dirname, "db/db.json"));
});

app.listen(PORT, function () {
  console.log("SERVER IS LISTENING: " + PORT);
});
