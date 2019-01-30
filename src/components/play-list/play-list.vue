<template>
  <transition name="list-fadeIn">
    <div class="paly-list-wrap" v-show="listflag" @click="hide">
      <div class="play-list" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="modeCls" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>
            <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <scroll class="content" ref="content" :data="sequenceList" :delayrefresh="delayrefresh">
          <transition-group class="list" ref="list" tag="ul" name="list">
            <li class="item" 
              v-for="(item,index) in sequenceList" :key="item.id"
              @click="selectItem(item,index)"
            >
              <i class="current" :class="getIconCls(item)"></i>
              <span class="text">{{item.name}}</span>
              <span class="like" @click.stop="changeFav(item)">
                <i class="icon" :class="favCls(item)"></i>
              </span>
              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div class="bottom">
          <div class="add" @click="showAddSong">
            <i class="icon-add"></i>
            <span>添加歌曲到队列</span>
          </div>
          <div class="close" @click="hide">关闭</div>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空播放列表" confirmBtn="清空" @confirm="clearList"></confirm>
      <add-song ref="addSong"></add-song>
    </div>
  </transition>
</template>

<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import Scroll from 'base/scroll/scroll'
import {palyMode} from 'common/js/config'
import Confirm from 'base/confirm/confirm'
import {playerMixin} from 'common/js/mixin'
import AddSong from 'components/add-song/add-song'

export default {
  mixins: [playerMixin], 
  data() {
    return {
      listflag: false,
      delayrefresh: 200
    }
  },
  computed: {
    modeText() {
      return this.mode===palyMode.random ? '随机播放' : this.mode===palyMode.sequence ? '顺序播放' : '单曲循环'
    }
  },
  methods: {
    show() {
      this.listflag=true
      setTimeout(()=> {
        this.$refs.content.refresh()
        this.scrollToCurrent(this.currentSong)
      },20)
    },
    hide() {
      this.listflag=false
    },
    getIconCls(item) {
      if(item.id===this.currentSong.id) {
        return 'icon-play'
      }else {
        return ''
      }
    },
    selectItem(item,index) {
      if( palyMode.random===this.mode) {
        index=this.songList.findIndex( (song)=>{
          return song.id===item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlaying(true)
    },
    scrollToCurrent(current) {
      const index=this.sequenceList.findIndex((song)=> {
        return current.id===song.id
      })
      this.$refs.content.scrollToElement(this.$refs.list.$el.children[index],300)
    },
    deleteOne(item) {
      this.deletetSong(item)
      if(!this.songList.length){
        this.hide()
      }
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    clearList() {
      this.deleteList()
      this.hide()
    },
    showAddSong() {
      this.$refs.addSong.show()
    },
    ...mapActions([
      'deletetSong',
      'deleteList'
    ])
  },
  components: {
    Scroll,
    Confirm,
    AddSong
  },
  watch: {
    currentSong(newsong,oldsong) {
      if(newsong.id===oldsong.id || !this.listflag ) {
        return
      }
      setTimeout(()=> {
        this.scrollToCurrent(newsong)
      },20)
    },

  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.paly-list-wrap
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  z-index: 999
  background: $color-background-d
  &.list-fadeIn-enter-active,&.list-fadeIn-leave-active
    transition: opacity 0.3s
    .play-list
      transition: all 0.3s
  &.list-fadeIn-enter,&.list-fadeIn-leave-to
     opacity: 0
     .play-list
       transform: translate3d(0,100%,0)
  &.list-fadeIn-enter
  .play-list
    position: absolute 
    width: 100%
    bottom: 0
    left: 0
    background: $color-highlight-background
    .list-header
      position: relative
      padding: 20px 30px 10px 20px
      .title
        display: flex
        align-items: center
        .icon
          margin-right: 10px
          font-size: 30px
          color: $color-theme-d
        .text
          flex: 1
          font-size: $font-size-medium
          color: $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size: $font-size-medium
            color: $color-text-d
    .content
      max-height: 240px
      overflow: hidden
      .list
        .item
          display: flex
          align-items: center
          height: 40px
          padding: 0 30px 0 20px
          overflow: hidden
          &.list-enter-active,&.list-leave-active
            transition: all 0.1s
          &.list-enter,&.list-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            overflow: hidden
            text-overflow: ellipsis
            white-space: nowrap
            font-size: $font-size-medium
            color: $color-text-l
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
            .icon-not-favorite
              color: $color-theme
          .delete
            extend-click()
            font-size: $font-size-small
            color: $color-theme
    .bottom
      text-align: center
      .add
        height: 28px
        line-height: 28px
        width: 138px
        border: 1px solid $color-text-l
        border-radius: 16px
        color: $color-text-l
        font-size: $font-size-medium
        margin: 20px auto
        .icon-add
          font-size: $font-size-small
          margin-right: 4px
      .close
        height: 50px
        line-height: 50px
        background: $color-background
        color: $color-text-l
        font-size: $font-size-medium
</style>
