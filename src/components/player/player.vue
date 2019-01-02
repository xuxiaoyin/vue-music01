<template>
  <div class="palyer" v-show="songList.length>0">
    <div class="normal-palyer" v-show="fullScreen">播放器</div>
    <div class="min-player" v-show="!fullScreen"></div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'fullScreen',
      'songList'
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
  .min-player
    position: fixed
    bottom: 0
    left: 0
    right: 0
    height: 62px
    background: $color-highlight-background
</style>
