const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');   
const app = express();
app.use(cors);
const port = 3000;

app.get('/', (req, res) => { 
    res.send('hello world');
});
app.get('/3pm', (req, res) => { 
    res.send('hello 3pm');
});
app.listen(port, () => {
    console.log(`server is listening on port${port}`);
 })