import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
// comminParams公共参数

export function getRecommend () {
  // jsonp初始url
  const url = 'https://h5api.m.taobao.com/h5/mtop.taobao.wireless.homepage.ac.loadpagecontent/5.0/'

  // url 后面的参数, 拼接
  const data = Object.assign({}, commonParams, {
    jsv: '2.4.8',  
    appKey: 12574478,
    t: 1512610989326,
    sign: '2b4ed4149da51e90581809cfbdc09519',
    api: 'mtop.taobao.wireless.homepage.ac.loadPageContent',
    v: 5.0,
    H5Request: true,
    type: 'jsonp',
    dataType: 'jsonp'
  })

  return jsonp(url, data, options)
}
