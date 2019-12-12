const MyPromise = (() => {
  const PENDING = 'pending',    //状态设置为常量
        RESOLVED = 'resolved',
        REJECTED = 'rejected',
        PromiseValue = Symbol('PromiseValue'), //状态数据
        PromiseStatus = Symbol('PromiseStatus'), //当前状态
        changeStatus = Symbol('changeStatus'), //改变状态
        thenables = Symbol('thenables'), //resolve的消息队列
        catchables = Symbol('catchables'), //rejecte的消息队列
        settleHandler = Symbol('settleHandler'), //后续处理通用函数
        linkPromise = Symbol('linkPromise')  //串联时候创建一个新的Promise

  return class MyPromise {
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
      this[thenables] = []
      this[catchables] = []

      const resolve = data => {  
        this[changeStatus](RESOLVED, data, this[thenables]) 
      }
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

    //当then返回一个promise时
    //返回的promise的状态和状态数据都是由之前的promise决定的，所以要从之前的处理函数中得到状态数据,所以then中的处理函数要放到这个函数中执行
    [linkPromise](thenable, catchable) {
      //提起公共函数
      function exec(data, handler, resolve, reject) {
         try{
           //如果得到的result是一个promise
            const result = handler(data) 
            if(result instanceof MyPromise) {
              //则执行这个promise
              result.then(res => {
                //得到结果后一样执行resolve
                resolve(res)       
              },err => {
                reject(err)
              })
            }else {
              resolve(result)
            }   
          }
          catch(err) {                     
            reject(err)
          }
      }
      return new MyPromise((resolve, reject) => {
        // this[settleHandler](thenable, RESOLVED, this[thenables])
        //返回的状态数据由thenable的返回值决定，所以要拿到thenable的返回值
        this[settleHandler](data => {       //相当于把thenable展开
          exec(data, thenable, resolve, reject)         
        }, RESOLVED, this[thenables])

         this[settleHandler](reason => {     
           exec(reason, catchable, resolve, reject)    
        }, REJECTED, this[catchables])
      })
    }

    then(thenable, catchable) {
      return this[linkPromise](thenable, catchable)
    } 
    catch(catchable) {
      return this[linkPromise](undefined, catchable)
    }

    static resolve(data) {
      if(typeof data === MyPromise) {
        return data
      }else {
        return new MyPromise((resolve, reject) => {
          resolve(data)
        })
      }
    }
    static reject(reason) {
      return new MyPromise((resolve, reject) => {
        reject(reason)
      })
    }

    static all(proms) {
      return new MyPromise((resolve, reject) => {
        //先把proms映射成一个新的数组，包含每一个promise的结果和是否到达resolve状态
        const results = proms.map(p => {
          const obj = {
            result: undefined,    //初始
            isResolved: false
          }
          //什么时候改变状态呢？ 当执行then的时候
          p.then(res => {
            obj.result = res;
            obj.isResolved = true
            //什么全部promise都执行完呢，当数组里面的isResolved全部改成true的时候
            //把results里面isResolved为false的放入一个新的数组
            const hasUnResolved = results.filter(it => !it.isResolved)
            if(hasUnResolved.length === 0) {
              //全部完成。可以resolve结果出去。把results重新映射成只有result结果的数组。
              resolve(results.map(it => it.result))
            }
          },err => {
            //如果有一个失败，则直接reject
            reject(err)
          })
          return obj
        })
      })
    }
    static race(proms) {
      return new MyPromise((resolve, reject) => {
        //遍历proms，只要有一个状态到达resolve则resolve结果
        proms.forEach(result => {
          result.then(res => {
            resolve(res)
          },err => {
            reject(err)
          })
        })
      })
    }
  }
})()