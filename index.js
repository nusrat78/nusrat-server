const express = require('express');
const cors = require('cors');
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kddgp.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const projectsCollection = client.db('nusrats_portfolio').collection('projects');

        app.get('/projects', async (req, res) => {
            const query = {};
            const cursor = projectsCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        });

        app.get('/projects/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const project = await projectsCollection.findOne(query);
            res.send(project);
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Hello from jahan!')
})

app.listen(port, () => {
    console.log(`Nusrat app listening on port ${port}`)
})