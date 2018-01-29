import * as types from './types'
// 动作，比如点击后干什么

export default {
  PurchasePlus: ({
    commit
  }) => {
    commit(types.SET_PURCHASE_PLUS)
  },
  PurchaseReduce: ({
    commit
  }) => {
    commit(types.SET_PURCHASE_REDUCE)
  },
  ShoppingCartPurchase: ({
    commit
  }) => {
    commit(types.SET_SHOPPING_CART_PURCHASE)
  },
  OrderOptions: ({
    commit
  }) => {
    commit(types.SET_ORDER_OPTION)
  }
}
