var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var User = require('../models/user.js')
var CommodityItem = require("../models/commodity_item.js")
var cartListAll = []
var collectionAll = []
var TemporaryOrder = {}
var PaymentOrder = []
var PaymentOrderReceiptsAddress = {}
var Allfreight = 0
var AllPrice = 0
var ShoppingCartAllPrice = 0
var ShoppingCartCommodityDataArray = []

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 登陆
router.post('/login', function(req, res, next) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }

  User.findOne(param, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: '用户名不存在或密码错误'
      })
    } else {
      if (doc) {
        res.cookie("userId", doc.userId, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie("userName", doc.userName, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie("headImg", doc.headImg, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.cookie("Name", doc.name, {
          path: '/',
          maxAge: 1000 * 60 * 60
        })
        res.json({
          status: '0',
          msg: '',
          result: {
            name: doc.name,
            headImg: doc.headImg
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '用户名不存在或密码错误',
          result: ''
        })
      }
    }
  })
});

// 注册
router.post('/register', function (req, res, next) {
    var userName = req.body.userName
    var userPwd = req.body.userPwd
    var phone = req.body.phone
  User.findOne({userName: req.body.userName}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (!doc) {
        var user = new User({
          "userId": TimeCode('10000'),
          "userName": userName,
          "userPwd": userPwd,
          "headImg": '/static/imgs/user/login.png',
          "name": userName,
          "phone": phone,
          "identity_name": '',
          "identity": 0,
          "email": '',
          "collectionItem": [],
          "orderList": {
            "Unpaid": [],
            "payment": [],
            "AlreadyShipped": [],
            "NotAppraised": [],
            "HaveBeenEvaluated": []
          },
          "cartList": [],
          "__v": 100
        })
        user.save(function (err, doc) {
          if (err) {
            res.json({
              status: '1',
              msg: '账户创建-服务器错误'
            })
          } else {
            res.json({
              status: '0',
              msg: '账户创建成功'
            })
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '账户已存在'
        })
      }
    }
  })
})


// 登出接口
router.post('/logout', function (req, res, next) {
  res.cookie("userId", "", {
    path: '/',
    maxAge: -1
  })
  res.cookie("userName", "", {
    path: '/',
    maxAge: -1
  })
  res.cookie("headImg", "", {
    path: '/',
    maxAge: -1
  })
  res.cookie("Name", "", {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

// 个人信息
router.post('/admin', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: 'Id不存在或服务器错误'
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: {
            username: doc.userName,
            name: doc.name,
            headImg: doc.headImg,
            email: doc.email
          }
        })
      }
    }
  })
})

// 修改个人信息
router.post('/SetAdminOk', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var name = req.body.name
  var email = req.body.email
  User.update({"userId": userId}, {
    "name": name,
    "email": email
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.cookie("Name", name, {
        path: '/',
        maxAge: 1000 * 60 * 60
      })
      res.json({
        status: '0',
        msg: '',
        result: '用户信息修改成功'
      })
    }
  })
})

// 购物车
router.post('/cartList', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        cartListAll = []
        var frequency = doc.cartList.length
        for(var i = 0; i < frequency; i++) {
          forCartListId(doc.cartList[i], i, frequency, function () {
            res.json({
              status: '0',
              msg: '',
              result: cartListAll
            })
            cartListAll = []
          })
        }
      }
    }
  })
})

// 获取购物车是否为全选
router.post("/GetSelect", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        SelectAll = []
        for(var i = 0; i < doc.cartList.length; i++) {
          SelectAll.push(doc.cartList[i].commodityOptionIdSelected)
        }
        if (isCon(SelectAll, false)) {
          res.json({
            status: '0',
            msg: '',
            result: {
              SelectAll: false
            }
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: {
              SelectAll: true
            }
          })
        }
      }
    }
  })
})

