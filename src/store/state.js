import {palyMode} from 'common/js/config'

const state={
  singer:{},
  playing: false,
  fullScreen: false,
  mode: palyMode.sequence,
  songList: [],
  sequenceList: [],
  currentIndex: -1
}

export default state