<template>
  <div class="seach">
    <div class="seach-box-wrap">
      <seach-box ref="seachBox"></seach-box>
    </div>
    <div class="hot-wrap">
      <div class="hot">
        <h1 class="title">热门搜索</h1>
        <ul class="hot-list">
          <li class="item" v-for="(item,index) in hotkey" :key="index" v-html="item.k" @click="addQuery(item.k)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import {getHotKey} from 'api/seach'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      hotkey:[]
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    addQuery(query) {
      this.$refs.seachBox.setquery(query)
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if(res.code===ERR_OK) {
          this.hotkey=res.data.hotkey.splice(0,10)
        }
      })
    }
  },
  components: {
    SeachBox
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.hot-wrap
  padding: 0 18px
  .hot
    .title
      line-height: 38px
      font-size: $font-size-medium
      color: $color-text-l
    .hot-list
      font-size: 0
      .item
        display: inline-block
        padding: 10px
        font-size: $font-size-medium
        background: $color-highlight-background
        margin: 5px 20px 5px 0
        border-radius: 2px
        color: $color-text-d 
</style>

