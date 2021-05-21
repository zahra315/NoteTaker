const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;
let notesData = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/notes", (err, res) => {
  notesData = fs.readFileSync("db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  res.json(notesData);
});

// writes the new note to the json file
app.post("/api/notes", (req, res) => {
  notesData = fs.readFileSync("./db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  req.body.id = notesData.length;
  notesData.push(req.body);
  notesData = JSON.stringify(notesData);
  // writes the new note to file
  fs.writeFile("./db/db.json", notesData, "utf8", (err) => {
    if (err) throw err;
  });

  res.json(JSON.parse(notesData));
});

// Delete a note

app.delete("/api/notes/:id", (req, res) => {
  notesData = fs.readFileSync("./db/db.json", "utf8");
  notesData = JSON.parse(notesData);
  // delete the old note from the array on note objects
  notesData = notesData.filter((note) => {
    return note.id != req.params.id;
  });
  notesData = JSON.stringify(notesData);
  // write the new notes to the file
  fs.writeFile("./db/db.json", notesData, "utf8", (err) => {
    if (err) throw err;
  });

  // change it back to an array of objects & send it back to the browser (client)
  res.send(JSON.parse(notesData));
});

// api call response
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, () => {
  console.log("SERVER IS LISTENING: " + PORT);
});
