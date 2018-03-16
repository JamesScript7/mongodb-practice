// REQUIRES:
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// MIDDLEWARES:
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// CONTROLLERS:
const postsController = require('./controllers/posts');

// ROUTES:
app.get('/', postsController.get);
app.post('/posts', postsController.post);
app.put('/posts', postsController.put);
app.delete('/posts', postsController.delete);

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
