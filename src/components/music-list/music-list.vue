<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-1"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-image" :style="bgstyle">
      <div class="filter"></div>
    </div>
  </div>
</template>

<script>
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
  computed: {
    bgstyle() {
      return `background-image:url(${this.bgImage})`
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
    z-index: 2 
    top: 0
    left: 0
    padding: 10px 20px
    .icon-1
      font-size: $font-size-large-x
      color: $color-theme 
  .title 
    position: absolute
    z-index: 2
    width: 100%
    line-height: 40px
    text-align: center
    color: $color-text
    font-size: $font-size-large
  .bg-image
    position: relative
    width: 100%
    height: 0
    padding-top: 60%
    .filter
      position: absolute 
      top: 0
      left: 0
      width: 100%
      height: 100%
      background: $color-background-d
</style>
