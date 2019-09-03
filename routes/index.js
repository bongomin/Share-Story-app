var express = require('express');
var {ensureAuthenticated ,ensureGuest} = require('../helpers/auth');
var mongoose = require('mongoose');
var router = express.Router();
var Story = mongoose.model('stories');
var User = mongoose.model('users');

/* GET home page. */
router.get('/',ensureGuest, (req, res) => {
  res.render('index');
});

/* GET DashBoard page. */
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  Story.find({user:req.user.id})
  .then(stories => {
    res.render('index/dashboard', {
      stories: stories
    });
  }); 
});

module.exports = router;
