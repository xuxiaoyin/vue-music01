<template>
  <scroll 
    :data='data' 
    class="listview" 
    ref="listview" 
    :listenScroll="listenScroll" 
    :probeType="probeType"
    @scroll="scroll"
  >
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
    <div class="rightmenu" 
      @touchstart.stop.prevent="onRightStart" 
      @touchmove.stop.prevent="onRightMove"
    >
      <ul>
        <li 
          v-for="(item,index) in rightmenu" 
          :key="index" 
          class="right-item" 
          :class="{'active':currentIndex===index}"
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
const TOUCH_HEIGHT=16
export default {
  created(){
    this.touch = {}
    this.listenScroll=true
    this.probeType=3
    this.listHeight=[]
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
  data(){
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  watch: {
    data(){
      setTimeout(()=>{
        this._calculateHeight()
      },20)
    },
    scrollY (newY) {
      const listHeight=this.listHeight
      //顶部
      if(newY>0){
        this.currentIndex=0
        return
      }
      //中间部分
      for(let i=0;i<listHeight.length-1;i++){
        let height1=listHeight[i]
        let height2=listHeight[i+1]
        if(-newY>=height1 && -newY<height2){
          this.currentIndex=i
          return
        }
      }
      //最底部
       this.currentIndex=listHeight.length-2
    }
  },
  methods: {
    onRightStart(e){
      let _index=getData(e.target, 'index')
      let firstTouch=e.touches[0]
      this.touch.y1=firstTouch.pageY
      this.touch._index=_index
      this._scroolTo(_index)
    },
    onRightMove(e){
      let firstTouch=e.touches[0]
      this.touch.y2=firstTouch.pageY
      let delta=(this.touch.y2-this.touch.y1)/TOUCH_HEIGHT | 0
      let _index=parseInt(this.touch._index)+delta
      this._scroolTo(_index)
    },
    scroll(pos){
      this.scrollY=pos.y
    },
    _scroolTo(index){
      //排除上下空白处点击
      if(!index && index!==0){
        return
      }
      if(index<0){
        index=0
      }else if(index>this.listHeight.length-2){
        index= this.listHeight.length-2
      }
      this.scrollY=-this.listHeight[index]
      this.$refs.listview.scrollToElement(this.$refs.group[index],0)
    },
    _calculateHeight() {
      this.listHeight=[]
      const list=this.$refs.group
      let height=0
      this.listHeight.push(height)
      for(let i=0; i<list.length;i++){
        let item=list[i]
        height+=item.clientHeight
        this.listHeight.push(height)
      }
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
      line-height: 16px
      font-size: 9px
      color: $color-text-l
      &.active
        color: $color-theme

</style>
