<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in songs" :key="index" class="item" @click="select(song, index)">
        <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div>
        <div class="list">
          <h1 class="name">{{song.name}}</h1>
          <div class="des">{{getDec(song)}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getRankCls(index) {
      if(index<=2) {
        return `icon icon-${index}`
      }else {
        return 'text'
      }
    },
    getRankText(index) {
      if(index>2) {
        return index+1
      }
    },
    getDec(song){
      return `${song.singer} . ${song.album}`
    },
    select(item,index) {
      this.$emit('select',item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
@import '~common/stylus/mixin'

.song-list
  padding: 20px
  .item
    display: flex
    margin-bottom: 15px
    .rank
      flex: 0 0 25px
      width: 25px
      margin-right: 20px
      margin-top: 10px
      text-align: center
      .icon
        display: inline-block
        width: 25px
        height: 24px
        background-size: 25px 24px
        &.icon-0
          bg-image('first')
        &.icon-1
          bg-image('second')
        &.icon-2
          bg-image('third')
      .text
        color: $color-theme
        font-size: $font-size-large
    .list
      flex: 1
      overflow: hidden 
      text-overflow: ellipsis
      white-space: nowrap
      .name
        height: 25px
        line-height: 25px
        font-size: 15px
        color: $color-text
      .des
        height: 25px
        line-height: 25px
        font-size: 13px
        color: $color-text-l
</style>
