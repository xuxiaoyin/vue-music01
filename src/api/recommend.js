import jsonp from 'common/js/jsonp'
import {commonPara, options} from './config.js'

export function getRecommend() {
  const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data=Object.assign({},commonPara,{
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return jsonp(url,data,options)
}