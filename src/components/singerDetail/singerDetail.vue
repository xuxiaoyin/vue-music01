<template>
  <transition name="fade">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
export default {
  
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

