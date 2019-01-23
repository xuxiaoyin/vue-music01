<template>
  <div class="seach">
    <div>
      <div class="seach-box-wrap">
        <seach-box ref="seachBox" @query='onqueryChenge'></seach-box>
      </div>
      <div class="hot-wrap" v-show="!query" ref="shortcutWrap">
        <scroll ref="shortcut" :data="newval" class="shortcut">
          <div>
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
                <span class="icon-clear" @click="showConfirm"></span>
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
        </scroll>
      </div>
      <div class="suggest-wrap" v-show="query">
        <suggest :query="query" @select="saveHistory" ref="suggest"></suggest>
      </div>
    </div>
    <router-view></router-view>
    <confirm
      ref="confirm" 
      @confirm="clearSeach"
      text="确定要清除吗？"
      confirmBtn="清除"
    >
    </confirm>
  </div>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import Suggest from 'components/suggest/suggest'
import HistoryList from 'base/history-list/history-list'
import {getHotKey} from 'api/seach'
import {ERR_OK} from 'api/config'
import {mapActions,mapGetters} from 'vuex'
import Scroll from 'base/scroll/scroll'
import { playListMixin, searchMixin } from 'common/js/mixin'
import Confirm from 'base/confirm/confirm'

export default {
  mixins: [playListMixin, searchMixin],
  data() {
    return {
      hotkey: []
    }
  },
  created() {
    this._getHotKey()
  },
  computed: {
    newval() {
      return this.hotkey.concat(this.seachHistory)
    }
  },
  methods: {
    handlePlayList(songList) {
      const bottom=songList.length>0? '60px': ''
      this.$refs.shortcutWrap.style.bottom=bottom
      this.$refs.shortcut.refresh()

      this.$refs.suggest.$el.style.bottom=bottom
      this.$refs.suggest.refresh()
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if(res.code===ERR_OK) {
          this.hotkey=res.data.hotkey.splice(0,10)
        }
      })
    },
    ...mapActions([
      'clearSeach'
    ])
  },
  components: {
    SeachBox,
    Suggest,
    HistoryList,
    Scroll,
    Confirm
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
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
    position: absolute 
    width: 100%
    top: 62px
    bottom: 0
    box-sizing: border-box
    padding: 0 18px
    .shortcut
      height: 100%
      overflow: hidden
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
  .suggest-wrap
    position: absolute
    width: 100%
    height: 100%
</style>

