const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// midleware
app.use(cors());
app.use(express())


app.get('/', (req, res) => {
    res.send('emazon simple server running');
})

app.listen(port, () => {
    console.log(`emazon simple server is running: ${port}`);
})

