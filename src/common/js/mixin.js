import { mapGetters, mapMutations, mapActions } from 'vuex'
import { palyMode } from 'common/js/config'
import { getNutil } from 'common/js/nutil'

//playListMixin 迷你播放器出现的时候重置botttom值和scroll的refresh
export const playListMixin={
 computed: {
   ...mapGetters([
     'songList'
    ])
 },
  mounted() {
    this.handlePlayList(this.songList)
  },
  activated() {
    this.handlePlayList(this.songList)
  },
  watch: {
    songList(newval) {
      this.handlePlayList(newval)
    }
  },
  meshods: {
    handlePlayList() {
      throw new Error('component must implement handlePlayList function')
    }
  }
}

export const playerMixin={
  computed: {
    modeCls() {
      return this.mode===palyMode.sequence ? 'icon-sequence' : this.mode===palyMode.loop ? 'icon-loop' : 'icon-random'
    },
    ...mapGetters([
      'mode',
      'sequenceList',
      'songList',
      'currentSong',
    ])
  },
  methods: {   
    changeMode() {
      let mode=(this.mode+1)%3
      this.setMode(mode)
      let list=null
      if(mode===palyMode.random) {
        list=getNutil(this.sequenceList)
      }else{
        list=this.sequenceList
      }
      this.resetCurrentIndex(list)
      this.setSonglist(list) 
    },
    resetCurrentIndex(list) {
      let index=list.findIndex((item)=>{
        return item.id===this.currentSong.id
      })
      this.setCurrentIndex(index)
    },
    ...mapMutations({
      setPlaying:'SET_PLAYING',
      setCurrentIndex:'SET_CURRENTINDEX',
      setMode:'SET_MODE',
      setSonglist:'SET_SONGLIST'
    })
  }
}

export const searchMixin= {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'seachHistory'
    ])
  },
  methods: {
    addQuery(query) {
      this.$refs.seachBox.setquery(query)
    },
    onqueryChenge(query) {
      this.query=query
    },
    deleteOne(item) {
      this.removeSeachOne(item)
    },
    ...mapActions([
      'removeSeachOne'
    ])
  }
}