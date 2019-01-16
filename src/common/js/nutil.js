function getRadom(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

export function getNutil(arr) {
  const arr1=arr.slice()
  for(let i=0;i<arr1.length;i++) {
    let j=getRadom(0,i)
    let t=arr1[i]
    arr1[i]=arr1[j]
    arr1[j]=t 
  }
  return arr1
}

//节流函数
export function debounce(func,delay) {
  let timer
  return function (...args) {
    if(timer) {
      clearTimeout(timer)
    }
    timer=setTimeout((()=>{
      func.apply(this,args)
    }),delay)
  }
}
