const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.get('/', (req, res) => { 
    //res.send('hello world');
    res.sendFile(path.join(__dirname, '..', 'index.html'));
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
app.get('/12pm', (req, res) => { 
    res.send('hello 12pm');
});
app.listen(port, () => {
    console.log(`server is listening on port${port}`);
 })