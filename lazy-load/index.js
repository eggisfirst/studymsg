function lazyLoadImg(dafultImg) {
  //获取所有需要懒加载的图片
  var imgs = document.querySelectorAll('img[data-src]')
  //伪数组转成真实的数组
  imgs = Array.from(imgs)

  _loadDefaultImg()

  _LoadImgs()

  var timer = null;
  //防抖，优化滚动事件
  function onchange () {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      _LoadImgs()
    }, 500);
  }


  // window.addEventListener('scroll',function() {
  // })
  document.body.onscroll = function() {
    onchange()
  }
  window.onresize = function(){
    onchange();
  }

  //加载默认图片
  function _loadDefaultImg() {
    if(!dafultImg) {
      return
    }
    for(var i = 0; i < imgs.length; i ++) {
      imgs[i].src = dafultImg
    }
  }
  //所有图片懒加载
  function _LoadImgs() {
    for(var i = 0; i < imgs.length; i ++) {
      var img = imgs[i]
      if(_LoadOneImg(img)) {
        i --;
      }
    }
  }
  //图片懒加载
  function _LoadOneImg(img) {
    //获取img元素的矩形小方块
    var rect = img.getBoundingClientRect()
    if(rect.bottom <= 0) {
      return false
    }
    if(rect.top > window.innerHeight) {
      return false
    }

    var index = imgs.lastIndexOf(img);
    imgs.splice(index, 1);
    img.src = img.dataset.src
    //小图换大图
    img.onload = function () {
      if(img.dataset.originsrc) {
        img.src = img.dataset.originsrc
        img.onload = null
      }
      
    }
    

    return true
  }
}


///a  kdt  cgf
//dkt  a  fcg
// a
//k   c
//d t   f g 