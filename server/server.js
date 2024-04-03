const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');   
const app = express();
app.use(cors());
const port = 3000;

app.get('/', (req, res) => { 
    res.sendFile(path.join(__dirname, '..', 'index.html'));
    //res.send('hello world');
});
app.get('/csv-data', (req, res) => {
    const csvPath = path.join(__dirname, '..', 'data', 'zonal_sea_averages.csv');
    fs.readFile(csvPath, 'utf8', (err, data) => {
        if (err) { 
            console.error(err);
            return
        }
        res.type('text/plain');
        res.send(data);
     });
});
app.get('/3pm', (req, res) => { 
    res.send('hello 3pm');
});
app.listen(port, () => {
    console.log(`server is listening on port${port}`);
 })