// 获取购物车商品的option选项和商品购买数量
router.get('/ShoppingCartOption', function (req, res, next) {
  let id = parseInt(req.param('id'))
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  let params = {
    id: id
  }
  CommodityItem.findOne(params, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        User.findOne({userId: userId}, function (err2, doc2) {
          if (err2) {
            console.log(err2)
          } else {
            for (var i = 0; i < doc2.cartList.length; i++) {
              if (doc2.cartList[i].commodityId === id) {
                var temporary = {}
                temporary.commodityNumber = doc2.cartList[i].commodityNumber
                temporary.commodityOptionItemImg = doc2.cartList[i].commodityOptionItemImg
                temporary.commodityOptionItemId = doc2.cartList[i].commodityOptionItemId
                res.json({
                  status: '0',
                  msg: '',
                  result: doc.option,
                  commodityNumber: temporary
                })
              }
            }    
          }
        })
      }
    }
  })
})

// 修改购物车选项
router.get('/SetOptionItem', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  let commodityId = parseInt(req.param('commodityId'))
  let optionId = parseInt(req.param('optionId'))
  let optionItemId = parseInt(req.param('optionItemId'))
  let selected = req.param('selected')
  let InputNum = parseInt(req.param('InputNum'))
  User.update({"userId": userId, "cartList.commodityId": commodityId}, {
    "cartList.$.commodityOptionItemId": optionItemId,
    "cartList.$.commodityNumber": InputNum
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'Ok'
      })
    }
  })
})

// 修改购物车商品数量
router.get('/SetShoppingCartNum', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  let commodityId = parseInt(req.param('commodityId'))
  let Num = parseInt(req.param('Num'))
  User.update({"userId": userId, "cartList.commodityId": commodityId}, {
    "cartList.$.commodityNumber": Num
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'Ok'
      })
    }
  })
})

// 购物车全部价格计算
router.post('/ShoppingCartAllPrice', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      ShoppingCartAllPrice = 0
      var actions = []  // 定义一个空的方法数组 
      for (var i = 0; i < doc.cartList.length; i++) {
        if (doc.cartList[i].commodityOptionIdSelected === true) {       
          var action = () => {
            return new Promise((resolve, reject) => { // 每个方法返回一个Promise对象，第一个参数为resolve方法  
              ShoppingCartPriceCalculation(doc.cartList[i], function () {
                resolve()
              })
            })
          }
          actions.push(action())
        }
      }
      Promise.all(actions).then(()=>{ // 调用Promise的all方法，传入方法数组，结束后执行then方法参数中的方法  
        res.json({
          status: '0',
          msg: '',
          result: ShoppingCartAllPrice
        })
        ShoppingCartAllPrice = 0
      })
    }
  })
})

// 购物车循环累加全部商品价格计算
function ShoppingCartPriceCalculation (data, callback) {
  CommodityItem.findOne({id: data.commodityId}, function(err2, doc2) {
    if (err2) {
      console.log(err2)
    } else {
      ShoppingCartAllPrice += data.commodityNumber * doc2.price + doc2.express
      if (callback) {
        callback()
      }
    }
  })
}

// 购物车删除
router.post("/cartDel", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = parseInt(req.body.commodityId)
  User.update({userId: userId}, {$pull: {'cartList': {'commodityId': commodityId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '删除成功'
      })
    }
  })
})

// 购物车选中
router.post("/OptionIdSelected", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = parseInt(req.body.commodityId)
  var selected = req.body.selected
  User.update({"userId": userId, "cartList.commodityId": commodityId}, {
    "cartList.$.commodityOptionIdSelected": selected
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: 'Ok'
      })
    }
  })
})

// 购物车全选
router.post("/ShoppingCartSelect", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var selected = req.body.selected
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      var actions = []
      for (var i = 0; i < doc.cartList.length; i++) {
        var action = () => {
          return new Promise((resolve, reject) => { // 每个方法返回一个Promise对象，第一个参数为resolve方法  
            doc.cartList[i].commodityOptionIdSelected = selected
            doc.save(function (err2) {
              if (err2) {
                console.log(err2)
                reject()
              } else {
                resolve()
              }
            })
          })
        }  
        actions.push(action())
      }
       
      Promise.all(actions).then(()=>{ // 调用Promise的all方法，传入方法数组，结束后执行then方法参数中的方法  
        res.json({
          status: '0',
          msg: '',
          result: '购物车全选设置成功'
        })
      })
    }
  })
})

