<template>
  <div>歌手页面</div>
</template>

<script>
import {SingerList} from 'api/singerList'
const ERR_OK=0
export default {
  data() {
    return {
      singerList: []
    }
  },
  created() {
    this._singerList()
  },
  methods: {
    _singerList() {
      SingerList().then((res)=>{
        if(res.code===ERR_OK){
          console.log(res)
        }
      })
    }
  }
}
</script>