<template>
  <div>
    <scroll class="rank" :data="topList" ref="rank">
      <div>
        <div class="rank-item" v-for="(list,index) in topList" :key="index" @click="selectItem(list)">
          <div class="pic">
            <img width="100" height="100%" v-lazy="list.picUrl">
          </div>
          <div class="list">
            <p class="text" v-for="(song,_index) in list.songList" :key="_index">
              {{_index+1}} {{song.songname}}-{{song.singername}}
            </p>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import {getRankList} from 'api/rank'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playListMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins:[playListMixin],
  data() {
    return {
      topList: []
    }
  },
  created() {
    this._getRankList()
  },
  methods: {
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
      console.log(item)
    },
    handlePlayList(songlist) {
      const bottom=songlist.length>0? '60px': ''
      this.$refs.rank.$el.style.bottom=bottom
      this.$refs.rank.refresh()
    },
    _getRankList() {
      getRankList().then( (res) => {
        if(res.code===ERR_OK){
          this.topList=( res.data.topList )
        }      
      })
    },
    ...mapMutations({
      setTopList: "SET_TOPLIST"
    })
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.rank
  position: absolute 
  top: 88px
  left: 5%
  width: 90%
  bottom: 0
  overflow: hidden
  .rank-item
    display: flex
    width: 100%
    height: 104px
    margin: 20px 0
    background: $color-highlight-background
    .pic
      flex: 0 0 100px
    .list 
      flex: 1
      margin: 10px 10px 0 20px
      .text
        height: 28px
        width: 100%
        line-height: 28px
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
  .loading-wrap
    position: absolute 
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
