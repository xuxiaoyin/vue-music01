import * as types from './mutation-types'
import {getNutil} from 'common/js/nutil'
import {palyMode} from 'common/js/config'

export const selectPlay=function({commit,state},{list,index}){
  commit(types.SET_SEQUENCELIST,list)
  commit(types.SET_SONGLIST,list)
  commit(types.SET_CURRENTINDEX,index)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING,true)
}

export const redomPlay=function({commit},{list}){
  let radomList=getNutil(list)
  commit(types.SET_SONGLIST,radomList)
  commit(types.SET_CURRENTINDEX,0)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING,true)
}