var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var SomeModelSchema = new Schema({
  url: String,
  slug:String
});
module.exports=mongoose.model('URL', SomeModelSchema );
