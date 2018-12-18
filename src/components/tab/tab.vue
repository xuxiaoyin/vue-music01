<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/recommend">
      <span class="item">推荐</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/singer">
      <span class="item">歌手</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/rank">
      <span class="item">排行</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/search">
      <span class="item">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.tab
  height: 44px
  line-heigth: 44px
  display: flex
  font-size: $font-size-medium
  .tab-item
    flex: 1
    text-align: center
    .item
      padding: 0 2px 5px
      color: $color-text-l
    &.router-link-active
      .item
        color: $color-theme
        border-bottom: 2px solid $color-theme
</style>

