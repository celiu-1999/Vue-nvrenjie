// 添加class
export function addClass (el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')  // 获取class，用‘ ’拆开，返回一个数组
  newClass.push(className) // 将新的class push进数组
  el.className = newClass.join(' ')  // 将数组以‘ ’分开，设置元素的className
}

// 判断是否存在这个class
export function hasClass (el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
