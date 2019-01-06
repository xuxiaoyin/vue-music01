<template>
  <div class="pross-cricle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="50" fill="transparent" class="background"/>
      <circle cx="50" cy="50" r="50" fill="transparent" class="pross" 
      :stroke-dasharray="dashArray" 
      :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    precent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI*100
    }
  },
  computed: {
    dashOffset() {
      return (1-this.precent)*this.dashArray
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.pross-cricle
  position: relative
  circle
    stroke-width: 8px
    transform-origin: center
    &.background
      transform: scale(0.9)
      stroke: $color-theme-d
    &.pross
      transform: scale(0.9) rotate(-90deg)
      stroke: $color-theme
</style>
