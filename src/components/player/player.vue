<template>
  <div class="palyer" v-show="songList.length>0">
    <transition name="normal"
      @enter="enter"
      @after-enter="afterEnter"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div class="normal-palyer" v-show="fullScreen">
        <div class="bg-img">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1 class="name" v-html="currentSong.name"></h1>
          <h2 class="singer" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrap" ref="cdWrap">
              <div class="cd" :class="runCls">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="procss-wrap">
            <div class="start">{{format(currentTime)}}</div>
            <div class="procss">
              <pross-bar :precent="precent" @changePercent="newPercent"></pross-bar>
            </div>
            <div class="end">{{format(currentSong.duration)}}</div>
          </div>
          <div class="control">
            <div class="icon icon-left">
              <i class="icon-random"></i>
            </div>
            <div class="icon icon-left" :class="disableCls">
              <i class="icon-prev" @click="prev"></i>
            </div>
            <div class="icon icon-center" @click="toogelPlay" :class="disableCls">
              <i :class="playCls"></i>
            </div>
            <div class="icon icon-right" :class="disableCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon icon-right">
              <i class="icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="min-player" v-show="!fullScreen" @click="open">
        <div class="left">
          <div class="pic">
            <img :src="currentSong.image" width="40" height="40" :class="runCls">
          </div>
          <div class="text">
            <h1 class="name" v-html="currentSong.name"></h1>
            <h2 class="singer" v-html="currentSong.singer"></h2>
          </div>
        </div>
        <div class="right">
          <div class="play" @click.stop="toogelPlay">
            <i :class="playCls"></i>
          </div>
          <div class="select">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>



