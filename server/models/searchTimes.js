var mongoose = require("mongoose")
var Schema = mongoose.Schema

var searchTimesSchema = new Schema({
    "frequency" : Number,
    "content" : String
});
  
module.exports= mongoose.model('SearchTimes', searchTimesSchema, 'searchTimess')

