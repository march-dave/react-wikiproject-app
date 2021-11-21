'use strict';

var express = require('express');
var router = express.Router();

router.use('/wikis', require('./wikis'));

module.exports = router;
