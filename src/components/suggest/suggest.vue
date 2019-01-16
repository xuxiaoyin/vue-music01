<template>
  <scroll class="suggest" :data="result" :pullup="pullup" @scrollToEnd="seachMore" ref="suggest">
    <ul class="list">
      <li class="item" v-for="(item,index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <span :class="iconCls(item)"></span>
        </div>
        <div class="text" v-html="getName(item)"></div>
      </li>
      <loading title="" v-show="isMore"></loading>
    </ul>
  </scroll>
</template>

<script>
import { getSeach } from 'api/seach'
import {ERR_OK} from 'api/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {createSongs,processSongsUrl} from 'common/js/song'
import Singer from 'common/js/singer'
import {mapMutations,mapActions} from 'vuex'
const TYPE_SINGER='singer'
const perpage=20

export default {
  props: {
    query:'',
    zhida: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      isMore: true
    }
  },
  methods: {
    iconCls(item) {
      return item.type===TYPE_SINGER ? 'icon-mine' : 'icon-music'
    },
    getName(item) {
      return item.type===TYPE_SINGER ? item.singername : `${item.name}-${item.singer}`
    },
    seachMore() {
      if(!this.isMore) {
        return
      }
      this.page++
      getSeach(this.query,this.zhida,this.page,perpage).then( (res) => {
        if(res.code===ERR_OK) {
          this._getresult(res.data).then((result)=> {
            this.result=this.result.concat(result)
          })
          this._checkMore(res.data)
        }    
      })

    },
    seach() {
      this.page=1
      this.isMore=true
      this.$refs.suggest.scrollTo(0,0)
      getSeach(this.query,this.zhida,this.page,perpage).then( (res)=> {
        if(res.code===ERR_OK) {
          this._getresult(res.data).then((result)=> {
            this.result=result
          })
          this._checkMore(res.data)
        }       
      })
    },
    selectItem(item) {
      if(item.type===TYPE_SINGER) {
        const singer=new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      }else{
        this.insertSong(item)
      }
    },
    _checkMore(data) {
      const song=data.song
      if(!song.list.length||song.curnum+(song.curpage-1)*perpage >= song.totalnum) {
        this.isMore=false
      }
    },
    _getresult(data) {
      let ret=[]
      if(data.zhida.singerid) {
        ret.push({...data.zhida,...{type: TYPE_SINGER}})
      }
      //ret=ret.concat(data.song.list)
      return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs)=> {
        ret=ret.concat(songs)
        return ret
      })
    },
    _normalizeSongs(list) {
      let ret=[]
      list.forEach((musicData)=>{
        if(musicData.songid && musicData.albummid){
          ret.push(createSongs(musicData))
        }
      })
      return ret
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query() {
      this.seach() 
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable'

.suggest
  position: absolute
  top: 60px
  bottom: 0
  left: 10%
  width: 80%
  overflow: hidden
  .list
    .item
      display: flex
      line-height: 38px
      .icon
        flex: 0 0 30px
        width: 30px
        font-size: $font-size-medium-x
        color: $color-text-d
      .text
        flex: 1
        height: 38px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
        font-size: $font-size-medium
        color: $color-text-d
</style>
