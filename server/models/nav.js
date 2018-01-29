var mongoose = require("mongoose")
var Schema = mongoose.Schema

var navSchema = new Schema({
    "nav" : [
        {
            "nav_title" : String,
            "nav_href" : String
        }
    ]
});
  
module.exports= mongoose.model('nav', navSchema, 'navs')

