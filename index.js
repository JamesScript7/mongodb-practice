const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());

var
  user = process.env.DB_USER,
  pass = process.env.DB_PASS,
  db;

MongoClient.connect('mongodb://' + user + ':' + pass + '@ds125053.mlab.com:25053/some-quotes', (err,database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});


app.use(bodyParser.urlencoded({extended: true}));

/*
.save(req.body, (err,res) => {});
.find({key:'val'}).toArray((err,res) => {});
.findOneAndUpdate(
  query,
  update,
  {
    // Will look at the latest
    sort: {_id: -1},
    // If it doesn't exist, still .save()
    upsert: true
  },
  callback
);

.findOneAndDelete();
*/


app.get('/', (req,res) => {
  var cursor = db.collection('posts').find().toArray((err, results) => {

    res.render('index', {posts: results});
  });

  // res.sendFile(__dirname + '/index.html');
});

app.post('/posts', (req,res) => {
  db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Saved to database');
    res.redirect('/');
  })
});

app.put('/posts', (req,res) => {
  db.collection('posts').findOneAndUpdate(
    {
      title: "hi"
    },
    {
      $set: {
        title: req.body.title,
        body: req.body.body
      }
    }, {
      sort: {_id: -1},
      upsert: true
    }, (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );

});
