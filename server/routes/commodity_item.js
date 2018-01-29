var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var CommodityItem = require("../models/commodity_item.js")

// 获取CommodityItem 页面数据(每一件商品都从这里获取)
router.get("/", function (req, res, next) {
    let id = parseInt(req.param("id"))
    // id = 201712150001            // 获取搜索的内容
    let params = {
        id: id // 正则表达式匹配搜索的内容
    } 

    let CommodityItemsModel = CommodityItem.find(params)
    
    CommodityItemsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg:err.message
            })
        } else {
            res.json({
                status: '0',
                msg:'',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

module.exports = router