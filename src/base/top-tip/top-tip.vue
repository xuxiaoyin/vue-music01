<template>
  <transition name="tip">
    <div class="top-tip" v-show="showFlag" @click.stop="hide">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      showFlag: false
    }
  },
  props: {
    delay: {
      type: Number,
      default: 2000
    }
  },
  methods: {
    show() {
      this.showFlag = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.hide()
      }, this.delay)
    },
    hide() {
      this.showFlag = false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.top-tip
  position: fixed
  top: 0
  left: 0
  right: 0
  z-index: 999
  height: 40px
  background: $color-dialog-background
  text-align: center
  line-height: 40px
  &.tip-enter-active, &.tip-leave-active
    transition: all 0.2s linear 
  &.tip-enter, &.tip-leave-to
    transform: translate3d(0,-100%, 0) 
</style>