// 返回购物车被选中的商品
router.post("/TheShoppingCartWasSelected", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var selected = req.body.selected
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      var ShoppingCartSelection = []
      var actions = []
      for (var i = 0; i < doc.cartList.length; i++) {
        if (doc.cartList[i].commodityOptionIdSelected === true) {
          var action = () => {
            return new Promise((resolve, reject) => {
              ShoppingCartSelection.push(doc.cartList[i])
              resolve()
            })
          }
          actions.push(action())
        }
      }
      Promise.all(actions).then(() => {
        res.json({
          status: '0',
          msg: '',
          result: ShoppingCartSelection
        })
      })
    }
  })
})

// 加入购物车
router.post("/AddToCart", function(req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = req.body.commodityId
  var commodityNumber = req.body.commodityNumber
  var commodityOptionId = req.body.commodityOptionId
  var commodityOptionItemId = req.body.commodityOptionItemId
  var commodityOptionItemImg = req.body.commodityOptionItemImg
  var commodityOptionIdSelected = req.body.commodityOptionIdSelected
  User.findOne({"userId": userId, "cartList.commodityId": commodityId}, function(err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {  // 判断要加入购物车的商品是否存在
        for (var i = 0; i < doc.cartList.length; i++) {
          if (doc.cartList[i].commodityId === commodityId) {
            User.update({"userId": userId, "cartList.commodityId": commodityId}, {
              "cartList.$.commodityOptionId": commodityOptionId,
              "cartList.$.commodityOptionItemId": commodityOptionItemId,
              "cartList.$.commodityOptionItemImg": commodityOptionItemImg,
              "cartList.$.commodityNumber": (commodityNumber + doc.cartList[i].commodityNumber)
            }, function (err, doc2) {
              if (err) {
                res.json({
                  status: '1',
                  msg: err.message,
                  result: ''
                })
              } else {
                res.json({
                  status: '0',
                  msg: '',
                  result: '加入购物车成功'
                })
              }
            })
          }
        }
      } else {  // 要加入的购物车没有这个商品，
        User.update({"userId": userId}, {
          $push: {
            "cartList": {
              "commodityId": commodityId,
              "commodityOptionId": commodityOptionId,
              "commodityOptionItemId": commodityOptionItemId,
              "commodityOptionItemImg": commodityOptionItemImg,
              "commodityNumber": commodityNumber,
              "commodityOptionIdSelected": commodityOptionIdSelected
            }
          }
        }, function (err, doc) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: '加入购物车成功'
            })
          }
        })
      }
    }
  })

  
})

// 收藏
router.post("/collection", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        collectionAll = []
        var frequency = doc.collectionItem.length
        for(var i = 0; i < frequency; i++) {
          forCollectionId(doc.collectionItem[i], i, frequency, function () {
            res.json({
              status: '0',
              msg: '',
              result: collectionAll
            })
            collectionAll = []
          })
        }
      }
    }
  })
})

// 收藏删除
router.post("/collectionDel", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = parseInt(req.body.commodityId)
  User.update({userId: userId}, {$pull: {'collectionItem': {'commodityId': commodityId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '删除成功'
      })
    }
  })
})

// 加入收藏
router.post("/AddCollection", function(req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = req.body.commodityId
  User.findOne({"userId": userId, "collectionItem.commodityId": commodityId}, function(err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {  // 判断要加入收藏的商品是否存在
        for (var i = 0; i < doc.collectionItem.length; i++) {
          if (doc.collectionItem[i].commodityId === commodityId) {
            res.json({
              status: '0',
              msg: '',
              result: '加入收藏成功'
            })
          }
        }
      } else {  // 要加入的收藏没有这个商品，
        User.update({"userId": userId}, {
          $push: {
            "collectionItem": {
              "commodityId": commodityId
            }
          }
        }, function (err, doc) {
          if (err) {
            res.json({
              status: '1',
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: '加入收藏成功'
            })
          }
        })
      }
    }
  })
})

