import * as types from './mutation-types'
import {getNutil} from 'common/js/nutil'
import {palyMode} from 'common/js/config'

function findIndex(list,song) {
  return list.findIndex((item) => {
    return item.id===song.id
  })
}

export const selectPlay=function({commit,state},{list,index}){
  commit(types.SET_SEQUENCELIST,list)
  if(state.mode===palyMode.random) {
    let radomList=getNutil(list)
    commit(types.SET_SONGLIST,radomList)
    index=findIndex(radomList,list[index])
  }else{
    commit(types.SET_SONGLIST,list)
  }
  commit(types.SET_CURRENTINDEX,index)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING,true)
}

export const redomPlay=function({commit},{list}){
  commit(types.SET_SEQUENCELIST,list)
  let radomList=getNutil(list)
  commit(types.SET_SONGLIST,radomList)
  commit(types.SET_MODE,palyMode.random)
  commit(types.SET_CURRENTINDEX,0)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING,true)
}