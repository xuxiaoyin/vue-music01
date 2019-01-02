<template>
  <div class="song-list">
    <ul>
      <li v-for="(song,index) in songs" :key="index" class="item" @click="select(song, index)">
        <h1 class="name">{{song.name}}</h1>
        <div class="des">{{getDec(song)}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: []
    }
  },
  methods: {
    getDec(song){
      return `${song.singer} . ${song.album}`
    },
    select(item,index) {
      this.$emit('select',item, index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.song-list
  padding: 20px
  .item
    margin-bottom: 15px
    .name
      line-height: 25px
      font-size: $font-size-medium-x
      color: $color-text
    .des
      line-height: 25px
      font-size: $font-size-medium
      color: $color-text-l
</style>
