var mongoose = require("mongoose")
var Schema = mongoose.Schema

var HotSearchSchema = new Schema({
    "hotSearch" : Array
});
  
module.exports= mongoose.model('HotSearch', HotSearchSchema, 'hotSearchs')

