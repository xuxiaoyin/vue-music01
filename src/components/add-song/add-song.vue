<template>
  <transition name=fadeIn>
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="add-wrap">
        <div class="title">
          <span class="text">添加歌曲到列表</span>
          <span class="close icon-close" @click="hide"></span>
        </div>
        <div class="search-box-wrap">
         <seach-box ref="seachBox" @query='onqueryChenge' placeholder="搜索歌曲"></seach-box>
        </div>
        <div class="no-query" v-show="!query">
          <div class="switch-wrap">
            <switches 
              :switches="switches" 
              @switch="switchIndex"
              :currentIndex="currentIndex"
            >
            </switches>
          </div>
          <div class="list-wrap">
            <scroll class="lately" :data="playHistory" ref="lately" v-show="currentIndex===0" :delayrefresh="delayrefresh">
              <song-list :songs="playHistory" ref="songList" @select="selectItems"></song-list>
            </scroll>
            <scroll class="search-history" :data="seachHistory" ref="searchHistory" v-show="currentIndex===1" :delayrefresh="delayrefresh">
              <div class="inner">
                <history-list 
                  :seaches="seachHistory" 
                  @selectOne="addQuery"
                  @deleteOne="deleteOne"
                ></history-list>
              </div> 
            </scroll>
          </div>
        </div>
        <div class="suggest-wrap" v-show="query">
          <suggest :query="query" @select="selectSuggest" ref="suggest"></suggest>
        </div>
        <top-tip ref="toptip" class="toptip">
          <i class="icon-ok"></i>
          <span class="text">1首歌已添加到播放列表</span>
        </top-tip>
      </div>
    </div>
  </transition>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import Switches from 'base/switches/switches'
import SongList from 'base/song-list/song-list'
import Scroll from 'base/scroll/scroll'
import HistoryList from 'base/history-list/history-list'
import Suggest from 'components/suggest/suggest'
import TopTip from 'base/top-tip/top-tip'
import { mapGetters, mapActions } from 'vuex'
import { searchMixin } from 'common/js/mixin'

export default {
  mixins: [searchMixin],
  data() {
    return {
      showFlag: false,
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ],
      currentIndex: 0,
      delayrefresh: 200
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    show() {
      this.showFlag=true
      this.refreshList()
    },
    hide() {
      this.showFlag=false
    },
    switchIndex(index) {
      this.currentIndex=index
    },
    refreshList() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.lately.refresh()
        } else {
          this.$refs.searchHistory.refresh()
        }
      }, 20)
    },
    selectItems(song,index) {
      if (index!==0) {
        this.insertSong(song)
        this.showTopTip()
      } 
    },
    selectSuggest() {
      this.saveSeachHistory(this.query)
      this.showTopTip()
    },
    showTopTip() {
      this.$refs.toptip.show()
    },
    ...mapActions([
      'saveSeachHistory',
      'insertSong'
    ])
  },
  components: {
    SeachBox,
    Switches,
    SongList,
    Scroll,
    HistoryList,
    Suggest,
    TopTip
  },
  watch: {
    query(newval) {
      if(!newval) {
        this.refreshList()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.add-song
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
  &.fadeIn-enter-active,&.fadeIn-leave-active
    transition: all 0.3s linear 
  &.fadeIn-enter,&.fadeIn-leave-to
    transform: translateX(100%)
    opacity: 0
  .add-wrap
    height: 100%
    .title
      position: relative
      text-align: center
      .text
        line-height: 42px
        font-size: $font-size-medium-x
        color: $color-text
      .close
        position: absolute 
        top: 0
        right: 0
        padding: 10px 18px
        font-size: $font-size-large
        color: $color-theme
    .no-query
      .switch-wrap
        width: 245px
        margin: 20px auto 0
      .list-wrap
        position: absolute
        top: 165px
        bottom: 0
        width: 100%
        .lately
          height: 100%
          overflow: hidden
        .search-history
          height: 100%
          overflow: hidden
          .inner
            padding: 10px 20px
    .suggest-wrap
      position: relative
      height: 100%
      overflow: hidden
    .toptip
      font-size: $font-size-medium
      .text
        margin-left: 6px
</style>
