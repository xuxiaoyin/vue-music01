<template>
  <div class="pross-bar" ref="prossBar"  @click="prossClick">
    <span class="sumLine" ref="sumLine"></span>
    <span class="currentLine" ref="currentLine"></span>
    <span class="btn" ref="btn" 
      @touchstart.prevent="btnTouchsatrt"
      @touchmove.prevent="btnTouchmove"
      @touchend="btnTouchend"
     >
     </span>
  </div>
</template>

<script>
export default {
  props: {
    precent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch={ }
  },
  methods: {
    btnTouchsatrt( e ) {
      this.touch.initial=true
      this.touch.startX=e.touches[0].pageX
      this.touch.left=this.$refs.currentLine.clientWidth
    },
    btnTouchmove( e ) {
      if( !this.touch.initial ) {
        return
      }
      const daltaX= e.touches[0].pageX - this.touch.startX
      const offsetWidth= Math.min(this.$refs.prossBar.clientWidth-20,Math.max(0,this.touch.left+daltaX)) 
      this._offLeft( offsetWidth )
    },
    btnTouchend() {
      this.touch.initial=false
      this._triggerPercent()
    },
    prossClick(e) {
      //点击btn获取位置不对
      //this._offLeft(e.offsetX)
      const rect=this.$refs.sumLine.getBoundingClientRect()
      const offsetWidth=e.pageX-rect.left
      this._offLeft(offsetWidth)
      this._triggerPercent()
    },
    _offLeft( offsetWidth ) {
      this.$refs.currentLine.style.width=`${offsetWidth}px`
      this.$refs.btn.style['transform']=`translate3d(${offsetWidth}px,0,0)`
      this.$refs.btn.style['webkitTransform']=`translate3d(${offsetWidth}px,0,0)`
    },
    _triggerPercent() {
      const barWidth=this.$refs.prossBar.clientWidth-20
      const precent=this.$refs.currentLine.clientWidth/barWidth
      this.$emit('changePercent',precent)
    }
  },
  watch: {
    precent( newPrecent ) {
      const barWidth=this.$refs.prossBar.clientWidth-20
      const offsetWidth=barWidth * newPrecent
      if( offsetWidth>=0 && !this.touch.initial) {
        this._offLeft( offsetWidth )
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.pross-bar
  position: relative
  height: 20px
  line-height: 20px
  width: 100%
  .sumLine
    display: block
    position: relative
    top: 7px
    width: 100%
    height: 4px
    background: $color-background-d
  .btn
    position: absolute
    top: 0
    left: 0
    width: 20px
    height: 20px
    box-sizing: border-box
    border-radius: 50%
    background: $color-theme
    border: 4px solid #fff
  .currentLine
    position: absolute 
    left: 0
    top: 7px
    height: 4px
    background: $color-theme
</style>
