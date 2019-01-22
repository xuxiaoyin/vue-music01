import storage from 'good-storage'
const SEACH_KEY='_seach_'
const MAX_LENGTH=15

const PLAY_KEY='_play_'
const PLAY_MAX_LEN=200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}


export function seachHistory(query) {
  let arr=storage.get(SEACH_KEY,[])
  insertArray(arr,query,(item)=>{
    return item===query
  },MAX_LENGTH)
  storage.set(SEACH_KEY,arr)
  return arr
}

export function loadSearch() {
  return storage.get(SEACH_KEY, [])
}

export function removeSeach(query) {
  let arr=storage.get(SEACH_KEY,[])
  let index=arr.findIndex((item)=>{
    return item===query
  })
  if(index>-1) {
    arr.splice(index,1)
  }
  storage.set(SEACH_KEY,arr)
  return arr
}

export function clearAll() {
  storage.remove (SEACH_KEY)
  return []
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlay() {
  return storage.get(PLAY_KEY, [])
}
