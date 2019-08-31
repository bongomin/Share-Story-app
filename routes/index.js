var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

/* GET DashBoard page. */
router.get('/dashboard', function(req, res) {
  res.render('index/dashboard');
});

module.exports = router;
