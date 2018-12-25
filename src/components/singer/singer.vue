<template>
  <div class="siger">
    <div></div>
  </div>
</template>
<script>
import {SingerList} from 'api/singerList'
const ERR_OK=0
const HOT_NAME='热门'
const HOT_LENG=10
export default {
  data() {
    return {
      singer: []
    }
  },
  created() {
    this._singerList()
  },
  methods: {
    _singerList() {
      SingerList().then((res)=>{
        if(res.code===ERR_OK){
          this.singer=this._normalList(res.data.list)
          console.log(this.singer)
        }
      })
    },
    _normalList(list) {//处理数据
      let map={
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item,index)=>{
        if(index<HOT_LENG){
          map.hot.items.push({
            name: item.Fsinger_name,
            id: item.Fsinger_id,
            avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
          })
        }
        const key=item.Findex
        if(!map[key]){
          map[key]={
            title: key,
            items: []
          }
        }
        map[key].items.push({
          name: item.Fsinger_name,
          id: item.Fsinger_id,
          avatar: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`
        })
      })
      
      //得到有序数据
      let ret=[]
      let hot=[]
      for(let key in map){
        let val=map[key]
        if(val.title.match(/[a-zA-Z]/)){
          ret.push(val)
        }else if(val.title===HOT_NAME){
          hot.push(val)
        }
      }
      ret.sort((a,b)=>{
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  }
}
</script>