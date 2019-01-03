<template>
  <div class="palyer" v-show="songList.length>0">
    <transition name="normal">
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
            <div class="cd-wrap">
              <div class="cd">
                <img :src="currentSong.image" class="image">
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="control">
            <div class="icon icon-left">
              <i class="icon-random"></i>
            </div>
            <div class="icon icon-left">
              <i class="icon-prev"></i>
            </div>
            <div class="icon icon-center">
              <i class="icon-pause"></i>
            </div>
            <div class="icon icon-right">
              <i class="icon-next"></i>
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
            <img :src="currentSong.image" width="40" height="40">
          </div>
          <div class="text">
            <h1 class="name" v-html="currentSong.name"></h1>
            <h2 class="singer" v-html="currentSong.singer"></h2>
          </div>
        </div>
        <div class="right">
          <div class="play">
            <i class="icon-pause"></i>
          </div>
          <div class="select">
            <i class="icon-playlist"></i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'songList',
      'currentSong'
    ])
  },
  methods: {
    back(){
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    ...mapMutations({
      setFullScreen:'SET_FULLSCREEN'
    })
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
        font-size: $font-size-large
      .singer
        line-height: 20px
        font-size: $font-size-medium-x
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
      .control
        display: flex
        align-items: center
        .icon
          flex: 1
          color: $color-theme
          font-size: 30px
        .icon-center
          font-size: 45px
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
      .text
        overflow: hidden
        white-space: nowrap
        .name
          line-height: 22px
          font-size: 15px 
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
</style>
