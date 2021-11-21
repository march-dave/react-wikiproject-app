'use strict';

var db = require('../config/db');
var uuid = require('uuid');

const Moment = require('react-moment');

// title, description, content, editedat

db.run(`CREATE TABLE IF NOT EXISTS wikis(
  numid integer primary key autoincrement,
  uuid text,
  title text,
  description text,
  content text,
  editedat datetime)`);
exports.create = function(wiki, cb) {

  db.run('INSERT INTO wikis (uuid, title, description, content, editedat) VALUES (?, ?, ?, ?, ?)',
    uuid(),
    wiki.title,
    wiki.description,
    wiki.content,
    new Date(),
    (err) => {
      if(err) return cb(err);
      db.get('SELECT * FROM wikis WHERE numid = (SELECT MAX (numid) FROM wikis);', cb)
      }
    );
};

exports.findAll = function(cb) {
  db.all('SELECT * FROM wikis', function(err, wiki) {
    cb(err, wiki);
  });
};

exports.findById = function(id, cb) {
  db.all(`SELECT * FROM wikis WHERE numid = '${id}'`, function(err, wiki) {
    cb(err, wiki);
  });
};

exports.findByName = function(search, cb) {
  db.all(`SELECT * FROM wikis WHERE (title LIKE '%${search}%' OR description LIKE '%${search}%' OR content LIKE '%${search}%' )`, function(err, wiki) {
    cb(err, wiki);
  });
};

exports.update = function(id, wiki, cb) {
  db.run(`UPDATE wikis SET title = '${wiki.title}', description = '${wiki.description}', content = ${wiki.content} WHERE ID = '${id}'`, cb);
};

exports.removeById = function(id, cb) {
    db.all(`DELETE FROM  wikis  WHERE numid = '${id}'`, (err, wiki) => {
    if (err) return cb (err);

    cb(err, wiki);
  });



};
