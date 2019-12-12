const MyPromise = (() => {
  const PENDDING = 'pendding',
    RESOLVED = 'resolved',
    REJECTED = 'rejected',
    PromiseValue = Symbol('PromiseValue'), //状态数据
    PromiseStatus = Symbol('PromiseStatus'),  //当前状态
    changeStatus = Symbol('changeStatus')

  return class MyPromise {
    /** 从未决状态到已决状态改变的函数
     * @param {*} newStatus 新的状态
     * @param {*} newValue  传递的数据
     */
    [changeStatus](newStatus, newValue) {
      if (this[PromiseStatus] !== PENDDING) {
        return
      }
      this[PromiseStatus] = newStatus
      this[PromiseValue] = newValue
    }


    /**
     * 
     * @param {*} executor 未决阶段(pendding)下的处理函数
     */
    constructor(executor) {
      this[PromiseStatus] = PENDDING
      this[PromiseValue] = undefined

      const resolve = (data) => { //2
        this[changeStatus](RESOLVED, data)
      }

      const reject = (err) => { //2
        this[changeStatus](REJECTED, err)
      }

      try {
        executor(resolve, reject)  //1
      } 
      catch (err) {
        reject(err)
      }

    }
  }
})()

