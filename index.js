const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// midleware
app.use(cors());
app.use(express.json());

// MongoDb Connect
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mpr3cem.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const productCollection = client.db('emajhon').collection('products');

        app.get('/products', async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            console.log(page, size);
            const query = {}
            const cursor = productCollection.find(query);
            const products = await cursor.skip(page * size).limit(size).toArray();
            const count = await productCollection.estimatedDocumentCount()
            res.send({ count, products });
        });

        // Use Post to load some products using keys
        app.post('/productsByIds', async (req, res) => {
            const ids = req.body;
            // console.log(ids);
            const objectIds = ids.map(id => ObjectId(id));
            const query = { _id: { $in: objectIds } };
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
    }
    finally {

    }
}
run().catch(err => console.error(err));


// Basic setup
app.get('/', (req, res) => {
    res.send('emazon simple server running');
})

app.listen(port, () => {
    console.log(`emazon simple server is running: ${port}`);
})

