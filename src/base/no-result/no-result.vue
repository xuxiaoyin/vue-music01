<template>
  <div class="no-result">
    <div class="pic"></div>
    <p class="text">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'
.no-result
  text-align: center
  .pic
    width: 86px
    height: 90px
    margin: 0 auto
    bg-image('no-result')
    background-size: 86px 90px
    background-repeat: no-repeat
  .text
    font-size: $font-size-medium
    color: $color-text-l
    line-height: 2
</style>

