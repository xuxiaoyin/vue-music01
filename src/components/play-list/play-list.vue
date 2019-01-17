<template>
  <transition name="list-fadeIn">
    <div class="paly-list-wrap" v-show="listflag" @click="hide">
      <div class="play-list" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon icon-sequence"></i>
            <span class="text">随机播放</span>
            <span class="clear"><i class="icon-clear"></i></span>
          </h1>
        </div>
        <div class="content">
          <ul class="list">
            <li class="item">
              <i class="current"></i>
              <span class="text"></span>
              <span class="like">
                <i class="icon icon-not-favorite"></i>
              </span>
              <span class="delete">
                <i class="icon icon-delete"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="bottom">
          <div class="add">
            <i class="icon-add"></i>
            <span>添加歌曲到队列</span>
          </div>
          <div class="close" @click="hide">关闭</div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default { 
  data() {
    return {
      listflag: false
    }
  },
  methods: {
    show() {
      this.listflag=true
    },
    hide() {
      this.listflag=false
    }
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
          &.list-fadeIn-enter-active,&.list-fadeIn-leave-active
            transition: all 0.1s
          &.list-fadeIn-enter,.list-fadeIn-leave-to
            height: 0
          .current
            flex: 0 0 20px
            width: 20px
            font-size: $font-size-small
            color: $color-theme-d
          .text
            flex: 1
            over-flow: hidden 
            text-overflow: ellipsis
            white-space: nowrap
          .like
            extend-click()
            margin-right: 15px
            font-size: $font-size-small
            color: $color-theme
            .icon-favorite
              color: $color-sub-theme
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
        margin: 30px auto
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
