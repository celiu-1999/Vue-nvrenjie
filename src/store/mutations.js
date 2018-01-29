// 通过commit提交之后的动作
import {
  SET_SERACH,
  SET_PAGE,
  SET_USER,
  SET_SIGNIN,
  SET_COMMODITYID,
  SET_PURCHASE,
  SET_PURCHASE_PLUS,
  SET_ORDER_OPTION,
  SET_PURCHASE_REDUCE,
  SET_SHOPPING_CART_PURCHASE
} from './types'

import getters from './getters'  // 把数据打包处理一下输出

const state = {
  serach: '',
  page: 1,
  user: {},
  signIn: false,
  commodityId: 0,
  OrderOptions: false,
  purchase: {},
  ShoppingCartPurchase: []
}

const mutations = {
  [SET_SERACH] (state, serach) {
    state.serach = serach
  },
  [SET_PAGE] (state, page) {
    state.page = page
  },
  [SET_USER] (state, user) {
    state.user = user
  },
  [SET_SIGNIN] (state, signIn) {
    state.signIn = signIn
  },
  [SET_COMMODITYID] (state, commodityId) {
    state.commodityId = commodityId
  },
  [SET_ORDER_OPTION] (state, OrderOptions) {
    state.OrderOptions = OrderOptions
  },
  [SET_PURCHASE] (state, purchase) {
    state.purchase = purchase
  },
  [SET_PURCHASE_PLUS] (state) {
    state.purchase.CommodityNum++
  },
  [SET_PURCHASE_REDUCE] (state) {
    state.purchase.CommodityNum--
  },
  [SET_SHOPPING_CART_PURCHASE] (state, ShoppingCartPurchase) {
    state.ShoppingCartPurchase = ShoppingCartPurchase
  }
}

export default {
  state,
  mutations,
  getters
}
