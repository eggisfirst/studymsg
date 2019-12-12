const instance = axios.create({
  baseUrl: "/",
  timeout: 300000,
  headers: {
    'Content-Type': "application/json",
    'X-Requested-With': 'XMLHttpRequest'
  }
})

function getToken() {
  let tokenObj = {}
  try {
    tokenObj = storage.get('token')
    tokenObj = tokenObj ? JSON.parse(tokenObj) : {}
  } catch {
    console.error('get token from localStorage error')
  }
  return tokenObj
}

function refreshToken() {
  return instance.post('/oauth/token').then(res => res.data)
}

instance.setToken = (obj) => {
  instance.defaults.headers['Authorization'] = `Bearer ${obj.token}`
  window.localStorage.setItem('token', JSON.stringify(obj))
}

let isRefreshing = false
let requests = []

instance.interceptors.request.use(config => {
  const tokenObj = getToken()
  config.headers['Authorization'] = `Bearer ${tokenObj.token}`
  if (config.url.indexOf('/oauth/token') >= 0 ||
    config.url.indexOf('/login') >= 0) {
      return config
  }
  if(tokenObj.token && tokenObj.tokenExpireTime) {
    const now = Date.now()
    if(now >= tokenObj.tokenExpireTime) {
      //刷新token
      if(!isRefreshing) {
        isRefreshing = true
        refreshToken().then(res => {
          const {access_token, expires_in} = res.data
          const tokenExpireTime = now + expires_in * 1000
          instance.setToken({access_token, tokenExpireTime})
          isRefreshing = false
          return access_token
        }).then(token => {
          requests.forEach(cb => cb(token))
          requests = []
        }).catch(err => {
          console.log('refresh token err',err);
        })
      }
      const retryOriginalRequest = new Promise(resolve => {
        requests.push(token => {
          config.headers['Authorization'] = token
          resolve(config)
        })
      })
      return retryOriginalRequest
    }
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.ues(response => {
  const {code} = response.data
  if(code === 11) {
    //跳转登录页
  }
  return response
},err => {
  return Promise.reject(err)
})

export default instance

