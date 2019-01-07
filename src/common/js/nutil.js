function getRadom(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min)
}

export function getNutil(arr) {
  const arr1=arr
  for(let i=0;i<arr1.length;i++) {
    let j=getRadom(0,i)
    let t=arr1[i]
    arr1[i]=arr[j]
    arr1[j]=t 
  }
  return arr1
}