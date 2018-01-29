var express = require('express')
var router = express.Router()
var Homes = require("../models/home.js")

// 获取Index数据
router.get("/", function (req, res, next) {
    let params = {}

    let HomesModel = Homes.find(params)
    
    HomesModel.exec(function (err, doc) {
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