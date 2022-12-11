const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1ndgjy2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db('portfolio').collection('projects');

        app.get('/projects', async (req, res) => {
            const query = {}
            const result = await projectsCollection.find(query).toArray()
            res.send(result)
        });

        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : ObjectId(id)}
            const service = await projectsCollection.findOne(query)
            res.send(service);
        });

    }
    finally {

    }
}
run().catch(error => console.error(error))


app.get('/', (req, res) => {
    res.send('portfolio server is running')
})

app.listen(port, () => {
    console.log(`portfolio Server is running on ${port}`);
})