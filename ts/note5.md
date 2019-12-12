##声明文件

1. 什么是声明文件

以.d.ts结尾的文件就是声明文件

2. 有什么作用

为js代码提供类型声明

3. 声明文件的位置

- 放置到tsconfig.json配置包含（iniclude: []）的目录中

- 放置到node_modules/@types文件夹中

- 手动配置 "typeRoots" : ["./types"]

- 与js代码所在目录相同