var mongoose = require("mongoose")
var Schema = mongoose.Schema

var commodityItemSchema = new Schema({
    "banner" : Array,
    "img": String,
    "title": String,
    "price": Number,
    "discount": String,
    "OriginalPrice": Number,
    "id": Number,
    "express": Number,
    "Praise": String,
    "SalesVolume": Number,
    "Stock": Number,
    "address": String,
    "ensure": String,
    "option": [
        {
            "id": Number,
            "title": String,
            "option_item": [
                {
                    "img": String,
                    "id": Number,
                    "option_title": String
                }
            ]
        }
    ],
    "oneEvaluate": {
        "auctionSku": String,
        "displayUserNick":String,
        "id": Number,
        "pics": Array,
        "rateContent":String,
        "rateDate":String,
        "fraction": String
    },
    "evaluate": [
        {
            "auctionSku":String,
            "displayUserNick":String,
            "id":Number,
            "pics":Array,
            "rateContent":String,
            "rateDate":String,
            "fraction":String
        }
    ],
    "imgText": Array
});
  
module.exports= mongoose.model('commodityItem', commodityItemSchema, 'commodityItems')

