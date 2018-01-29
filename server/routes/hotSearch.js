var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var HotSearchs = require("../models/hotSearch.js")

// 获取HotSearchs数据
router.get("/", function (req, res, next) {
    let params = {}

    let HotSearchsModel = HotSearchs.find(params)
    
    HotSearchsModel.exec(function (err, doc) {
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