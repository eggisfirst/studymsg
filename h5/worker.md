## worker 多线程
 
不能操作dom，没有window对象，不能读取本地文件。可以发ajax，可以计算。
兼容性很差
worker文件里面不能继续使用worker
可以双向发送和接收信息
停止worker： worker.terminate() 在worker.js中可以this.close()

如果需要异步操作，可以创建一个worker
创建worker var worker = new Worker('./worker.js')
发送消息 worker.postMessage({name: 123})
接收 worker.onmessage = function(e) {e.data}