// 收货地址
router.post("/getAddress", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.addressList
        })
      }
    }
  })
})

// 收货地址删除
router.post("/DelectAddress", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = parseInt(req.body.addressId)
  User.update({userId: userId}, {$pull: {'addressList': {'addressId': addressId}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '删除成功'
      })
    }
  })
})

// 设置默认收货地址
router.post("/DefaultAddress", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = parseInt(req.body.addressId)
  User.update({"userId": userId, "addressList.isDefault": true}, {
    "addressList.$.isDefault": false
  }, function (err) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      User.update({"userId": userId, "addressList.addressId": addressId}, {
        "addressList.$.isDefault": true
      }, function (err) {
        if (err) {
          res.json({
            status: '1',
            msg: err.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: '默认地址设置成功'
          })
        }
      })   
    }
  })
})

// 根据Id获取某个收货地址
router.post("/getAddressItem", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = parseInt(req.body.addressId)
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var i = 0; i < doc.addressList.length; i++) {
          if (doc.addressList[i].addressId === addressId) {
            res.json({
              status: '0',
              msg: '',
              result: doc.addressList[i]
            })
            return
          }
        }
      }
    }
  })
})

// 根据Id修改某个收货地址
router.post("/addressModifyOk", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = req.body.addressId
  var UserName = req.body.UserName
  var Tel = req.body.Tel
  var StreetName = req.body.StreetName
  User.update({"userId": userId, "addressList.addressId": addressId}, {
    "addressList.$.userName": UserName,
    "addressList.$.tel": Tel,
    "addressList.$.streetName": StreetName
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '收货地址修改成功'
      })
    }
  })
})

// 创建收货地址 
router.post("/addressAddOk", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var UserName = req.body.UserName || ''
  var Tel = req.body.Tel || ''
  var StreetName = req.body.StreetName || ''
  var postCode = req.body.postCode || '036000'
  var addressId = TimeCode('10') + parseInt(Math.random() * 10 )
  var isDefault = false
  User.update({"userId": userId}, {
    $push: {
      "addressList": {
        "addressId": addressId,
        "userName": UserName,
        "streetName": StreetName,
        "postCode": postCode,
        "tel": Tel,
        "isDefault": isDefault
      }
    }
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '地址添加成功'
      })
    }
  })
})

// 订单管理 获取全部订单列表
router.post("/orderList", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        res.json({
          status: '0',
          msg: '',
          result: doc.orderList
        })
      }
    }
  })

})

// 订单管理 获取某一项（未付款）的订单列表
router.post("/orderListItem", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var term = req.body.term
  if (!term) {
    res.json({
      status: '1',
      msg: 'term 错误',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      for (var i in doc.orderList) {
        if (i === term) {
          if (doc) {
            res.json({
              status: '0',
              msg: '',
              result: doc.orderList[i]
            })
          }
          break
        }
      }
    }
  })

})

// 创建新订单 返回默认收货地址
router.post('/GetDefaultAddress', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var i = 0; i < doc.addressList.length; i++) {
          if (doc.addressList[i].isDefault === true) {
            res.json({
              status: '0',
              msg: '',
              result: doc.addressList[i]
            })
            return
          }
        }
      }
    }
  })
})

// 创建新订单 根据商品Id,商品选项集合ID,某个商品选项ID,返回商品
router.post('/OrderCommodity', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var commodityId = req.body.commodityId
  var optionId = req.body.optionId
  var optionItemId = req.body.optionItemId
  CommodityItem.findOne({id: commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        var temporaryArray = []
        var temporary = {}
        temporary.id = doc.id
        temporary.img = doc.img
        temporary.title = doc.title
        temporary.price = doc.price
        temporary.OriginalPrice = doc.OriginalPrice
        temporary.express = doc.express
        for (var j = 0; j < doc.option.length;j++) {
          if (doc.option[j].id === optionId) {
            for (var i = 0; i < doc.option[j].option_item.length; i++) {
              if (doc.option[j].option_item[i].id === optionItemId) {
                temporary.optionItemId = doc.option[j].option_item[i].id
                temporary.optionItemTitle = doc.option[j].option_item[i].option_title
                temporaryArray.push(temporary)
                res.json({
                  status: '0',
                  msg: '',
                  result: temporaryArray
                })
                return
              }
            }
          }
        }
      }
    }
  })
})

