1. 设置禁止缩放
``<meta name="viewport" content="width=device-width,initial-scale=1,minimun=scale=1,maximum-scale=1,user-scalable=no">``

2. meta标签

- 禁止拨打手机/跳转邮箱
``<meta name="format-detection" content="telephone=no,email=no" >``

- 设置web-app的标题
``<meta name="apple-mobile-web-app-title" content="123">``
- 设置web-app的图标
``<link rel="apple-touch-icon-precomposed" href="images/logo.png">``

3. 移动端连接本地并且热更新：vscode 安装live Server 
ifconfig： 192.168.3.105 找到本机ip。链接ip换成本机ip

4. 样式重置
禁止用户长按选中文字： ``-webkit-user-select: none`

禁止长按弹出系统菜单： ``-webkit-touch-callout: none``

去除android下a/button/input标签被点击时产生的边框
去除ios下a标签被点击时产生的半透明灰色背景： ``-webkit-tab-highlight-color: rgba(0,0,0,0)``

切换横竖屏或者用户自己通过浏览器设置的话，可以改变字体大小： ``-webkit-text-size-adjust: 100%``

按钮在ios下都是圆角： ``webkit-appearance: none; border-radius: 0`` 

修改placeholder的样式
input::-webkit-input-placeholder {
  color:#000 //默认样式
}
input: focus::-webkit-input-placeholder {
  color: #fff //点击后的样式
}

默认字体： font-family: helvetica



body {
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: 100%
}
a,input,button {
  -webkit-tab-highlight-color: rgba(0,0,0,0)
}
button,input {
  webkit-appearance: none; 
  border-radius: 0
}