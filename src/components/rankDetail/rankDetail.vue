<template>
  <transition name="fade">
    <music-list></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
export default {
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