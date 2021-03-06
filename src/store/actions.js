import * as types from './mutation-types'
import { getNutil } from 'common/js/nutil'
import { palyMode } from 'common/js/config'
import { seachHistory, removeSeach, clearAll, savePlay, addFavourite, deleteFavourite } from 'common/js/catch'

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

export const insertSong=function({commit,state},song) {
  let songList=state.songList.slice()
  let sequenceList=state.sequenceList.slice()
  let currentIndex=state.currentIndex

  let currentSong=songList[currentIndex]
  let fpIndex=findIndex(songList,song)
  currentIndex++
  songList.splice(currentIndex,0,song)
  if(fpIndex>-1) {
    if(currentIndex>fpIndex) {
      songList.splice(fpIndex,1)
      currentIndex--
    }else {
      songList.splice(fpIndex+1,1)
    }
  }

  let currentsIndex=findIndex(sequenceList,currentSong)
  let fsIndex=findIndex(sequenceList,song)
  currentsIndex++
  sequenceList.splice(currentsIndex,0,song)
  if(fsIndex>-1) {
    if(currentsIndex>fsIndex) {
      sequenceList.splice(fsIndex,1)
    }else {
      sequenceList.splice(fsIndex+1,1)
    }
  }

  commit(types.SET_SONGLIST,songList)
  commit(types.SET_SEQUENCELIST,sequenceList)
  commit(types.SET_CURRENTINDEX,currentIndex)
  commit(types.SET_FULLSCREEN,true)
  commit(types.SET_PLAYING,true)
}

export const saveSeachHistory=function({commit},query) {
  commit(types.SET_SEACH_HISTORY,seachHistory(query)) 
}

export const removeSeachOne=function({commit},query) {
  commit(types.SET_SEACH_HISTORY,removeSeach(query))
}

export const clearSeach=function({commit}) {
  commit(types.SET_SEACH_HISTORY,clearAll())
}

export const deletetSong=function({commit,state},song) {
  let songList=state.songList.slice()
  let sequenceList=state.sequenceList.slice()
  let currentIndex=state.currentIndex
  let fpIndex=findIndex(songList,song)
  songList.splice(fpIndex,1)
  if(fpIndex<currentIndex || currentIndex === songList.length) {
    currentIndex--
  }
  let fsIndex=findIndex(sequenceList,song)
  sequenceList.splice(fsIndex,1)
  commit(types.SET_SONGLIST,songList)
  commit(types.SET_SEQUENCELIST,sequenceList)
  commit(types.SET_CURRENTINDEX,currentIndex)
  let playmode=songList.length>0
  commit(types.SET_PLAYING,playmode)
}

export const deleteList=function({commit}) {
  commit(types.SET_SONGLIST,[])
  commit(types.SET_SEQUENCELIST,[])
  commit(types.SET_CURRENTINDEX,-1)
  commit(types.SET_PLAYING,false)
}

export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

export const favourite = function ({commit}, song) {
  commit(types.SET_FAVOURITE, addFavourite(song))
}

export const nofavourite = function ({commit}, song) {
  commit(types.SET_FAVOURITE, deleteFavourite(song))
}