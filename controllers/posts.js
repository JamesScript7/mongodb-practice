const model = require('../models/posts');

// GET
module.exports.get = function(req,res) {
  model.db.collection('posts').find().toArray((err, results) => {
    if (err) throw err;

    res.render('index', {posts: results});
  });
}

// POST
module.exports.post = function(req,res) {
  model.db.collection('posts').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('Saved to database');
    res.redirect('/');
  });
}

// UPDATE
module.exports.put = function(req,res) {
  model.db.collection('posts').findOneAndUpdate({
    title: "hello"
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
  });
}

// DELETE
module.exports.delete = function(req,res) {
  // console.log(req.body);
  model.db.collection('posts').findOneAndDelete({
    title: req.body.title
  }, (err, result) => {
    if (err) return res.send(500,err);
    res.send({message: "The quote got deleted!"});
  });
}
