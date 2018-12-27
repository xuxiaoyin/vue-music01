export default class song{
  constructor({id,mid,singer,name,albumname,interval,image,url}){
    this.id=id
    this.mid=mid
    this.singer=singer
    this.name=name
    this.albumname=albumname
    this.interval=interval
    this.image=image
    this.url=url
  }
}

export function creatSongs(musicData) {
  return new song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    albumname: musicData.albumname,
    interval: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${ musicData.songmid}.m4a?fromtag=0&guid=126548448`
  })
}

function filterSinger(singer) {
  let ret=[]
  if(!singer){
    return ''
  }
  singer.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}