// 创建新订单 根据购物车选中列表创建新单
router.post('/getShoppingCartPurchase', function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var ShoppingCartPurchase = req.body.ShoppingCartPurchase
  ShoppingCartCommodityDataArray = []
  var actions = []
  for (var i = 0; i < ShoppingCartPurchase.length; i++) {
    var action = () => {
      return new Promise((resolve, reject) => {
        GetShoppingCartCommodityData(ShoppingCartPurchase[i], function () {
          resolve()
        })
      })
    }
    actions.push(action())
  }
  Promise.all(actions).then(() => {
    res.json({
      status: '0',
      msg: '',
      result: ShoppingCartCommodityDataArray
    })
    ShoppingCartCommodityDataArray = []
  })
})

// 通过购物车选中选项获取数据
function GetShoppingCartCommodityData (data, callback) {

  CommodityItem.findOne({id: data.commodityId}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err,
        result: ''
      })
    } else {
      if (doc) {
        var temporary = {}
        temporary.id = doc.id
        temporary.img = doc.img
        temporary.title = doc.title
        temporary.price = doc.price
        temporary.OriginalPrice = doc.OriginalPrice
        temporary.express = doc.express
        for (var j = 0; j < doc.option.length;j++) {
          if (doc.option[j].id === data.commodityOptionId) {
            for (var i = 0; i < doc.option[j].option_item.length; i++) {
              if (doc.option[j].option_item[i].id === data.commodityOptionItemId) {
                temporary.optionItemId = doc.option[j].option_item[i].id
                temporary.optionItemTitle = doc.option[j].option_item[i].option_title
                temporary.commodityNumber = data.commodityNumber
                ShoppingCartCommodityDataArray.push(temporary)
                temporary = {}
                if (callback) {
                  callback()
                }
                return
              }
            }
          }
        }
      }
    }
  })
}

// 商品 创建新订单  已付款
router.post("/AlreadyPaid", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = req.body.addressId
  var allNum = req.body.allNum
  var commodity = req.body.commodity
  var LeavingAMessage = req.body.LeavingAMessage || ''
  var NewOrder = {}
  var OrderNumber = TimeCode('1980')
  var Date = DateId()
  var actions = []
  // 获取指定收货地址
  SelectAddress(userId, addressId)
  for (var i = 0; i < commodity.length; i++) {
    var GetRecyclingOfGoods = () => {
      return new Promise((resolve, reject) => {
        // 循环获取商品
        ((i) => {
          RecyclingOfGoods(commodity[i], LeavingAMessage, function () {
            // 循环累加运费
            FreightCalculation(commodity[i], function () {
                // 循环累加价格
              PriceCalculation(commodity[i], function () {
                resolve()
              })
            })
          })
        })(i)
      })
    }
    actions.push(GetRecyclingOfGoods())
  }
  Promise.all(actions).then(() => {
    User.update({userId: userId}, {
      $push: {
        'orderList.payment': {
          "OrderNumber": OrderNumber,
          "Date": Date,
          "state": '买家已付款',
          "stateID" : '102',
          "AllPrice": AllPrice + Allfreight,
          "allNum" : allNum,
          "freight": Allfreight,
          "address": PaymentOrderReceiptsAddress,
          "commodity": PaymentOrder
        }
      }
    }, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          msg: '',
          result: '付款成功'
        })
        allNum = 0
        Allfreight = 0
        AllPrice = 0
        PaymentOrderReceiptsAddress = {}
        PaymentOrder = []
      }
    })
  })
  
})


