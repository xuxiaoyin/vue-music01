<template>
  <div class="m-heaader">
    <span class="logo"></span>
    <span class="text">Chicken Music</span>
    <router-link tag="span" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.m-heaader
  position: relative
  height: 44px
  line-height: 44px
  width: 100
  text-align: center
  color: $color-theme
  font-size: 0
  .logo
    display: inline-block
    vertical-align: top
    width: 30px
    height: 32px
    bg-image(logo)
    background-size: 30px 32px
    margin-right: 6px
    margin-top: 6px
  .text
    display: inline-block
    vertical-align: top
    font-size: $font-size-large-x
  .mine
    position: absolute
    top: 0
    right: 0
    height: 44px
    line-height: 44px
    width: 40px
    text-align: center
    .icon-mine
      line-height: 44px
      font-size: 24px
      color: $color-theme

</style>
