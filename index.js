// imports
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json())


// api's

app.get('/', (req, res) => {
    res.send(`server is running on port ${port}`);
})

// database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qbqevch.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        
    }
    finally {
        
    }
}

// services api
app.get('/services', (req, res) => {

})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})