// 商品 创建新订单  未付款
router.post("/NoPayment", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var addressId = req.body.addressId
  var allNum = req.body.allNum
  var commodity = req.body.commodity
  var LeavingAMessage = req.body.LeavingAMessage || ''
  var NewOrder = {}
  var OrderNumber = TimeCode('1980')
  var Date = DateId()
  var actions = []
  // 获取指定收货地址
  SelectAddress(userId, addressId)
  for (var i = 0; i < commodity.length; i++) {
    var GetRecyclingOfGoods = () => {
      return new Promise((resolve, reject) => {
        // 循环获取商品
        ((i) => {
          RecyclingOfGoods(commodity[i], LeavingAMessage, function () {
            // 循环累加运费
            FreightCalculation(commodity[i], function () {
                // 循环累加价格
              PriceCalculation(commodity[i], function () {
                resolve()
              })
            })
          })
        })(i)
      })
    }
    actions.push(GetRecyclingOfGoods())
  }
  Promise.all(actions).then(() => {
    User.update({userId: userId}, {
      $push: {
        'orderList.Unpaid': {
          "OrderNumber": OrderNumber,
          "Date": Date,
          "state": '买家未付款',
          "stateID" : '101',
          "AllPrice": AllPrice + Allfreight,
          "allNum" : allNum,
          "freight": Allfreight,
          "address": PaymentOrderReceiptsAddress,
          "commodity": PaymentOrder
        }
      }
    }, function (err, doc) {
      if (err) {
        console.log(err)
      } else {
        res.json({
          status: '0',
          msg: '',
          result: '加入订单成功'
        })
        allNum = 0
        Allfreight = 0
        AllPrice = 0
        PaymentOrderReceiptsAddress = {}
        PaymentOrder = []
      }
    })
  })
  
})

// 循环获取商品
function RecyclingOfGoods (commodity, LeavingAMessage, callback) {
  var TemporaryObject = {}
  CommodityItem.findOne({id: commodity.commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        var temporary = {}
        for (var j = 0 ; j < doc.option.length; j++) {
          if (doc.option[j].id === (commodity.optionId || commodity.commodityOptionId)) {
            for (var x = 0; x < doc.option[j].option_item.length; x++) {
              if (doc.option[j].option_item[x].id === (commodity.optionItemId || commodity.commodityOptionItemId)) {
                TemporaryObject.commodityId = doc.id
                TemporaryObject.commodityOptionId = doc.option[j].id
                TemporaryObject.commodityOptionItemId = doc.option[j].option_item[x].id
                TemporaryObject.num = commodity.CommodityNum || commodity.commodityNumber
                TemporaryObject.option = doc.option[j].option_item[x].option_title
                TemporaryObject.img = doc.img
                TemporaryObject.title = doc.title
                TemporaryObject.Price = doc.price
                TemporaryObject.OriginalPrice = doc.OriginalPrice
                TemporaryObject.express = doc.express
                TemporaryObject.LeavingAMessage = LeavingAMessage
                PaymentOrder.push(TemporaryObject)
              }
            }
          }
        }
      }
      if (callback) {
        callback()
      }
    }
  })
}
// 获取指定收货地址
function SelectAddress (userId, addressId, callback) {
  PaymentOrderReceiptsAddress = {}
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var  i = 0; i < doc.addressList.length; i++) {
          if (doc.addressList[i].addressId === addressId) {
            PaymentOrderReceiptsAddress = doc.addressList[i]
          }
        }
      }
      if (callback) {
        callback()
      }
    }
  })
}
// 循环累加运费
function FreightCalculation (commodity, callback) {
  var TemporaryObject = {}
  CommodityItem.findOne({id: commodity.commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        var temporary = {}
        Allfreight += doc.express
      }
      if (callback) {
        callback()
      }
    }
  })
}
// 循环累加价格
function PriceCalculation (commodity, callback) {
  var TemporaryObject = {}
  CommodityItem.findOne({id: commodity.commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        var temporary = {}
        AllPrice += (commodity.CommodityNum || commodity.commodityNumber) * doc.price
      }
      if (callback) {
        callback()
      }
    }
  })
}