<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import ProssBar from 'base/pross-bar/pross-bar'

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0
    }
  },
  computed: {
    playCls() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    runCls() {
      return this.playing ? 'play' : 'play pause'
    },
    disableCls() {
      return this.songReady ? '':'disable'
    },
    precent() {
      return this.currentTime/this.currentSong.duration
    },
    ...mapGetters([
      'fullScreen',
      'songList',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  methods: {
    newPercent(precent) {
      this.$refs.audio.currentTime=this.currentSong.duration*precent
      if(!this.playing) {
        this.toogelPlay()
      }
    },
    updateTime(e) {
      this.currentTime=e.target.currentTime
    },
    format(val) {
      val=val | 0
      const minit=val/60 | 0
      const second=this._pad(val % 60)
      return `${minit}:${second}`
    },
    error() {
      this.songReady=true //保证网络请求错误之后能正常操作
    },
    ready() {
      this.songReady=true
    },
    prev() {
      if(!this.songReady) {
        return
      }
      let index=this.currentIndex-1
      if(index===-1) {
        index=this.songList.length-1
      }
      this.setCurrentIndex(index)
      this.songReady=false
      if(!this.playing) {
        this.toogelPlay()
      }
    },
    next() {
      if(!this.songReady) {
        return
      }
      let index=this.currentIndex+1
      if(index===this.songList.length) {
        index=0
      }
      this.setCurrentIndex(index)
      this.songReady=false
      if(!this.playing) {
        this.toogelPlay()
      }
    },
    toogelPlay() {
      this.setPlaying(!this.playing)
    },
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    enter(el,done) {
      const {x,y,scale}=this._getPosAndScale()
      let animation={
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 400,
           easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrap,'move',done)
    },
    afterEnter() {
      animations.unregisterAnimation('move')
      this.$refs.cdWrap.style.animation=''
    },
    leave(el,done) {
      this.$refs.cdWrap.style.transition='all 0.4s'
      const {x,y,scale}=this._getPosAndScale()
      this.$refs.cdWrap.style['transform']=`translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrap.style['webkitTransform']=`translate3d(${x}px,${y}px,0) scale(${scale})`
      const timer = setTimeout(done, 400)
      this.$refs.cdWrap.addEventListener('transitioned',()=>{
        clearTimeout(timer)
        done()
      })
    },
    afterLeave() {
      this.$refs.cdWrap.style.transition=''
      this.$refs.cdWrap.style['transform']=''
      this.$refs.cdWrap.style['webkitTransform']=''
    },
    _getPosAndScale() {
      const paddingLeft=20
      const paddingBottom=11
      const targetWidth=40
      const width=window.innerWidth*0.8
      const paddingTop=80
      const scale=targetWidth/width
      const x=-(window.innerWidth/2-paddingLeft-targetWidth/2)
      const y=window.innerHeight-paddingTop-width/2-paddingBottom-targetWidth/2
      return {
        x,
        y,
        scale
      }
    },
    _pad(num,n = 2) {
      let len=num.toString().length
      while(len<n) {
        num='0'+num
        len++
      }
      return num
    },
    ...mapMutations({
      setFullScreen:'SET_FULLSCREEN',
      setPlaying:'SET_PLAYING',
      setCurrentIndex:'SET_CURRENTINDEX'
    })
  },
  watch: {
    currentSong() {
      this.$nextTick( ()=>{
        this.$refs.audio.play()
      })
    },
    playing(newVal) {
      this.$nextTick( ()=>{
        newVal ? this.$refs.audio.play(): this.$refs.audio.pause()
      })
    }
  },
  components: {
    ProssBar
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.palyer
  .normal-palyer
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .bg-img
      position: absolute
      top: 0
      bottom: 0
      width: 100%
      filter: blur(20px)
      z-index: -1
      opacity: 0.6
    .top
      position: relative
      text-align: center
      margin-bottom: 22px
      .back
        position: absolute
        top: 0
        left: 0 
        padding: 10px 12px
        transform: rotate(-90deg)
        .icon-back
          font-size: $font-size-large-x
          color: $color-theme
      .name
        line-height: 40px
        font-size: $font-size-medium-x
      .singer
        line-height: 20px
        font-size: $font-size-medium
    .middle
      position: fixed
      top: 80px
      bottom: 170px
      width: 100%
      font-size: 0
      white-space: nowrap
      .middle-l
        display: inline-block
        vertical-align: top
        position: relative
        width: 100%
        height: 0
        padding-top: 80%
        .cd-wrap
          position: absolute 
          left: 10%
          top: 0
          width: 80%
          box-sizing: border-box
          height: 100%
          .cd
            width: 100%
            height: 100%
            border-radius: 50%
            &.play
              animation: rotate 20s linear infinite 
            &.pause
              animation-play-state: paused
            .image
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              box-sizing: border-box
              border-radius: 50%
              border: 10px solid rgba(255, 255, 255, 0.1)
    .bottom
      position: absolute 
      width: 100%
      bottom: 50px
      .procss-wrap
        display: flex
        height: 22px
        margin-bottom: 14px
        align-items: center
        font-size: $font-size-medium
        .start
          flex: 1
          text-align: right
        .procss
          flex: 3
          position: relative
          padding: 0 8px
          height: 20px
        .end
          flex: 1
          text-align: left
      .control
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          font-size: 28px
          &.disable
            color: $color-text-l
        .icon-center
          font-size: 40px
          text-align: center
          padding: 0 20px
        .icon-left
          text-align: right
        .icon-right
          text-align: left
    &.normal-enter-active,&.normal-leave-active
      transition: all 0.4s
      .top,.bottom
        transition: all 0.4s cubic-bezier(.86,.18,.82,1.29)
    &.normal-enter,&.normal-leave-to
      opacity: 0
      .top
        transform: translate3d(0,-100px,0)
      .bottom
        transform: translate3d(0,100px,0)
  .min-player
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: 62px
    background: $color-highlight-background
    .left
      float: left
      padding-left: 20px
      display: flex
      align-items: center
      padding-top: 11px
      .pic
        width: 40px
        height: 40px
        margin-right: 9px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite 
          &.pause
            animation-play-state: paused
      .text
        overflow: hidden
        white-space: nowrap
        .name
          line-height: 22px
          font-size: 14px 
        .singer
          font-size: $font-size-small
          line-height: 12px
          margin-top: 5px
          color: $color-text-l        
    .right
      float: right
      display: flex
      .play,.select
        padding: 0 10px
        font-size: 30px
        color: $color-theme
        line-height: 62px
    &.mini-enter-active,&.mini-leave-active
      transition: all 0.4s
    &.mini-enter,&.mini-leave-to
      opacity: 0
 @keyframes rotate 
   0%
     transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>
