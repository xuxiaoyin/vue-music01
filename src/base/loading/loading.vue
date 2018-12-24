<template>
  <div class="loading">
    <img src="./loading.gif" alt="">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.loading
  text-align: center
  img 
    width: 24px
    height: 24px
  p
    font-size:$font-size-small
    line-height: 20px
    color: $color-text-l
</style>
