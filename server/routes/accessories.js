var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Accessoriess = require("../models/accessories.js")

// 获取Accessories页面数据
router.get("/", function (req, res, next) {
    let params = {}

    let AccessoriessModel = Accessoriess.find(params)
    
    AccessoriessModel.exec(function (err, doc) {
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