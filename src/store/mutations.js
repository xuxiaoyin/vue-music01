import * as types from './mutation-types'

const mutations= {
  [types.SET_SINGER](state,singer) {
    state.singer=singer
  },
  [types.SET_PLAYING](state, flag) {
    state.playing=flag
  },
  [types.SET_FULLSCREEN](state, flag) {
    state.fullScreen=flag
  },
  [types.SET_MODE](state, mode) {
    state.mode=mode
  },
  [types.SET_SONGLIST](state, list) {
    state.songList=list
  },
  [types.SET_SEQUENCELIST](state, list){
    state.sequenceList=list
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.currentIndex=index
  },
  [types.SET_DISC](state,disc) {
    state.disc=disc
  },
  [types.SET_TOPLIST](state,topList) {
    state.topList=topList
  },
  [types.SET_SEACH_HISTORY](state,history) {
    state.seachHistory = history
  },
  [types.SET_PLAY_HISTORY](state, playHistory) {
    state.playHistory = playHistory
  }
}


export default mutations