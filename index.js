const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');


// midleware
app.use(cors());
app.use(express())

// MongoDb Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Basic setup
app.get('/', (req, res) => {
    res.send('emazon simple server running');
})

app.listen(port, () => {
    console.log(`emazon simple server is running: ${port}`);
})

