const express = require('express');
const router = express.Router();

//   stories index
router.get('/', function(req, res) {
   res.render('stories/index');
 });

//  add stories form

router.get('/add', function(req, res) {
   res.render('stories/add');
 });


module.exports = router;