// 未付款订单 付款
router.post("/payment", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var OrderNumber = req.body.OrderNumber
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var i = 0; i < doc.orderList.Unpaid.length; i++) {
          if (doc.orderList.Unpaid[i].OrderNumber === OrderNumber) {
            var temporary = []
            temporary = doc.orderList.Unpaid[i]
            temporary.stateID = '102'
            temporary.state = '买家已付款'
            User.update({userId: userId}, {
              $push: {
                "orderList.payment": temporary
              }
            }, function (err2, doc2) {
              if (err2) {
                console.log(err2)
              } else {
                if (doc2) {
                  delOrder(userId, OrderNumber, function () {
                    res.json({
                      status: '0',
                      msg: '',
                      result: '付款成功'
                    })
                  })
                }
              }
            })
            break;
          }
        }
      }
    }
  })
})

// 未确认收货订单 确认收货
router.post("/GoodsReceipt", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var OrderNumber = req.body.OrderNumber
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var i = 0; i < doc.orderList.AlreadyShipped.length; i++) {
          if (doc.orderList.AlreadyShipped[i].OrderNumber === OrderNumber) {
            var temporary = []
            temporary = doc.orderList.AlreadyShipped[i]
            temporary.stateID = '104'
            temporary.state = '买家已收货'
            User.update({userId: userId}, {
              $push: {
                "orderList.NotAppraised": temporary
              }
            }, function (err2, doc2) {
              if (err2) {
                console.log(err2)
              } else {
                if (doc2) {
                  delGoodsReceipt(userId, OrderNumber, function () {
                    res.json({
                      status: '0',
                      msg: '',
                      result: '确认收货成功'
                    })
                  })
                }
              }
            })
            break;
          }
        }
      }
    }
  })
})

// 已确认收货订单未评价 评价
router.post("/SubmitEvaluate", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var OrderNumber = req.body.OrderNumber
  var EvaluationContent  = req.body.EvaluationContent
  User.findOne({userId: userId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        for (var i = 0; i < doc.orderList.NotAppraised.length; i++) {
          if (doc.orderList.NotAppraised[i].OrderNumber === OrderNumber) {
            var temporary = []
            temporary = doc.orderList.NotAppraised[i]
            temporary.stateID = '105'
            temporary.state = '订单完成'
            temporary.evaluate = EvaluationContent
            User.update({userId: userId}, {
              $push: {
                "orderList.HaveBeenEvaluated": temporary
              }
            }, function (err2, doc2) {
              if (err2) {
                console.log(err2)
              } else {
                if (doc2) {
                  delEvaluate(userId, OrderNumber, function () {
                    res.json({
                      status: '0',
                      msg: '',
                      result: '提交评价成功'
                    })
                  })
                }
              }
            })
            break;
          }
        }
      }
    }
  })
})

// 未付款订单取消订单
router.post("/CancellationOfOrder", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var OrderNumber = req.body.OrderNumber
  User.update({userId: userId}, {$pull: {'orderList.Unpaid': {'OrderNumber': OrderNumber}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '取消订单成功'
      })
    }
  })
})

// 订单交易评价完毕 删除订单
router.post("/OrderDeletion", function (req, res, next) {
  var userId = req.cookies.userId
  if (!userId) {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
    return
  }
  var OrderNumber = req.body.OrderNumber
  User.update({userId: userId}, {$pull: {'orderList.HaveBeenEvaluated': {'OrderNumber': OrderNumber}}}, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: '订单删除成功'
      })
    }
  })
})
// 评价成功 删除 历史未评价订单
function delEvaluate (userId, OrderNumber, callback) {
  User.update({userId: userId}, {
    $pull: {
      'orderList.NotAppraised': {
        "OrderNumber": OrderNumber
      }
    }
  }, function (err3, doc3) {
    if (err3) {
      console.log(err3)
    } else {
      if (doc3) {
        callback()
      }
    }
  })
}

// 确认收货成功 删除 历史未确认收货订单
function delGoodsReceipt (userId, OrderNumber, callback) {
  User.update({userId: userId}, {
    $pull: {
      'orderList.AlreadyShipped': {
        "OrderNumber": OrderNumber
      }
    }
  }, function (err3, doc3) {
    if (err3) {
      console.log(err3)
    } else {
      if (doc3) {
        callback()
      }
    }
  })
}

