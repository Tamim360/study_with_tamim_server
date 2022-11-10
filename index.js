// imports
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

// api's

app.get("/", (req, res) => {
  res.send(`server is running on port ${port}`);
});

// database connection

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qbqevch.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // collections
    const servicesCollection = client
      .db("studyWithTamim")
      .collection("services");
    const reviewsCollection = client.db("studyWithTamim").collection("reviews");

    // services api
    app.get("/services", async (req, res) => {
      const limit = parseInt(req.query.limit);

      const query = {};

      const cursor = servicesCollection.find(query);
      let services;
      if (limit) {
        services = await await cursor.sort({ _id: -1 }).limit(limit).toArray();
      } else {
        services = await cursor.sort({ _id: -1 }).toArray();
      }
      res.send(services);
    });

    // single service
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await servicesCollection.findOne(query);
      res.send(service);
    });

    // add a service api
    app.post("/services", async (req, res) => {
      const service = req.body;
      // console.log(service);
      const result = await servicesCollection.insertOne(service);
      res.send(result);
    });

    // reviews api post
    app.post("/reviews", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    // reviews api get
    app.get("/reviews", async (req, res) => {
      const id = req.query.id;
      const email = req.query.email;

      let query;

      if (id && email) {
        query = { courseId: id, email: email };
      } else if (id && !email) {
        query = { courseId: id };
      } else if (!id && email) {
        query = { email: email };
      }

      const reviews = await reviewsCollection
        .find(query)
        .sort({ _id: -1 })
        .toArray();
      res.send(reviews);
    });

    // delete a review
    app.delete("/reviews/:id", async function (req, res) {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewsCollection.deleteOne(query);
      res.send(result);
    });

    // update a review
    app.patch("/reviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const review = req.body;
      const updateDoc = {
        $set: review,
      };

      const result = await reviewsCollection.updateOne(query, updateDoc);
      res.send(result);
    });
  } finally {
  }
}
run().catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
