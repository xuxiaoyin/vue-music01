<template>
  <div class="switches">
    <span 
      v-for="(item,index) in switches" 
      :key="index" class="item" 
      :class="{'active':index===currentIndex}"
      @click="switchIndex(index)"
    >
      {{item.name}}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default:[]
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchIndex(index) {
      this.$emit('switch',index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.switches
  display: flex
  height: 35px
  box-sizing: border-box
  align-items: center
  border: 2px solid $color-highlight-background
  border-radius: 6px
  .item
    flex: 1
    height: 100%
    line-height: 31px
    text-align: center
    font-size: $font-size-medium
    color: $color-text-d
    &.active
      color: $color-text
      background: $color-highlight-background
</style>
