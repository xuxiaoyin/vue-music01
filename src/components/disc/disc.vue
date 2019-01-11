<template>
  <transition name="fade">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
import { mapGetters } from 'vuex'
import {createSongs,processSongsUrl} from 'common/js/song'

const ERR_OK=0
export default {
  computed : {
    title() {
      return this.disc.dissname
    },
    bgImage() {
      return this.disc.imgurl
    },
    ...mapGetters([
      'disc'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getSongList()
  },
  methods: {
    _getSongList() {
      if(!this.disc.dissid) {
        this.$router.push('/recommend')
        return
      }
      getSongList(this.disc.dissid).then(res=>{
        if(res.code===ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then((songs)=> {
            this.songs=songs
          })
        }
      })
    },
    _normalizeSongs(list){
      let ret=[]
      list.forEach((musicData)=> {
        if(musicData.songid && musicData.albummid){
          ret.push(createSongs(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .fade-enter-active,.fade-leave-active
    transition: all 0.3s
  .fade-enter,.fade-leave-to
    transform: translate3d(100%,0,0)
  
  
</style>

