<template>
  <div class="slide" ref="slide">
    <div class="slide-group" ref="slideGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="index" :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import {addClass} from 'common/js/dom'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._dots()
      this._initSlider()
      if(this.autoplay){
        this._autoplay()
      }
    },20) 

    window.addEventListener('resize',()=> {
      if(!this.slider){
        return
      }
      this._setSliderWidth(true)
      this.slider.refresh()
    })
  },
  methods: {
    _setSliderWidth(isResize) {
      this.children=this.$refs.slideGroup.children
      let width=0
      let slideWidth=this.$refs.slide.clientWidth
      for(let i=0; i<this.children.length; i++){
        let child=this.children[i]
        addClass(child,'slide-item')
        child.style.width=slideWidth+'px'
        width+=slideWidth
      }
      if(this.loop&&!isResize){
        width+=2*slideWidth
      }
      this.$refs.slideGroup.style.width=width+'px'
    },
    _dots() {
      this.dots=new Array(this.children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slide, {
        scrollX: true,
        scrollY: false,
        momentum: false, //惯性
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        }
      })
      this.slider.on('scrollEnd', this._onScrollEnd)
    },
    _onScrollEnd() {
      let pageIndex = this.slider.getCurrentPage().pageX
      if(this.loop){
        pageIndex-=1
      }
      this.currentPageIndex = pageIndex
      if(this.autoplay){
        clearTimeout(this.timer)
        this._autoplay()
      }
    },
    _autoplay() {
       let pageIndex=this.currentPageIndex+1
      if(this.loop){
        pageIndex+=1
      }
       this.timer=setTimeout(()=>{
         this.slider.goToPage(pageIndex,0,400)
      }, this.interval)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.slide
  position: relative
  min-height: 1px
  .slide-group
    position: relative
    overflow: hidden
    white-space: nowrap
    .slide-item
      float: left
      box-sizing: border-box
      overflow: hidden
      text-align: center
      a
        display: block
        width: 100%
        overflow: hidden
        text-decoration: none
      img
        display: block
        width: 100%
  .dots
    position: absolute 
    left: 0
    right: 0
    bottom: 12px
    text-align: center
    font-size: 0
    .dot
      display: inline-block
      margin: 0 4px
      width: 8px
      height: 8px
      border-radius: 50%
      background: $color-text-l
      &.active
        width: 20px
        border-radius: 5px
        background: $color-text-ll
</style>
