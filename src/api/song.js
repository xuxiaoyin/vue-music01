import {getUid} from 'common/js/uid'
import {commonParams} from './config.js'
import axios from 'axios'

export function getLyric(mid) {
  const url='/api/getLyric'
  const data=Object.assign({},commonParams,{
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongsUrl(songs) {
  const url = '/api/getPurlUrl'
  let mids = []
  let types = []

  songs.forEach(song => {
    mids.push(song.mid)
    types.push(0)
  })

  const urlMid = genUrlMid(mids, types)

  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    uin: 0
  })

  return axios.post(url, {
    comm: data,
    url_mid: urlMid
  })
  .then((res) => {
    return Promise.resolve(res.data)
  })
}

// 添加获取 URL MID
function genUrlMid(mids, types) {
  const guid = getUid()
  return {
    module: 'vkey.GetVkeyServer',
    method: "CgiGetVkey",
    param: {
      guid,
      songmid: mids,
      songtype: types,
      uin: '0',
      loginflag: 0,
      platform: '23'
    }
  }
}