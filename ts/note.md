#如何进行类型约束
在变量、函数的参数、函数的返回值位置上加上  '':''

#如何区分数字字符串和数字
如果按照数字的方式朗读，则为数字

#基本类型
- number
- string
- boolean
- number[] / Array<number>
- object
- null undefined    是其他类型的子类型。可以赋值给其他类型
通过 strictNullChecks 获得更加严格的类型约束,使null 和 undefined 不能赋值给其他类型

string|undefined

#其他常用类型约束
- 联合类型： 多种类型任选其一

配合类型保护进行判断

类型保护： 当对某个变量进行类型判断之后，再判断的语句块中便可以确定它的确切类型
typeof  -->只能触发简单类型

- void 类型： 通常用于约束函数的返回值，表示该函数没有任何返回

- never类型： 通常用于约束函数的返回值，表示永远不会结束的函数

- 字面量类型：使用一个值进行约束（数组、对象、字符串都可以）

- 元祖类型（tuple）：一个固定长度的数组，并且数组每一项的类型确定

- any 类型： 可以绕过类型检查。any类型的数据可以赋值给任意类型

#类型别名

对已知的一些类型定义名称

type 类型名 = xx   type gender = "男" : "女"  
使用： function getUsers(g:gender) {}   gerUsers()  里面只能传男或女

#函数的相关约束

- 函数重载： 在函数实现之前，对函数调用的多种情况进行声明
function combine(a:string,b:string): string;

- 可选参数   a? :number，表示a参数可以不用传递。

#扩展类型-枚举

> 扩展类型： 类型别名、枚举、借口、类

枚举通常用于约束某个变量的取值范围

字面量和联合类型配合使用，也可以达到同样的目标

#字面量类型的问题

- 在类型约束位置会产生重复代码，可以使用类型别名解决

- 逻辑含义和真实的值产生了混淆，会导致当修改真实值的时候,产生大量修改。

- 字面量类型不会进入编译结果

# 枚举（解决以上问题） 只要有取值范围

如何定义一个枚举： enum 枚举名{
                  枚举字段1 = xx，
                  枚举字段2 = xx
                }
枚举会出现在编译结果中，表现为对象。

枚举的规则：

- 枚举的字段值只能使用字符串或者数字
- 数字枚举的值会自动自增
- 被数字枚举约束的变量，可以直接赋值为数字  --不建议
- 数字枚举的编译结果和字符串枚举有差异

最佳实践：
- 尽量不要再一个枚举中既出现字符串字段，又出现数字字段
- 使用枚举时，尽量使用枚举字段的名称，不使用真实值

#扩展知识： 位枚举（枚举的位运算）  |  &




