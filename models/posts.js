const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

var
  user = process.env.DB_USER,
  pass = process.env.DB_PASS,
  db;

MongoClient.connect('mongodb://' + user + ':' + pass + '@ds125053.mlab.com:25053/some-quotes', (err,database) => {
  if (err) return console.log(err);
  db = database;
  module.exports.db = database;

  app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
});
