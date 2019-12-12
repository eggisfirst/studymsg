const MyPromise = (() => {
  const PENDDING = 'pendding',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
    PromiseValue = Symbol('PromiseValue'), //状态数据
    PromiseStatus = Symbol('PromiseStatus'),  //当前状态
    changeStatus = Symbol('changeStatus'),
    thenables = Symbol('thenables'),
    catchables = Symbol('catchables'),
    settleHandler = Symbol('settleHandler') //后续处理函数

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

    then(thenable, catchable) {
      this[settleHandler](thenable, RESOLVED, this[thenables])
      // if (this[PromiseStatus] === RESOLVED) {
      //   setTimeout(() => {
      //     thenable(this[PromiseValue])
      //   }, 0);
      // }
      // else {
      //   this[thenables].push(thenable)
      // }
      this.catch(catchable)
    }

    catch(catchable) {
      this[settleHandler](catchable, REJECTED, this[catchables])
      // if (this[PromiseStatus] === REJECTED) {
      //   setTimeout(() => {
      //     catchable(this[PromiseValue])
      //   }, 0);
      // }
      // else {
      //   this[catchables].push(catchable)
      // }
    }

  }
})()

