const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

// Read the json file and parse the data
const notes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));

// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join("public")));

// api call response
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

// Write the new note to the json file
app.post("/api/notes", (req, res) => {
  req.body.id = notes.length; // Set new notes id
  notes.push(req.body); // Add the new note
  // Write the new note to file
  fs.writeFileSync("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  res.json(notes);
});

app.listen(PORT, () => {
  console.log(`Express server Listening on PORT ${PORT}!`);
});
