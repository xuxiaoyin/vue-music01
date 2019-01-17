<template>
  <transition name="fade-confirm">
    <div class="confirm" v-show="flag" @click.stop>
      <div class="confirm-wrap">
        <div class="confirm-content">
          <div class="text">{{text}}</div>
          <div class="btn">
            <div class="ctrol-btn" @click="cancel">{{cancelBtn}}</div>
            <div class="ctrol-btn right" @click="confirm">{{confirmBtn}}</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtn: {
      type: String,
      default: '确定'
    },
    cancelBtn: {
      type: String,
      default: '取消'
    }
  },
  data() {
    return {
      flag: false
    }
  },
  methods: {
    show() {
      this.flag=true
    },
    hide() {
      this.flag=false
    },
    cancel() {
      this.hide()
      this.$emit('cancel')
    },
    confirm() {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.confirm
  position: fixed 
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background-d
  z-index: 998
  &.fade-confirm-enter-active
    animation: confirm-fadein 0.3s
    .confirm-content
      animation:confirm-zoom 0.3s
  .confirm-wrap
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    z-index: 999
    .confirm-content
      width: 270px
      border-radius: 10px
      background: $color-highlight-background
      .text
        padding: 19px 15px
        line-height: 22px
        text-align: center
        font-size: $font-size-medium-x
        color: $color-text-l
      .btn
        display: flex
        align-items: center
        text-align: center
        font-size: $font-size-medium-x
        .ctrol-btn
          flex: 1
          line-height: 22px
          padding: 10px 0
          border-top: 1px solid $color-background-d
          color: $color-text-d
          &.right
            border-left: 1px solid $color-background-d
@keyframes confirm-fadein
  0%
    opacity: 0
  100%
    opacity: 1
@keyframes  confirm-zoom
  0%
    transform: scale(0)
  50%
    transform: scale(1.1)
  100%
    transform: scale(1)
</style>
