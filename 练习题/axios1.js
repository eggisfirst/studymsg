import axios from 'axios'

// 从localStorage中获取token，token存的是object信息，有tokenExpireTime和token两个字段
function getToken () {
  let tokenObj = {}
  try {
    tokenObj = storage.get('token')
    tokenObj = tokenObj ? JSON.parse(tokenObj) : {}
  } catch {
    console.error('get token from localStorage error')
  }
  return tokenObj
}

function refreshToken () {
    // instance是当前request.js中已创建的axios实例
    return instance.post('/refreshtoken').then(res => res.data)
}

// 给实例添加一个setToken方法，用于登录后方便将最新token动态添加到header，同时将token保存在localStorage中
instance.setToken = (obj) => {
  instance.defaults.headers['X-Token'] = obj.token
  window.localStorage.setItem('token', JSON.stringify(obj)) // 注意这里需要变成字符串后才能放到localStorage中
}

instance.interceptors.request.use((config) => {
  const tokenObj = getToken()
  // 添加请求头
  config.headers['X-Token'] = tokenObj.token
  // 登录接口和刷新token接口绕过
  if (config.url.indexOf('/rereshToken') >= 0 || config.url.indexOf('/login') >= 0) {
    return config
  }
  if (tokenObj.token && tokenObj.tokenExpireTime) {
    const now = Date.now()
    if (now >= tokenObj.tokenExpireTime) {
      // 立即刷新token
      if (!isRefreshing) {
        console.log('刷新token ing')
        isRefreshing = true
        refreshToken().then(res => {
          const { token, tokenExprieIn } = res.data
          const tokenExpireTime = now + tokenExprieIn * 1000
          instance.setToken({ token, tokenExpireTime })
          isRefreshing = false
          return token
        }).then((token) => {
          console.log('刷新token成功，执行队列')
          requests.forEach(cb => cb(token))
          // 执行完成后，清空队列
          requests = []
        }).catch(res => {
          console.error('refresh token error: ', res)
        })
      }
      const retryOriginalRequest = new Promise((resolve) => {
        requests.push((token) => {
          // 因为config中的token是旧的，所以刷新token后要将新token传进来
          config.headers['X-Token'] = token
          resolve(config)
        })
      })
      return retryOriginalRequest
    }
  }
  return config
}, (error) => {
  // Do something with request error
  return Promise.reject(error)
})

// 请求返回后拦截
instance.interceptors.response.use(response => {
  const { code } = response.data
  if (code === 1234) {
    // token过期了，直接跳转到登录页 
    window.location.href = '/'
  }
  return response
}, error => {
  console.log('catch', error)
  return Promise.reject(error)
})

export default instance