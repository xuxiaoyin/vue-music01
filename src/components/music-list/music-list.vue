<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgImage">
      <div class="filter"></div>
      <div class="play-wrap" v-show="songs.length>0" ref="paly">
        <div class="play" @click="radomPlay">
          <i class="icon-play icon"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <div class="top-layre" ref="toplayer"></div>
    <scroll 
      :data="songs" 
      class="list" 
      ref="list" 
      :probe-type="probeType" 
      :listen-scroll="listenScroll"
      @scroll="scroll">
      <div class="song-list-wrap">
        <song-list :songs="songs" @select="selectItem"></song-list>
      </div>
      <div class="load-warp" v-show=!songs.length>
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {mapActions} from 'vuex'
import {playListMixin} from 'common/js/mixin'
const TOPHEIGTH=40
export default {
  mixins:[playListMixin],
  props: {
    bgImage: {
      type: String,
      default: ''
    },
    songs: {
      typr: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    }
  },
  mounted() {
    this.bgImageHeight=this.$refs.bgImage.clientHeight
    this.minTranslateY=-this.bgImageHeight+TOPHEIGTH
    this.$refs.list.$el.style.top=`${this.bgImageHeight}px`
  },
  created() {
    this.probeType=3
    this.listenScroll=true
  },
  data() {
    return {
      scrollY: 0
    }
  },
  methods: {
    handlePlayList(SongList) {
      const bottom = SongList.length > 0 ? '60px' : ''
      this.$refs.list.$el.style.bottom=bottom
      this.$refs.list.refresh()
    },
    scroll(pos) {
      this.scrollY=pos.y
    },
    back() {
      this.$router.back()
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    radomPlay() {
      this.redomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      'selectPlay',
      'redomPlay'
    ])
  },
  computed: {
    bgstyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    SongList,
    Scroll,
    Loading
  },
  watch: {
    scrollY(newy) {
      let translateY=Math.max(this.minTranslateY,newy)
      let zIndex=0
      let scale=1
      this.$refs.toplayer.style['transform']=`translate3d(0,${translateY}px,0)`
      this.$refs.toplayer.style['webkitTransform']=`translate3d(0,${translateY}px,0)`
      const percent=Math.abs(newy/this.bgImageHeight)
      if(newy>0){
        scale=1+percent
        zIndex=10
      }
      if(newy<this.minTranslateY){
        zIndex=10
        this.$refs.bgImage.style.height=`${TOPHEIGTH}px`
        this.$refs.bgImage.style.paddingTop=0
        this.$refs.paly.style.display='none'
      }else{
        zIndex=0
        this.$refs.bgImage.style.height=0
        this.$refs.bgImage.style.paddingTop='70%'
        this.$refs.paly.style.display=''
      }
      this.$refs.bgImage.style.zIndex=zIndex
      this.$refs.bgImage.style['transform']=`scale(${scale})`
      this.$refs.bgImage.style['webkitTransform']=`scale(${scale})`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.music-list
  position: fixed
  z-index: 999
  top: 0
  left: 0
  bottom: 0
  right: 0
  background: $color-background 
  .back 
    position: absolute
    z-index: 30 
    top: 0
    left: 0
    padding: 10px 12px
    .icon-back
      font-size: $font-size-large-x
      color: $color-theme 
  .title 
    position: absolute
    z-index: 20
    width: 100%
    line-height: 40px
    text-align: center
    color: $color-text
    font-size: $font-size-medium-x
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 70%
    transform-origin: top
    background-size: cover
    .filter
      position: absolute 
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: $color-background-d
    .play-wrap
      position: absolute
      bottom: 20px
      left: 50%
      transform: translateX(-50%)
      .play
        width: 137px
        height: 35px
        line-height: 35px
        text-align: center
        box-sizing: border-box
        border-radius: 17px
        border: 1px solid $color-theme
        font-size: 0
        .icon
          display: inline-block
          font-size: 18px
          color: $color-theme
          margin-top: 8px
          vertical-align: top
        .text
          display: inline-block
          font-size: 13px
          color: $color-theme
          margin-left: 4px
          vertical-align: top
  .list
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
  .top-layre
    position: relative
    width: 100%
    height: 100%
    background: $color-background
  .load-warp
    position: absolute 
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
