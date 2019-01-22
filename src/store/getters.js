import Song from 'common/js/song'

export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const mode = state => state.mode

export const songList = state => state.songList

export const sequenceList = state => state.sequenceList

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.songList[state.currentIndex]||{}
}

export const disc = state => state.disc

export const topList = state => state.topList

export const seachHistory = state => state.seachHistory

export const playHistory = (state) => {
  return state.playHistory.map((song) => {
    return new Song(song)
  })
}


