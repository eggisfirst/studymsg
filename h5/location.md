## 获取地理位置
```js
window.navigator.geolocation.getCurrentPosition(function(position) {
  //获取成功后的回调
},function(err) {
  //获取失败后的回调
})
```

### 需要在https协议下或者file协议下（本地打开文件）才能使用这个方法
因为获取地理位置是一个私人信息，用http会暴露。