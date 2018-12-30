<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="icon-1"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle" ref="bgImage">
      <div class="filter"></div>
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
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
const TOPHEIGTH=40
export default {
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
    scroll(pos) {
      this.scrollY=pos.y
    },
    back() {
      this.$router.back()
    }
  },
  computed: {
    bgstyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    SongList,
    Scroll
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
      }else{
        zIndex=0
        this.$refs.bgImage.style.height=0
        this.$refs.bgImage.style.paddingTop='70%'
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
    padding: 10px 20px
    .icon-1
      font-size: $font-size-large-x
      color: $color-theme 
  .title 
    position: absolute
    z-index: 20
    width: 100%
    line-height: 40px
    text-align: center
    color: $color-text
    font-size: $font-size-large
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
</style>
