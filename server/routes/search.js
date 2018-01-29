var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var search = require("../models/search.js")
var searchTimess = require("../models/searchTimes.js")

function ranking (name) {
    let params = {
        content: name
    }
    // 查询数据表，获取数据
    let searchTimessModel = searchTimess.find(params)
    searchTimessModel.exec(function (err, doc) {
        if (err) {
            console.log(err)
        } else {
            if (doc.length == 0) {
                var Establish = new searchTimess({
                    "frequency" : 1,
                    "content" : name
                })
                Establish.save(function(err,doc){
                    if(err){
                        console.log("error :" + err);
                    } else {
                        console.log('创建搜索项：' + name);
                    }
                });
            } else {
                var x = doc[0].frequency
                var conditions = {content : name};
                var update     = {$set : {frequency : ++x}};
                var options    = {upsert : true};
                searchTimessModel.update(conditions, update, options, function(error){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log('update ok!');
                    }
                    // //关闭数据库链接
                    // db.close();
                });
            }
        }
    })
}

// 搜索页面
// http://localhost:3000/search?page=1&pageSize=4&priceLevel=all&priceGt=0&priceLte=50&name=当当网&price=-1
router.get('/', function (req, res, next) {
    let page = parseInt(req.param("page"))  // 分页
    let pageSize = parseInt(req.param("pageSize")) //一个分页多少个
    let skip = (page - 1) * pageSize    // 计算获取第多少个到多少个
    let priceLevel = req.param("priceLevel") //获取搜索筛选价格(all,0-100) 
    var priceGt = parseInt(req.param("priceGt"))  // 筛选价格 (大于)
    var priceLte = parseInt(req.param("priceLte")) // 筛选价格 (小于等于)  
    let name = req.param("name")            // 获取搜索的内容
    let sold = parseInt(req.param("sold"))  // 筛选购买人数  (1正序 -1 倒序)
    let praise = parseInt(req.param("praise"))  // 筛选好评率  (1正序 -1 倒序)
    let price = parseInt(req.param("price"))  // 筛选价格  (1正序 -1 倒序)
    let params = {}
    
    ranking(name)

    if (priceLevel != 'all') {
      params = {
        price: {
          $gt: priceGt,
          $lte: priceLte || Infinity
        },
        name: new RegExp(name, 'i') // 正则表达式匹配搜索的内容
      }
    } else if (priceLevel == 'all') {
        params = {
           name: new RegExp(name, 'i') // 正则表达式匹配搜索的内容
        } 
    }
    let searchModel = search.find(params).skip(skip).limit(pageSize)

    if (!isNaN(sold) && sold != '') {
        searchModel.sort({'sold': sold})        
    } else if (!isNaN(praise) && praise != '') {
        searchModel.sort({'praise': praise})                
    } else if (!isNaN(price) && price != '')  {
        searchModel.sort({'price': price})
    }

    searchModel.exec(function (err, doc) {
        if (err) {
            console.log(err)
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