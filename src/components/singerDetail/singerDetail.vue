<template>
  <transition name="fade">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { singerDetail } from 'api/singerList'
import {createSongs, processSongsUrl} from 'common/js/song'

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
    ])
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
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'

  .fade-enter-active,.fade-leave-active
    transition: all 0.3s
  .fade-enter,.fade-leave-to
    transform: translate3d(100%,0,0)
  .singer-detail
    position: fixed 
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background
  
</style>

