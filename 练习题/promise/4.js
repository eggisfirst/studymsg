// function sun(a, b) {
//   return a + b
// }
// var n1 = prompt('1')
// var n2 = prompt('2')
// sun(n1,n2)f
function is(n) {
  if(n < 2) {
    return false
  }

  for (let i = 2; i < n.length; i++) {
      if(n % i === 0) {
        return false
      }
    
  }
  return true
}

console.log(is(1));