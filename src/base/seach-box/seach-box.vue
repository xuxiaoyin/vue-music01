<template>
  <div class="seach-box">
    <div class="box">
      <span class="icon-search"></span>
      <input type="text" class="inp" :placeholder="placeholder" v-model="query">
      <span class="icon-dismiss" v-show="query" @click="clear"></span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    clear() {
      this.query=''
    },
    setquery(query) {
      this.query=query
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
  .seach-box
    padding: 20px 18px
    .box
      display: flex
      align-items: center
      width: 100%
      height: 42px
      padding: 9px
      box-sizing: border-box
      background: $color-highlight-background
      border-radius: 4px
      .icon-search
        flex: 0 0 22px
        width: 22px
        font-size: $font-size-large
        color: #000
      .inp
        flex: 1
        height: 20px
        padding: 0 5px
        background: none
        font-size: $font-size-medium
        color: $color-text-ll
      .icon-dismiss
        flex: 0 0 24px
        width: 24px
        text-align: center
        font-size: $font-size-medium-x
        color: #000
</style>
