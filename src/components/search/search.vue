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
            <li class="item" 
              v-for="(item,index) in hotkey" 
              :key="index" v-html="item.k" 
              @click="addQuery(item.k)"
            >
            </li>
          </ul>
        </div>
        <div class="seach-history" v-show="seachHistory.length">
          <h1 class="title">
            <span class="text">搜索历史</span>
            <span class="icon-clear"></span>
          </h1>
          <div class="history">
            <history-list 
              :seaches="seachHistory" 
              @selectOne="addQuery"
              @deleteOne="deleteOne"
            >
            </history-list>
          </div>
        </div>
      </div>
      <div class="suggest-wrap" v-show="query">
        <suggest :query="query" @select="saveHistory"></suggest>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import Suggest from 'components/suggest/suggest'
import HistoryList from 'base/history-list/history-list'
import {getHotKey} from 'api/seach'
import {ERR_OK} from 'api/config'
import {mapActions,mapGetters} from 'vuex'
export default {
  data() {
    return {
      hotkey: [],
      query: ''
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    ...mapGetters([
      'seachHistory'
    ])
  },
  methods: {
    addQuery(query) {
      this.$refs.seachBox.setquery(query)
    },
    onqueryChenge(query) {
      this.query=query
    },
    saveHistory() {
      this.saveSeachHistory(this.query)
    },
    deleteOne(item) {
      console.log(item)
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if(res.code===ERR_OK) {
          this.hotkey=res.data.hotkey.splice(0,10)
        }
      })
    },
    ...mapActions([
      'saveSeachHistory'
    ])
  },
  components: {
    SeachBox,
    Suggest,
    HistoryList
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
          padding: 6px 10px
          font-size: $font-size-medium
          background: $color-highlight-background
          margin: 5px 10px 5px 0
          border-radius: 4px
          color: $color-text-d
    .seach-history
      margin-top: 10px
      color: $color-text-l
      .title
        height: 42px
        line-height: 42px
        font-size: $font-size-medium
        .icon-clear
          float: right
          line-height: 42px
          font-size: $font-size-small
</style>

