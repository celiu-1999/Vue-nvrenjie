var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Navs = require("../models/nav.js")


// 获取Nav列表数据
router.get("/", function (req, res, next) {
    let params = {}

    let NavsModel = Navs.find(params)
    
    NavsModel.exec(function (err, doc) {
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