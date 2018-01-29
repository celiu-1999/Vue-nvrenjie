var mongoose = require("mongoose")
var Schema = mongoose.Schema

var commoditySchema = new Schema({
    "commodity" : [
        {
            "commodity_title" : String,
            "commodity_data" : String,
            "imageUrl" : [ 
                {
                    "imgUrl" : String
                }
            ],
            "introduce": String,
            "price": String,
            "rxShow" : Boolean
        }
    ]
});
  
module.exports= mongoose.model('commodity', commoditySchema, 'commoditys')

