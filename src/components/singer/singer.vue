<template>
  <div class="singer"  ref="list">
    <list-view :data='singer' @select="selectSinger" ref="Listview"></list-view>
    <router-view></router-view>
  </div>
</template>
<script>
import {SingerList} from 'api/singerList'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'
import {playListMixin} from 'common/js/mixin'
import Singer from 'common/js/singer'
const ERR_OK=0
const HOT_NAME='热门'
const HOT_LENG=10
export default {
  mixins:[playListMixin],
  data() {
    return {
      singer: []
    }
  },
  created() {
    this._singerList()
  },
  methods: {
    handlePlayList(SongList) {
      const bottom = SongList.length > 0 ? '60px' : ''
      this.$refs.list.style.bottom=bottom
      this.$refs.Listview.refresh()
    },
    selectSinger(item){
      this.$router.push({
        path: `/singer/${item.id}`
      })
      this.setSinger(item)
    },
    _singerList() {
      SingerList().then((res)=>{
        if(res.code===ERR_OK){
          this.singer=this._normalList(res.data.list)
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
          map.hot.items.push(
            new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            })
          )
        }
        const key=item.Findex
        if(!map[key]){
          map[key]={
            title: key,
            items: []
          }
        }
        map[key].items.push(
          new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          })
        )
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
    },
    ...mapMutations ({
      setSinger : 'SET_SINGER' 
    })
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position: fixed 
  top: 88px
  right: 0
  left: 0
  bottom:0
</style>
