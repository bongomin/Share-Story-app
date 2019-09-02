
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating User Schema
const UserSchema = new Schema({
   googleID :{
      type:String,
      required:true,
   },
   email:{
      type:String
   },
   firstName:{
      type:String
   },
   lastName:{
      type:String
   },
   image:{
      type:String
   }
});
// creating collection and passing in the model  
mongoose.model('users',UserSchema);

