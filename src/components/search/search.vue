<template>
  <div class="seach">
    <div>
      <div class="seach-box-wrap">
        <seach-box ref="seachBox" @query='onqueryChenge'></seach-box>
      </div>
      <div class="hot-wrap" v-show="!query">
        <div class="hot">
          <h1 class="title">热门搜索</h1>
          <ul class="hot-list">
            <li class="item" v-for="(item,index) in hotkey" :key="index" v-html="item.k" @click="addQuery(item.k)"></li>
          </ul>
        </div>
      </div>
      <div class="suggest-wrap" v-show="query">
        <suggest :query="query"></suggest>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import Suggest from 'components/suggest/suggest'
import {getHotKey} from 'api/seach'
import {ERR_OK} from 'api/config'
export default {
  data() {
    return {
      hotkey:[],
      query: ''
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    addQuery(query) {
      this.$refs.seachBox.setquery(query)
    },
    onqueryChenge(query) {
      this.query=query
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
    SeachBox,
    Suggest
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.seach
  position: fixed
  top: 88px
  left: 0
  right: 0
  bottom: 0
  overflow: hidden
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
          border-radius: 4px
          color: $color-text-d 
</style>

