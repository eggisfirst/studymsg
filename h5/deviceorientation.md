## 体感deviceorientation
苹果设备11.1.x之后必须使用https才可以使用这个接口

alpha: 指南针，当为0的时候指北，180指南。
beta： 平放为0，立起来（短边）为90。倒立为-90
gamma： 平放为0，立起来（长边）为90，倒立-90

```js
window.addEventListener('deviceorientation', function(e) {
    document.getElementById('main').innerHTML = `
    alpha: ${e.alpha},
    beta:${e.beta},
    gama: ${e.gamma}
    `
  })
```