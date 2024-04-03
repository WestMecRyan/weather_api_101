const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '..')));
app.get ('/', (req, res) => {
   // res.send('Hello World');
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/csv-data', (req, res) => {
    const csvFilePath = path.join(__dirname, '..', 'data','zonal_sea_averages.csv');
    // res.sendFile will ask the user to download the file
    // res.sendFile(csvFilePath);
    fs.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading the file');
            return;
        }
        res.type('text/plain');
        res.send(data);
    });
    
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
