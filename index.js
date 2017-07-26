require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.set('view engine', 'ejs');

var db;
var user = process.env.DB_USER;
var pass = process.env.DB_PASS;

MongoClient.connect('mongodb://' + user + ':' + pass + '@ds125053.mlab.com:25053/some-quotes', (err,database) => {
  if (err) return console.log(err);
  db = database;

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});


app.use(bodyParser.urlencoded({extended: true}));



app.get('/', (req,res) => {
  var cursor = db.collection('posts').find().toArray((err,results) => {
    // console.log(results);

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
