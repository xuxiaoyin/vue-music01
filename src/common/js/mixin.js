import {mapGetters} from 'vuex'

//playListMixin 迷你播放器出现的时候重置botttom值和scroll的refresh
export const playListMixin={
 computed: {
   ...mapGetters([
     'songList'
    ])
 },
  mounted() {
    this.handlePlayList(this.songList)
  },
  activated() {
    this.handlePlayList(this.songList)
  },
  watch: {
    songList(newval) {
      this.handlePlayList(newval)
    }
  },
  meshods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList function')
    }
  }
}