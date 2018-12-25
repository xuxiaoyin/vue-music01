<template>
  <scroll :data='data' class="listview">
    <ul class="wrap">
      <li v-for="(group,index) in data" :key="index" class="wrap-item">
        <h1 class="title">{{group.title}}</h1>
        <ul class="list">
          <li v-for="(item,index) in group.items" :key="index" class="item">
            <img class="avatar" :src="item.avatar" width="52" height="52">
            <span class="text">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
export default {
  props: {
    data: {
      type:Array,
      default:[]
    }
  },
  components:{
    Scroll
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable'

.listview
  position: relative
  width: 100%
  height: 100%
  ovflow: hidden
  .wrap
    .wrap-item
      .title
        height: 32px
        line-height: 32px
        padding-left: 20px
        margin-bottom: 18px
        background: $color-highlight-background
        font-size: $font-size-small
        color: $color-text-l
      .list
        padding-left: 30px
        .item
          font-size: 0
          margin-bottom: 18px
          .avatar
            display: inline-block
            vertical-align: top
            width: 52px
            border-radius: 50%
          .text
            display: inline-block
            line-height: 52px
            vertical-align: top
            margin-left: 20px
            font-size: 15px
            color: $color-text-l
</style>
