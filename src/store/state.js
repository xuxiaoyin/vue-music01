import {palyMode} from 'common/js/config'
import {loadSearch} from 'common/js/catch'

const state={
  singer:{},
  playing: false,
  fullScreen: false,
  mode: palyMode.sequence,
  songList: [],
  sequenceList: [],
  currentIndex: -1,
  disc:{},
  topList:[],
  seachHistory: loadSearch()
}

export default state