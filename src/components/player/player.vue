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
        <div class="middle"
          @touchstart.prevent="middleTouchstart"
          @touchmove.prevent="middleTouchmove"
          @touchend="middleTouchend"
          ref="middle"
        >
          <div class="middle-l" ref="middleL">
            <div class="cd-wrap" ref="cdWrap">
              <div class="cd" :class="runCls">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
            <div class="playing-lyric-wrap">
              <div class="play-lyric">{{palyingLyric}}</div>
            </div>
          </div>
          <scroll class="middle-r" :data="currentLyric && currentLyric.lines" ref="lyric">
            <div class="lyric-wrap">
              <div v-if="currentLyric">
                <p class="text" 
                  v-for="(item,index) in currentLyric.lines" :key="index"
                  :class="{'current':currentLineNum===index}"
                  ref="txt"
                >
                  {{item.txt}}
                </p>
              </div>
            </div>       
          </scroll>
        </div>
        <div class="bottom">
          <div class="nar-bar">
            <span class="nav" :class="{'active':showMiddle==='cd'}"></span>
            <span class="nav" :class="{'active':showMiddle==='lyric'}"></span>
          </div>
          <div class="procss-wrap">
            <div class="start">{{format(currentTime)}}</div>
            <div class="procss">
              <pross-bar :precent="precent" @changePercent="newPercent"></pross-bar>
            </div>
            <div class="end">{{format(currentSong.duration)}}</div>
          </div>
          <div class="control">
            <div class="icon icon-left" @click="changeMode">
              <i :class="modeCls"></i>
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
            <pross-circle :radius="radius" :precent="precent">
              <i :class="playCls" class="mini-play"></i>
            </pross-circle>         
          </div>
          <div class="select">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </div>
    </transition>
    <audio 
      :src="currentSong.url" 
      ref="audio" 
      @canplay="ready" 
      @error="error" 
      @timeupdate="updateTime"
      @ended="end"
    >
    </audio>
  </div>
</template>



