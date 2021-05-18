const express = require('express');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

// let notes = [];


// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "Develop/public")));


// api call response
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "public/index.html"));
// }); 

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/api/notes', (req, res)=>{
    return res.sendFile(path.json(__dirname, 'db/db.json'));
});


app.post('/api/notes', (req, res)=>{
    notes.push(req.body);
})

 
app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
});


