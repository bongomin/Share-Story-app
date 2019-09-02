
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating User Schema
const storySchema = new Schema({
   title :{
      type:String,
      required:true
   },
   body:{
      type:String,
      required:true
   },
   status:{
      type:String,
      default:'public'
   },
   allowComments:{
      type:Boolean,
      default:true 
   },
   comments:[{
      commentBody:{
         type:String,
         required:true
      },
      commentDate:{
         type:Date,
         default:Date.now
      },
      commentUser:{
         ///relating to the users collection
         type:Schema.Types.ObjectId,
         ref:'users'
      }
   }],
   user:{
       ///relating to the users collection
       type:Schema.Types.ObjectId,
       ref:'users'

   },
   date: {
      type:Date,
      default:Date.now
   }
});
// creating collection and passing in the model  
mongoose.model('stories',storySchema,'stories');

