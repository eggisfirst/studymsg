const MyPromise = (() => {
  const PENDDING = 'pendding',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
    PromiseValue = Symbol('PromiseValue'), //状态数据
    PromiseStatus = Symbol('PromiseStatus'),  //当前状态
    changeStatus = Symbol('changeStatus'),
    thenables = Symbol('thenables'),
    catchables = Symbol('catchables'),
    settleHandler = Symbol('settleHandler'), //后续处理函数
    linkPromise = Symbol('linkPromise') //创建一个串联的promise

  return class MyPromise {
    /** 从未决状态到已决状态改变的函数
     * @param {*} newStatus 新的状态
     * @param {*} newValue  传递的数据
     *  @param {*} queue 执行函数的事件队列
     */
    [changeStatus](newStatus, newValue, queue) {
      if (this[PromiseStatus] !== PENDDING) {
        return
      }
      this[PromiseStatus] = newStatus
      this[PromiseValue] = newValue
      queue.forEach(handler => handler(newValue));
    }


    /**
     * 
     * @param {*} executor 未决阶段(pendding)下的处理函数
     */
    constructor(executor) {
      this[PromiseStatus] = PENDDING
      this[PromiseValue] = undefined
      this[thenables] = []
      this[catchables] = []

      const resolve = (data) => { //2
        this[changeStatus](RESOLVED, data, this[thenables])
      }

      const reject = (err) => { //2
        this[changeStatus](REJECTED, err, this[catchables])
      }

      try {
        executor(resolve, reject)  //1
      }
      catch (err) {
        reject(err)
      }

    }

    /**
     * 后续处理函数
     * @param {*} handler 处理函数
     * @param {*} immediatelyStatus 需要立即执行的状态
     * @param {*} queue 作业队列
     */
    [settleHandler](handler, immediatelyStatus, queue) {
      if(typeof handler !== 'function') {
        return
      }

      if (this[PromiseStatus] === immediatelyStatus) {
        setTimeout(() => {
          handler(this[PromiseValue])
        }, 0);
      }
      else {
        queue.push(handler);
      }
    }


    [linkPromise](thenable, catchable) {
      function exec(data, handler, resolve, reject) {
        console.log(1,handler);
        try {
          const result = handler(data)  //得到前一个promise的返回值
          if(result instanceof MyPromise) {  //如果返回的是一个promise
            result.then(res => {          //等该promise完成
              resolve(res)
            },err => {
              reject(err)
            })
          }
          else {
            resolve(result)
          }
        } catch (error) {
          console.log(2,handler);
          reject(error)
        }
      }

      return new MyPromise((resolve, reject) => {
        this[settleHandler](data => {
          exec(data, thenable, resolve, reject)
        }, RESOLVED, this[thenables])

        this[settleHandler](reason => {
          exec(reason, catchable, resolve, reject)
        }, RESOLVED, this[catchables])

      })
    }

    

    then(thenable, catchable) {
      // this[settleHandler](thenable, RESOLVED, this[thenables])
      // this.catch(catchable)
      return this[linkPromise](thenable,catchable)
    }

    catch(catchable) {
      // this[settleHandler](catchable, REJECTED, this[catchables])
      return this[linkPromise](undefined,catchable)
    }


    

  }
})()

