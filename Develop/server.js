const express = require('express');
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8080;

let notes = [];


// Set up body parsing, static, and route middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/assets", express.static("./assets"));
// app.use(express.static(path.join(__dirname, "Develop/public")));


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
    // return res.sendFile(path.json(__dirname, 'db/db.json'));
    res.json(data);
});

app.get('api/notes/:id', (req, res)=>{
    res.json(data[Number(req.params.id)]);
});



app.post('/api/notes', (req, res)=>{
    // notes.push(req.body);
    let newData = req.body;
    let uniqueId = (data.length).toString();
    newData.id = uniqueId;
    data.push(newData);
    fs.writeFileSync('./db/db.json', JSON.stringify(data), (err)=>{
        if(err) throw(err);
    });
    res.json(data);
})


app.delete('/api/notes', (req, res)=>{
    let currentId = req.params.id;
    let newId = 0;
    data = data.filter(currentNote =>{
        return currentNote != currentId;
    });
    for(currentNote of data){
        currentNote.id = newId.toString();
        newId++;
    }
    fs.writeFileSync('./db/db.json', JSON.toString(data));
    res.json(data);
})
 
app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
});


