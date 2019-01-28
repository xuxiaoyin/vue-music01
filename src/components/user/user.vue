<template>
  <transition name="fadeIn">
    <div class="user">
      <div class="top">
        <span class="back" @click="back"><i class="icon-back"></i></span>
        <div class="switches-wrap">
          <switches :switches="switches" :currentIndex="currentIndex"></switches>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Switches from 'base/switches/switches'
export default {
  data() {
    return {
      switches: [
        {name: '我喜欢的'},
        {name: '最近听的'}
      ],
      currentIndex :0
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  components: {
    Switches
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable';

.user
  position: fixed
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: $color-background
  &.fadeIn-enter-active, &.fadeIn-leave-active
    transition: all 0.3s linear 
  &.fadeIn-enter, &.fadeIn-leave-to
    transform: translateX(100%)
    opacity: 0
</style>