// 付款成功 删除 历史未付款订单
function delOrder(userId, OrderNumber, callback) {
  User.update({userId: userId}, {
    $pull: {
      'orderList.Unpaid': {
        "OrderNumber": OrderNumber
      }
    }
  }, function (err3, doc3) {
    if (err3) {
      console.log(err3)
    } else {
      if (doc3) {
        callback()
      }
    }
  })
}

// 购物车列表循环push
function forCartListId(data, i, frequency, callback) {
  var cartListItem = {}
  var optionItem = {}
  var cartListItemNum = []

  var x = i + 1
  CommodityItem.findOne({id: data.commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        if (doc.option[0].id  === data.commodityOptionId) {
          for (var j = 0; j < doc.option[0].option_item.length; j++) {
            if (doc.option[0].option_item[j].id === data.commodityOptionItemId) {
              optionItem.option_title = doc.option[0].option_item[j].option_title
              optionItem.img = doc.option[0].option_item[j].img

              cartListItem.id = doc.id
              cartListItem.optionId = doc.option[0].id
              cartListItem.price = doc.price
              cartListItem.OriginalPrice = doc.OriginalPrice
              cartListItem.title = doc.title
              cartListItem.img = doc.img
              cartListItem.express = doc.express
              
              cartListItemNum.push(cartListItem)
              cartListItemNum.push(data.commodityNumber)
              cartListItemNum.push(data.commodityOptionIdSelected)
              cartListItemNum.push(optionItem)

              cartListAll.push(cartListItemNum)
              cartListItem = {}
              optionItem = {}

              break
            }
          }
        }
      }
      if (frequency == x) {
        callback()
      }
    }
  })
}

// 收藏列表循环push
function forCollectionId (data, i, frequency, callback) {
  var collectionItem = {}
  var optionItem = {}

  var x = i + 1
  CommodityItem.findOne({id: data.commodityId}, function (err, doc) {
    if (err) {
      console.log(err)
    } else {
      if (doc) {
        if (doc.id  === data.commodityId) {
          collectionItem.id = doc.id
          collectionItem.img = doc.img
          collectionItem.title = doc.title
          collectionItem.price = doc.price
          collectionItem.OriginalPrice = doc.OriginalPrice
          collectionItem.SalesVolume = doc.SalesVolume
          collectionItem.Praise = doc.Praise
          collectionItem.discount = doc.discount

          collectionAll.push(collectionItem)
          collectionItem = {}
        }
      }
      if (frequency == x) {
        callback()
      }
    }
  })
}

// 根据日期创建ID
function TimeCode (id) {
  var time = id + (new Date).getFullYear() + ((new Date).getMonth() + 1) + (new Date).getDate() + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds() + (new Date).getMilliseconds()
  return time
}
// 返回日期
function DateId () {
  var Id = '' + (new Date).getFullYear() + ((new Date).getMonth() + 1) + (new Date).getDate() + (new Date).getHours() + (new Date).getMinutes() + (new Date).getSeconds() + (new Date).getMilliseconds()
  return Id
}

// 循环判断数组中是否存在某个值
function isCon(arr, val){ 
  for(var i=0; i<arr.length; i++){ 
    if(arr[i] == val) 
      return true; 
    } 
  return false; 
}

// json深度复制
function extendDeep(parent, child) {

  var i,
    proxy;

  proxy = JSON.stringify(parent); //把parent对象转换成字符串
  proxy = JSON.parse(proxy) //把字符串转换成对象，这是parent的一个副本

  child = child || {};


  for(i in proxy) {
    if(proxy.hasOwnProperty(i)) {
      child[i] = proxy[i];
    }
  }

  proxy = null; //因为proxy是中间对象，可以将它回收掉

  return child;
}
// 数组深度复制
function deepcopy(obj) {
  var out = []
  var len = obj.length;
  for (var i = 0; i < len; i++) {
    out.push([])
    for (var j = 0; j < obj[i].length; j++) {
      out[i][j] = obj[i][j]
    }
  }
  return out;
}

module.exports = router;
