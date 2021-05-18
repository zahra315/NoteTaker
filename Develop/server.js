const express = require('express');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
const app = express();
const path = require('path');
const PORT = 3000;

// let notStorage = [];

app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../public/notes.html'));
});

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '/../public/index.html'));
});

app.get('/api/notes', (req, res)=>{
    res.json(data);
});


app.post('/api/notes', (req, res)=>{
    
})

 
app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
});


