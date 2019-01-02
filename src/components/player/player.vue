<template>
  <div class="palyer" v-show="songList.length>0">
    <div class="normal-palyer" v-show="fullScreen">
      <div class="bg-img">
        <img width="100%" height="100%" :src="currentSong.image">
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-1"></i>
        </div>
        <h1 class="name" v-html="currentSong.name"></h1>
        <h2 class="singer" v-html="currentSong.singer"></h2>
      </div>
      <div class="middle">
        <div class="middle-l">
          <div class="cd-wrap">
            <div class="cd">
              <img :src="currentSong.image">
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="control">
          <i class="icon-11"></i>
          <i class="icon-5"></i>
          <i class="icon-11"></i>
          <i class="icon-6"></i>
          <i class="icon-11"></i>
        </div>
      </div>
    </div>
    <div class="min-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'songList',
      'currentSong'
    ])
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
  .min-player
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: 62px
    background: $color-highlight-background
</style>
