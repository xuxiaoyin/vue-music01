export function addClass(el,className){
  if(hasClass(el,className)){
    return
  }
  let newClass=el.className.split(' ')
  newClass.push(className)
  el.className=newClass.join(' ')

}

export function hasClass(el,className){
  let reg=new RegExp('(^|\\s)'+className+'(\\|$)')
  return reg.test(el.className)
}

export function getData(el,name,val){
  const fixdata='data-'
  const name1=fixdata+name
  if(val){
    return el.setAttribute(name1,val)
  }else{
    return el.getAttribute(name1)
  }
}