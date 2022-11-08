// imports
const express = require('express');
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

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})