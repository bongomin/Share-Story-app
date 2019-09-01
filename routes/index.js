var express = require('express');
const {ensureAuthenticated ,ensureGuest} = require('../helpers/auth');
var router = express.Router();

/* GET home page. */
router.get('/',ensureGuest, (req, res) => {
  res.render('index');
});

/* GET DashBoard page. */
router.get('/dashboard',ensureAuthenticated, (req, res) => {
  res.render('index/dashboard');
});

module.exports = router;
