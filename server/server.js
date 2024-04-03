const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => { 
    res.send('Hello World');
});

app.listen(port, () => { 
    console.log(`Server is listening on ${port}`);
});


const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the project root, assuming index.html is there
app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    // Send index.html to the client
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get('/csv-data', (req, res) => {
    const csvFilePath = path.join(__dirname, '..', 'data', 'zonal_sea_averages.csv');
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
