const express = require('express');
const {ensureAuthenticated ,ensureGuest} = require('../helpers/auth');
const router = express.Router();

//   stories index
router.get('/', function(req, res) {
   res.render('stories/index');
 });

//  add stories form

router.get('/add',ensureAuthenticated, (req, res) => {
   res.render('stories/add');
 });


module.exports = router;