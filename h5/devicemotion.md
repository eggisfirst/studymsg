## 摇一摇 devicemotion
```js
window.addEventListener('devicemotion',function(e) {
    document.getElementById('main').innerHTML = `
    x:${e.acceleration.x},
    y:${e.acceleration.y},
    z:${e.acceleration.z},
    `
    //判断加速度
    if(Math.abs(e.acceleration.x) > 9 ||Math.abs(e.acceleration.y) > 9 || Math.abs(e.acceleration.z) > 9 ) {
      alert('在晃')
    }
  })
```