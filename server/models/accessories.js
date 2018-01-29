var mongoose = require("mongoose")
var Schema = mongoose.Schema

var accessoriesSchema = new Schema({
    "Accessories" : [
        {
            "AccessoriesX" : {
                "commodity_title" : String,
                "commodity_data" : String,
                "imageUrl" : [ 
                    {
                        "imgUrl" : String
                    }
                ],
                "introduce": String,
                "price": String
            },
            "AccessoriesY1" : {
                "commodity_title" : String,
                "commodity_data" : String,
                "imageUrl" : [ 
                    {
                        "imgUrl" : String
                    }
                ],
                "introduce": String,
                "price": String
            },
            "AccessoriesY2" : {
                "commodity_title" : String,
                "commodity_data" : String,
                "imageUrl" : [ 
                    {
                        "imgUrl" : String
                    }
                ],
                "introduce": String,
                "price": String
            }
        }
    ]
});
  
module.exports= mongoose.model('accessories', accessoriesSchema, 'accessoriess')

