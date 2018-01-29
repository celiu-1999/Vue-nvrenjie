var mongoose = require("mongoose")
var Schema = mongoose.Schema

var homeSchema = new Schema({
    "banner" : [
        {
            "bizType" : String,
            "exposure" : String,
            "exts" : Object,
            "data" : String,
            "imageUrl" : [ 
                {
                    "imgUrl" : String
                }
            ]
        }
    ],
    "Copy" : {
        "new_copy" : String,
        "trailer_copy" : String
    },
    "new" : [
        {
            "imageUrl" : [ 
                {
                    "imgUrl" : String
                }
            ],
            "data" : String
        }
    ],
    "trailer" : [
        {
            "imageUrl" : [ 
                {
                    "imgUrl" : String
                }
            ],
            "data" : String
        }
    ]
});
  
module.exports= mongoose.model('Home', homeSchema, 'homes')

