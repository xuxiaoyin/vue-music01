import * as types from './mutation-types'

const mutations= {
  [types.SET_SINGER](state,singer) {
    state.singer=singer
  },
  [types.SET_PALYING](state, flag) {
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
  }
}


export default mutations