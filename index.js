const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 5000
const app = express()
const ideas = require('./Data/adventureIDea.json')
const offer = require('./Data/offer.json')
//middle ware
app.use(cors())
app.use(express.json())



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