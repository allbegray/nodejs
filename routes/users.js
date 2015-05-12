var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/list', function(req, res, next) {
  console.log('get users list');

  var url = 'mongodb://localhost:27017/test';
  MongoClient.connect(url, function(err, db) {
    db.collection("users").find().toArray(function (err, items) {
      console.log(items.length);
      for (var i in items) {
        console.log(i + ":" + JSON.stringify(items[i]));
      }
      db.close();

      res.json(items);
    });
  });

});

router.get('/add', function(req, res, next) {
  console.log('add user');

  var name = req.param('name');
  var age = req.param('age');

  var url = 'mongodb://localhost:27017/test';
  MongoClient.connect(url, function(err, db) {
    if(err) { return console.dir(err); }

    var doc = {name : name, age : age};

    db.collection("users").insert(doc, {w:1}, function (err, result) {});
    db.close();

    res.json(doc);
  });

});

module.exports = router;