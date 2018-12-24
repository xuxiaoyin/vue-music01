<template>
  <div class="recommend">
    <scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div class="slid-wrap" v-if="recommends.length">
          <div class="slid-content">
            <slider>
              <div v-for="(item,index) in recommends" :key="index">
                <a :href="item.linkUrl">
                  <!-- class="needclick"解决和fastclick冲突下不能点击的问题 -->
                  <img :src="item.picUrl" @load="Imgload" class="needclick">
                </a>
              </div>
            </slider>
          </div>
        </div>
        <div class="reconmmend-wrap">
          <h1 class="list-title">热门歌曲推荐</h1>
          <div class="reList">
            <ul>
              <li v-for="(item,index) in discList" :key="index" class="listitem">
                <div class="pic">
                  <img v-lazy="item.imgurl" width="62" height="64">
                </div>
                <div class="text">
                  <h1 class="name">{{item.creator.name}}</h1>
                  <p class="dissname">{{item.dissname}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="loading-wrap" v-if="!discList.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import {getRecommend,getDiscList} from 'api/recommend.js'
//import Slide from 'base/slide/slide'
import Slider from 'base/slide/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
const ERR_OK=0
export default {
  data() {
    return {
      recommends: [],
      discList:[]
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res=> {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    },
    _getDiscList() {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    Imgload() {
      if(!this.isLoad) {
        this.$refs.scroll.refresh()
        this.isLoad=true
      }
    }
  },
  components: {
    Slider,
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'
.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slid-wrap
      height: 0
      width: 100%
      padding-top: 40%
      overflow: hidden
      .slid-content
        position: absolute 
        top: 0
        left: 0
        width: 100%
        height: 100%
    .reconmmend-wrap
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        color: $color-theme
        font-size: $font-size-medium
      .reList
        .listitem
          display: flex
          padding: 0 18px
          margin-bottom: 20px
          box-sizing: border-box
          align-items: center
          .pic
            width: 62px
            margin-right:20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 21px
            ovflow: hidden 
            .name
              margin-bottom: 10px
              fot-size: $font-size-medium
              color: $color-text
            .dissname
              font-size: $font-size-medium 
              color: $color-text-l
  .loading-wrap
    position: absolute 
    width: 100%
    top: 50%
    transform: translateY(-50%)



</style>
