## history
历史记录堆栈
当单页面应用：搜索功能想后退回到上一步操作的时候可以用
 `history.pushState({inpVal: 'xx'}, null, '#' + value)  锚点，也可以写成路径"/" + value`

```js
//当url变化的时候就会监听到，两个一起使用的时候，这个最先执行。
window.addEventListener('popstate', function(e) {})
//只有当锚点变化的时候才会监听
window.addEventListener('hashchange', function(e) {})
```
 
