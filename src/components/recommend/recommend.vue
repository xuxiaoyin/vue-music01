<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slid-wrap" v-if="recommends.length">
        <slide>
          <div v-for="(item,index) in recommends" :key="index" >
            <a :href="item.linkUrl">
              <img :src="item.picUrl">
            </a>
          </div>
        </slide>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend.js'
import Slide from 'base/slide/slide'
const ERR_OK=0
export default {
  data() {
    return {
      recommends: []
    }
  },
  created() {
    this._getRecommend()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res=> {
        if (res.code === ERR_OK) {
          this.recommends = res.data.slider
        }
      })
    }
  },
  components: {
    Slide
  }
}
</script>