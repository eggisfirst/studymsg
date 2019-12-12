const MyPromise = (() => {
  const PENDING = 'pending',    //状态设置为常量
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        PromiseValue = Symbol('PromiseValue'), //状态数据
        PromiseStatus = Symbol('PromiseStatus'), //当前状态
        changeStatus = Symbol('changeStatus'), //改变状态
        thenables = Symbol('thenables'), //resolve的消息队列
        catchables = Symbol('catchables'), //rejecte的消息队列
        settleHandler = Symbol('settleHandler') //后续处理通用函数

  return class MyPromise {
    //新增  加一个队列参数，当状态改变的时候，执行队列中的处理函数
    //公共函数
    //改变状态： newStatus：将要改变的状态，newValue：要改变的状态数据
    [changeStatus](newStatus, newValue, queue) {
       if(this[PromiseStatus] !== PENDING) {
          return
        }
        this[PromiseStatus] = newStatus
        this[PromiseValue] = newValue
        queue.forEach(handler => handler(newValue))
    }

    constructor(executor) {  //executor为传入的函数
      this[PromiseValue] = undefined  
      this[PromiseStatus] = PENDING 
      //初始化队列
      this[thenables] = []
      this[catchables] = []
      //新增参数，resolve的消息队列
      const resolve = data => {  
        this[changeStatus](RESOLVED, data, this[thenables]) 
      }
       //新增参数，reject的消息队列
      const reject = reason => {  
        this[changeStatus](REJECTED, reason, this[catchables]) 
      }
      try{
        executor(resolve, reject) //带有两个参数，我们自己定义这两个参数
      }
      catch(err) {
        reject(err)  //在这里捕获
      }
    }  
    
    //后续处理通用函数
    //handler: 要调用的处理函数
    //immediatelyStatus： 需要立即执行的状态
    //queue: 要加入的队列
    [settleHandler](handler, immediatelyStatus, queue) {
      //新增：如果传入的处理函数不是function类型的，则直接返回
      if(typeof handler !== 'function') {
        return
      }

      if(this[PromiseStatus] === immediatelyStatus) {
        setTimeout(() => {
          handler(this[PromiseValue])
        }, 0)
      }else {
        //否则把处理函数加入resolve的消息队列
        queue.push(handler)
      }
    }

    then(thenable, catchable) {
      this[settleHandler](thenable, RESOLVED, this[thenables])
      this.catch(catchable)
    } 
    catch(catchable) {
     this[settleHandler](catchable, REJECTED, this[catchables])
    }
  }
})()