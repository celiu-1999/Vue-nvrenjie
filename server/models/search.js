var mongoose = require("mongoose")
var Schema = mongoose.Schema

var searchSchema = new Schema({
    "title": String,
    "sold": Number,
    "item_id": Number,
    "location": String,
    "sellerLoc": String,
    "priceWap": Number,
    "name": String,
    "img": String,
    "price": Number,
    "originalPrice": Number,
    "praise": Number
});
  
module.exports= mongoose.model('search', searchSchema, 'search')