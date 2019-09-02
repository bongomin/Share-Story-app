const express = require('express');
const mongoose = require('mongoose');
const Story = mongoose.model('stories');
const User = mongoose.model('users');
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


//  post request for stories
// process adding stories to mongodb
router.post('/',(req,res)=> {
 let allowComments;

 if(req.body.allowComments){
   allowComments = true;
 }else{
   allowComments = false;
 }

 const newStory = {
   title : req.body.title,
   body : req.body.body,
   status : req.body.status,
   allowComments :allowComments,
   user : req.body.id
 }

//  Creating new story
new Story(newStory)
.save()
.then(story => { 
  res.redirect(`/stories/show/${story.id}`);
});



});


module.exports = router;