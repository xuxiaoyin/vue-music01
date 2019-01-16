import storage from 'good-storage'
const SEACH_KEY='_seach_'
const MAX_LENGTH=15

function changeVal(arr,val,func,maxLen) {
  const index=arr.findIndex(func)
  if(index===0) {
    return
  }
  if(index>0) {
    arr.splice(index,1)
  }
  arr.unshift(val)
  if(maxLen&&arr.length>maxLen) {
    arr.pop()
  }
}

export function seachHistory(query) {
  let arr=storage.get(SEACH_KEY,[])
  if(query) {
    changeVal(arr,query,(item)=>{
      return item===query
    },MAX_LENGTH)
  }
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

export function clearAll(){
  storage.remove (SEACH_KEY)
  return []
}