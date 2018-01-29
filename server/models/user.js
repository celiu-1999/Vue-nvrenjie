var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
    "userId" : Number,
    "userName" : String,
    "userPwd" : String,
    "headImg" : String,
    "name": String,
    "phone" : Number,
    "email": String,
    "identity_name": String,
    "identity" : String,
    "collectionItem" : Array,
    "orderList" : Object,
    "SearchHistory": [],
    "cartList" : [
        {
            "commodityId": Number,
            "commodityNumber": Number,
            "commodityOptionId": Number,
            "commodityOptionItemId": Number,
            "commodityOptionItemImg": String,
            "commodityOptionIdSelected": Boolean
        }
    ],
    "addressList" : [
        {
            "addressId" : Number,
            "userName" : String,
            "streetName" : String,
            "postCode" : String,
            "tel" : String,
            "isDefault" : Boolean
        }
    ],
    "__v" : Number
});
  
module.exports= mongoose.model('user', userSchema, 'users')