<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import ProssBar from 'base/pross-bar/pross-bar'
import ProssCircle from 'base/pross-circle/pross-circle'
import {palyMode} from 'common/js/config'
import {getNutil} from 'common/js/nutil'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll/scroll'

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentLyric: null,
      currentLineNum: 0,
      showMiddle: 'cd',
      palyingLyric: ''
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
    modeCls() {
      return this.mode===palyMode.sequence ? 'icon-sequence' : this.mode===palyMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'fullScreen',
      'songList',
      'currentSong',
      'playing',
      'currentIndex',
      'mode',
      'sequenceList'
    ])
  },
  created () {
    this.touch={}
  },
  methods: {
    newPercent(precent) {
      const currentTime=this.currentSong.duration*precent
      this.$refs.audio.currentTime=currentTime
      if(!this.playing) {
        this.toogelPlay()
      }
      if(this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000)
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
      if(this.songList.length===1) {
        this.loop()
      }else {
        let index=this.currentIndex-1
        if(index===-1) {
          index=this.songList.length-1
        }
        this.setCurrentIndex(index)
        this.songReady=false
        if(!this.playing) {
          this.toogelPlay()
        }
      }
    },
    next() {
      if(!this.songReady) {
        return
      }
      if(this.songList.length===1) {
        this.loop()
      }else {
        let index=this.currentIndex+1
        if(index===this.songList.length) {
          index=0
        }
        this.setCurrentIndex(index)
        this.songReady=false
        if(!this.playing) {
          this.toogelPlay()
        }
      }
    },
    toogelPlay() {
      if(!this.songReady) {
        return
      }
      this.setPlaying(!this.playing)
      if(this.currentLyric) {
        this.currentLyric.togglePlay()
      }
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
    changeMode() {
      let mode=(this.mode+1)%3
      this.setMode(mode)
      let list=null
      if(mode===palyMode.random) {
        list=getNutil(this.sequenceList)
      }else{
        list=this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setSonglist(list) 
    },
    resetCurrentIndex(list) {
      let index=list.findIndex((item)=>{
        return item.id===this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    end() {
      if(this.mode===palyMode.loop){
        this.loop()
      }else{
        this.next()
      }     
    },
    loop() {
      this.$refs.audio.currentTime=0
      this.$refs.audio.play()
      if( this.currentLyric ) {
        this.currentLyric.seek(0)
      }
    },
    getLyric() {
      this.currentSong.getLyric().then( (lyric)=> {
        this.currentLyric=new Lyric(lyric,this.handlerLyric)
        if(this.playing) {
          this.currentLyric.play()
        }
      }).catch(()=> {
        this.currentLyric=null
        this.palyingLyric=''
        this.currentLineNum=0
      })
    },
    handlerLyric(lineNum) {
      this.currentLineNum=lineNum.lineNum
      if( lineNum.lineNum>5 ) {
        this.$refs.lyric.scrollToElement(this.$refs.txt[lineNum.lineNum-4],1000)
      }else{
        this.$refs.lyric.scrollTo(0,0,0)
      }
      this.palyingLyric=lineNum.txt
    },
    middleTouchstart(e) {
      this.touch.initial=true
      this.touch.startX=e.touches[0].pageX
      this.touch.startY=e.touches[0].pageY
    },
    middleTouchmove(e) {
      if(!this.touch.initial) {
        return
      }
      const deltaX=e.touches[0].pageX-this.touch.startX
      const deltaY=e.touches[0].pageY-this.touch.startY
      if(Math.abs(deltaX)<Math.abs(deltaY)) {
        return
      }
      const left=this.showMiddle==='cd'? 0 :-window.innerWidth
      const offsetWidth=Math.min(0,Math.max(deltaX+left,-window.innerWidth))
      this.touch.percent=Math.abs(offsetWidth/window.innerWidth)
      this.$refs.lyric.$el.style['transform']=`translateX(${offsetWidth}px)`
      this.$refs.lyric.$el.style['webkitTransform']=`translateX(${offsetWidth}px)`
      this.$refs.lyric.$el.style.transitionDuration=0
      this.$refs.lyric.$el.style.webkitTransitionDuration=0
      this.$refs.middleL.style.opacity=1-this.touch.percent
      this.$refs.middleL.style.transitionDuration=0
      this.$refs.middleL.style.webkitTransitionDuration=0
    },
    middleTouchend() {
      this.touch.initial=false
      let offsetWidth
      if(this.showMiddle==='cd') {
        if(this.touch.percent>0.1) {
          offsetWidth=-window.innerWidth
          this.showMiddle='lyric'
          this.$refs.middleL.style.opacity=0
        }else{
          offsetWidth=0
          this.$refs.middleL.style.opacity=1
        }
      }else {
        if(this.touch.percent < 0.9) {
          offsetWidth=0
          this.showMiddle='cd'
          this.$refs.middleL.style.opacity=1
        }else{
          offsetWidth=-window.innerWidth
          this.$refs.middleL.style.opacity=0
        }
      }
      const time=300
      this.$refs.lyric.$el.style['transform']=`translateX(${offsetWidth}px)`
      this.$refs.lyric.$el.style['webkitTransform']=`translateX(${offsetWidth}px)`
      this.$refs.lyric.$el.style.transitionDuration=`${time}ms`
      this.$refs.lyric.$el.style.webkitTransitionDuration=`${time}ms`
      this.$refs.middleL.style.transitionDuration=`${time}ms`
      this.$refs.middleL.style.webkitTransitionDuration=`${time}ms`
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
      setCurrentIndex:'SET_CURRENTINDEX',
      setMode:'SET_MODE',
      setSonglist:'SET_SONGLIST'
    })
  },
  watch: {
    currentSong(newSong,oldSong) {
      if(newSong.id===oldSong.id){
        return
      }
      if(this.currentLyric) {
        this.currentLyric.stop()
      }
      setTimeout( ()=>{
        this.$refs.audio.play()
        this.getLyric()
      },1000)
    },
    playing(newVal) {
      this.$nextTick( ()=>{
        newVal ? this.$refs.audio.play(): this.$refs.audio.pause()
      })
    }
  },
  components: {
    ProssBar,
    ProssCircle,
    Scroll
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
        width: 75%
        height: 40px
        line-height: 40px
        font-size: $font-size-medium-x     
        margin: 0 auto
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
      .singer
        width: 80%
        margin: 0 auto
        line-height: 20px
        height: 20px
        font-size: $font-size-medium
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
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
        .playing-lyric-wrap
          position: absolute 
          width: 80%
          left: 10%
          bottom: -33px
          height: 15px
          overflow: hidden
          .play-lyric
            width: 100%
            height: 100%
            text-align: center
            font-size: $font-size-medium
            color: $color-text-l
      .middle-r
        position: relative
        display: inline-block
        width: 100%
        height: 100%
        overflow: hidden
        .lyric-wrap
          width: 80%
          margin: auto
          top: 0
          left: 0
          text-align: center
          .text
            line-height: 32px
            font-size: $font-size-medium
            color: $color-text-d
            &.current
              color: $color-text
    .bottom
      position: absolute 
      width: 100%
      bottom: 10px
      .nar-bar
        width: 100%
        height: 10px
        text-align:center
        margin: 15px 0
        font-size: 0
        .nav
          display: inline-block
          width: 10px
          height: 10px
          margin: 0 5px
          border-radius: 5px
          background: $color-text-d
          &.active
            padding: 0 5px
            background: $color-text
      .procss-wrap
        position: relative
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
    width: 100%
    bottom: 0
    left: 0
    right: 0
    height: 62px
    background: $color-highlight-background
    .left
      float: left
      width: 62%
      padding-left: 20px
      display: flex
      align-items: center
      padding-top: 11px
      box-sizing: border-box
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
        text-overflow: ellipsis
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
      width: 38%
      overflow: hidden
      display: flex
      align-items: center
      .play,.select
        padding: 0 10px
        font-size: 32px
        color: $color-theme-d
        margin-top: 15px
        .mini-play
          position: absolute
          top: 0
          left: 0
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
