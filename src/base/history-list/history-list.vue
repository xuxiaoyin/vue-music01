<template>
  <div class="hisstory-list">
    <transition-group class="list" tag="ul" name="list">
      <li class="item" 
        v-for="item in seaches" 
        :key="item" v-show="item" 
        @click="selectItem(item)"
      >
        <span class="text">{{item}}</span>
        <span class="icon-delete" @click.stop="deleteOne(item)"></span>
      </li>
    </transition-group>
  </div>
</template>

<script>
export default {
  props: {
    seaches: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('selectOne',item)
    },
    deleteOne(item) {
      this.$emit('deleteOne',item)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

  .item
    height: 36px
    line-height: 32px
    color: $color-text-l
    &.list-enter-active,&.list-leave-active
      transition: all 0.1s
    &.list-enter, &.list-leave-to
      height: 0
    .text
      float: left 
      width: 80%
      line-height: 32px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      font-size: $font-size-medium
    .icon-delete
      float: right
      line-height: 32px
      font-size: $font-size-small

</style>
