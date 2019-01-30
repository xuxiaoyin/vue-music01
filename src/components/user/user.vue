<template>
  <transition name="fadeIn">
    <div class="user">
      <div class="top">
        <span class="back" @click="back"><i class="icon-back"></i></span>
        <div class="switches-wrap">
          <switches :switches="switches" :currentIndex="currentIndex" @switch="changeCurrent"></switches>
        </div>
      </div>
      <div class="player-btn">
        <div class="btn" @click="radomPlay">
          <span class="icon-play-mini"></span>
          <span class="text">随机播放全部</span>
        </div>  
      </div>

      <div class="list-wrap" ref="listWrap">
          <scroll class="lately" :data="favouriteList" ref="favourite" v-show="currentIndex===0" :delayrefresh="delayrefresh">
            <song-list :songs="favouriteList" ref="songList" @select="selectItems"></song-list>
          </scroll>

          <scroll class="lately" :data="playHistory" ref="lately" v-show="currentIndex===1" :delayrefresh="delayrefresh">
            <song-list :songs="playHistory" ref="songList" @select="selectItems"></song-list>
          </scroll>
      </div>

    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { mapGetters, mapActions } from 'vuex'
import { playListMixin } from 'common/js/mixin'

export default {
  mixins: ['playListMixin'],
  data() {
    return {
      switches: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      currentIndex :0,
      delayrefresh: 200
    }
  },
  computed: {
    ...mapGetters([
      'playHistory',
      'favouriteList'
    ])
  },
  created() {
    this.refresh()
  },
  methods: {
    back() {
      this.$router.back()
    },
    changeCurrent(index) {
      this.currentIndex = index
      this.refresh()
    },
    selectItems(item) {
      this.insertSong(item)
    },
    refresh() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.favourite.refresh()
        } else {
          this.$refs.lately.refresh()
        }
      }, 20)
    },
    handlePlayList(songList) {
      const bottom=songList.length>0? '60px': ''
      this.$refs.listWrap.style.bottom=bottom
      this.refresh()
    },
    radomPlay() {
      if(this.currentIndex===0) {
        this.redomPlay({
          list: this.favouriteList
        })
      }
      this.redomPlay({
        list: this.playHistory
      })
    },
    ...mapActions([
      'insertSong',
      'redomPlay'
    ])
  },
  components: {
    Switches,
    Scroll,
    SongList
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.user
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
  &.fadeIn-enter-active, &.fadeIn-leave-active
    transition: all 0.3s linear 
  &.fadeIn-enter, &.fadeIn-leave-to
    transform: translateX(100%)
    opacity: 0
  .top
    position: relative
    text-align: center
    .back
      position: absolute 
      height: 44px
      line-height: 44px
      width: 53px
      left: 0
      top: 0
      .icon-back
        font-size: 16px
        color: $color-theme
    .switches-wrap
      width: 60%
      margin: 10px auto 0 auto
  .player-btn
    height: 34px
    margin: 25px auto
    text-align: center
    .btn
      display: inline-block
      height: 34px
      line-height: 34px
      box-sizing: border-box
      padding: 0 20px
      border-radius: 17px
      border: 1px solid $color-text-d
      color: $color-text-l
      vertical-align: top
      .icon-play-mini
        float: left
        font-size: $font-size-large
        margin-right: 5px
        line-height: 34px
      .text
        float: left
        font-size: $font-size-medium
  .list-wrap
    position: absolute 
    top: 128px
    left: 0
    right: 0
    bottom: 0
    overflow: hidden
    .lately
      height: 100%
</style>
