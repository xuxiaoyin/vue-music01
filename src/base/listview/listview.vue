<template>
  <scroll :data='data' class="listview" ref="listview">
    <ul class="wrap">
      <li v-for="(group,index) in data" :key="index" class="wrap-item" ref="group">
        <h1 class="title">{{group.title}}</h1>
        <ul class="list">
          <li v-for="(item,index) in group.items" :key="index" class="item">
            <img class="avatar" v-lazy="item.avatar" width="52" height="52">
            <span class="text">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="rightmenu" @touchstart.stop.prevent="onRightStart" @touchmove.stop.prevent="onRightMove">
      <ul>
        <li 
          v-for="(item,index) in rightmenu" 
          :key="index" 
          class="right-item" 
          :data-index="index">
          {{item}}
        </li>
      </ul>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
const TOUCH_HEIGHT=18
export default {
  created(){
    this.touch = {}
  },
  props: {
    data: {
      type:Array,
      default:[]
    }
  },
  computed: {
    rightmenu(){
      return this.data.map((group)=>{
        return group.title.substr(0,1)
      })
    }
  },
  methods: {
    onRightStart(e){
      let _index=getData(e.target, 'index')
      let firstTouch=e.touches[0]
      this.touch.y1=firstTouch.pageY
      this.touch._index=_index
      this.$refs.listview.scrollToElement(this.$refs.group[_index],0)
    },
    onRightMove(e){
      let firstTouch=e.touches[0]
      this.touch.y2=firstTouch.pageY
      let delta=(this.touch.y2-this.touch.y1)/TOUCH_HEIGHT | 0
      let _index=this.touch._index+delta
      this.$refs.listview.scrollToElement(this.$refs.group[_index],0)
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
  .rightmenu
    position: absolute 
    right: 0
    width: 20px
    top: 50%
    transform: translateY(-50%)
    padding: 20px 0
    background: $color-background-d
    text-align: center
    border-radius: 10px
    .right-item
      line-height: 18px
      font-size: $font-size-small-s
      color: $color-text-l

</style>
