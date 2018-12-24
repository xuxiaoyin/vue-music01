import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config.js'
import axios from 'axios'

export function SingerList(){
  const url='https://u.y.qq.com/cgi-bin/musicu.fcg?-=getUCGI9333398852348282'
  const data=Object.assign({},commonParams,{
    g_tk: 5381,
    platform: 'yqq',
    needNewCode: 0,
    hostUin: 0,
    loginUin: 0,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
