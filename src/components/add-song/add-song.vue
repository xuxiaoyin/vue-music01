<template>
  <transition name=fadeIn>
    <div class="add-song" v-show="showFlag" @click.stop>
      <div class="add-wrap">
        <div class="title">
          <span class="text">添加歌曲到列表</span>
          <span class="close icon-close" @click="hide"></span>
        </div>
        <div class="search-box-wrap">
          <seach-box placeholder="搜索歌曲"></seach-box>
        </div>
        <div class="switch-wrap">
          <switches 
            :switches="switches" 
            @switch="switchIndex"
            :currentIndex="currentIndex"
          >
          </switches>
        </div>
        <div class="lately">
          <song-list></song-list>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import SeachBox from 'base/seach-box/seach-box'
import Switches from 'base/switches/switches'
import SongList from 'base/song-list/song-list'
export default {
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
      currentIndex: 0
    }
  },
  methods: {
    show() {
      this.showFlag=true
    },
    hide() {
      this.showFlag=false
    },
    switchIndex(index) {
      this.currentIndex=index
    }
  },
  components: {
    SeachBox,
    Switches,
    SongList
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
    .switch-wrap
      width: 245px
      margin: 20px auto
</style>
