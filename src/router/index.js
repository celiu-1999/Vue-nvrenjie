import Vue from 'vue'
import Router from 'vue-router'
import find from '@/components/find/find'
import BeautyCare from '@/components/BeautyCare/BeautyCare'
import Accessories from '@/components/Accessories/Accessories'
import ThisWeek from '@/components/ThisWeek/ThisWeek'
import everyday from '@/components/everyday/everyday'
import search from '@/components/search/search'
import searchResult from '@/components/search-result/search-result'
import commodity from '@/components/commodity/commodity'
import login from '@/components/login/login'
import ShoppingCart from '@/components/shopping-cart/shopping-cart'
import collection from '@/components/collection/collection'
import address from '@/components/address/address'
import PersonalInformation from '@/components/PersonalInformation/PersonalInformation'
import orderList from '@/components/order-list/order-list'
import purchase from '@/components/purchase/purchase'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'find',
      component: find
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/ShoppingCart',
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/collection',
      name: 'collection',
      component: collection
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList
    },
    {
      path: '/purchase',
      name: 'purchase',
      component: purchase
    },
    {
      path: '/PersonalInformation',
      name: 'PersonalInformation',
      component: PersonalInformation
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/BeautyCare',
      name: 'BeautyCare',
      component: BeautyCare
    },
    {
      path: '/Accessories',
      name: 'Accessories',
      component: Accessories
    },
    {
      path: '/ThisWeek',
      name: 'ThisWeek',
      component: ThisWeek
    },
    {
      path: '/everyday',
      name: 'everyday',
      component: everyday
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      children: [
        {
          path: ':id',
          component: searchResult
        }
      ]
    },
    {
      path: '/commodity',
      component: commodity,
      children: [
        {
          path: ':id',
          component: commodity
        }
      ]
    }
    // ,
    // {
    //   path: '/searchresult',
    //   component: searchResult,
    //   children: [
    //     {
    //       path: ':id',
    //       component: searchResult
    //     }
    //   ]
    // }
  ]
})
