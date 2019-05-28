const express = require('express');

const app = express();
const bodyParser = require('body-parser');

app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;


let db;
MongoClient.connect('mongodb://localhost', { useNewUrlParser: true }).then(connection => {
  db = connection.db('message-board');
  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR:', error);
});

app.get('/api/events', (req, res) => {
  const filter = {};

  if (req.query.status) filter.status = req.query.status;
  

  db.collection('events').find(filter).sort({_id:-1}).toArray().then(events => {
    const metadata = { total_count: events.length };
    res.json({ _metadata: metadata, records: events })
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.post('/api/events', (req, res) => {
  const newEvent = req.body;

  db.collection('events').insertOne(newEvent).then(result =>
    db.collection('events').find({ _id: result.insertedId }).limit(1).next()
  ).then(newEvent => {
    res.json(newEvent);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

