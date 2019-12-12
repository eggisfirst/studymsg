## requestAnimationFrame
默认1s执行60帧，相当于settimeout，需要一直调用。
和setinterval的区别是：
如果setinterval也设置时间为1000/60，如果每次执行的代码时间不在设置的这个时间范围内，则还是会丢帧。而requestAnimationFrame是一定会准时按照这个时间来执行的。
//兼容性极差
cancelAnimationFrame() 相当于 clearTimeout

```js
function move() {
  var square = document.getElementById('main')
  if(square.offsetLeft > 700) {
    return
  }
  square.style.left = square.offsetLeft + 20 + 'px'
  requestAnimationFrame(move)
}
move()
```
```js
function move() {
  var square = document.getElementById('main')
  if(square.offsetLeft > 700) {
    return
  }
  square.style.left = square.offsetLeft + 20 + 'px'
}
setInterval(move, 1000/60);
```