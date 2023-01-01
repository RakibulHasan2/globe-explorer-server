const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const ideas = require('./Data/adventureIDea.json')
const offer = require('./Data/offer.json')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
//middle ware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://globe-explorer:FJOcIYR26PEYqUFW@cluster0.xgyce0q.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const packageCollection = client.db('globe-explorer').collection('packages')
        const usersCollection = client.db('globe-explorer').collection('users')
        const bookingCollection = client.db('globe-explorer').collection('booking')
        app.get('/packages', async (req, res) => {
            const query = {}
            const result = await packageCollection.find(query).toArray()
            res.send(result)
        })
        app.get('/packages/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const singlePackage = await packageCollection.findOne(query);
            res.send(singlePackage);
        })
        //users data
        app.get('/users', async (req, res) => {
            const query = {}
            const result = await usersCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result);
        })

        app.get('/booking', async (req, res) => {
            const email = req.query.email
            const query = { email: email};
            const result = await bookingCollection.find(query).toArray()
            res.send(result)
        })
        app.post('/booking', async (req, res) => {
            const user = req.body;
            const result = await bookingCollection.insertOne(user)
            res.send(result);
        })




    }
    finally {

    }
}

run().catch(err => console.log(err))













app.get('/', (req, res) => {
    res.send('Globe explorer running')
})

app.get('/adventureIdea', (req, res) => {
    res.send(ideas)
})
app.get('/offer', (req, res) => {
    res.send(offer)
})

app.listen(port, () => {
    console.log(`Globe explorer is running on ${port}`)
})