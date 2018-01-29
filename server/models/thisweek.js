var mongoose = require("mongoose")
var Schema = mongoose.Schema

var thisweekSchema = new Schema({
    "thisweek" : [
        {
            "thisweek_title" : String,
            "thisweek_data" : String,
            "imageUrl" : [ 
                {
                    "imgUrl" : String
                }
            ],
            "introduce": String,
            "price": String
        }
    ]
});
  
module.exports= mongoose.model('thisweek', thisweekSchema, 'thisweeks')

