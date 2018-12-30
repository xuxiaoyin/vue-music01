<template>
  <transition name="fade">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { singerDetail } from 'api/singerList'
import {createSongs, processSongsUrl} from 'common/js/song'
import MusicList from 'components/music-list/music-list'

const ERR_OK=0
export default {
  created() {
    this._singerDetail()
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    }
  },
  methods: {
    _singerDetail(){
      if(!this.singer.id){
        this.$router.push('/singer')
        return
      }
      singerDetail(this.singer.id).then((res)=>{
        if(res.code===ERR_OK){
          processSongsUrl(this._normalizeSongs(res.data.list)).then((songs)=> {
            this.songs=songs
          })
        }
      })
    },
    _normalizeSongs(list){
      let ret=[]
      list.forEach((item)=> {
        let {musicData}=item
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

