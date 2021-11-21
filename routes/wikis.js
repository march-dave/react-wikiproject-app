'use strict';

var express = require('express');
var router = express.Router();

var Wiki = require('../models/wiki');

router.get('/', (req, res) => {

  Wiki.findAll(function(err, wiki) {
    if(err) return res.status(400).send(err);
    res.send(wiki);
  });
});

router.get('/:id', (req, res) => {
  var id = req.params.id;
  Wiki.findById(id, function(err, wiki) {
    if(err || !wiki) return res.status(400).send(err || 'Wiki not found.');
    res.send(wiki);
  });
});

router.get('/search/:search', (req, res) => {
  var search = req.params.search;
  Wiki.findByName(search, function(err, wiki) {
    if(err || !wiki) return res.status(400).send(err || 'Wiki not found.');
    res.send(wiki);
  });
});

router.post('/', (req, res) => {
  Wiki.create(req.body, (err, wiki) => {
    if(err) return res.status(400).send(err);
    res.send(wiki);
  })
});

// delete
router.delete('/:id', (req, res) => {
  var id = req.params.id;
  Wiki.removeById(id, function(err, wiki) {
    if(err) return res.status(400).send(err);
    res.send(wiki);
  });
});

// update
router.put('/:id', (req, res) => {
  var id = req.params.id;
  Wiki.update(id, req.body, (err, wiki) => {
      if(err) return res.status(400).send(err);
      res.send(wiki);
  });
});

module.exports = router;
