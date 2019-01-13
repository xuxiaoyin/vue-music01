<template>
  <transition name="fade">
    <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {getTopList} from 'api/rank'
import {mapGetters} from 'vuex'
import {ERR_OK} from 'api/config'
import {createSongs,processSongsUrl} from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.topList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }else {
        return ''
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() {
      if(!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getTopList(this.topList.id).then((res)=> {
        if(res.code===ERR_OK) {
          processSongsUrl(this._normalizeSongs(res.songlist)).then((songs)=> {
            this.songs=songs
          })
          console.log(res.songlist)
        }   
      })
    },
    _normalizeSongs(list) {
      let ret=[]
      list.forEach((item) => {
        let musicData=item.data
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