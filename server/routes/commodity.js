var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Commoditys = require("../models/commodity.js")

// 获取Commoditys页面数据
router.get("/", function (req, res, next) {
    console.log(123)
    let params = {}

    let CommoditysModel = Commoditys.find(params)
    
    CommoditysModel.exec(function (err, doc) {
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