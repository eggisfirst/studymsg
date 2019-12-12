// import { classDescriptor, propDescriptor, printObj } from "./Descriptor";

// @classDescriptor('用户')

// class User {
//   @propDescriptor('账号')
//   loginId: string

//   @propDescriptor("密码")
//   loginPwd: string
// }

// const u = new User();

// printObj(u)
// import 'reflect-metadata'

// @Reflect.metadata("a","一个类")
// class A {
//   @Reflect.metadata("prop",'一个属性')
//   prop1:string
// }

// const a = new A()


// let result = Reflect.getMetadata('a',A) //类
// console.log(result)


// Reflect.getMetadata('prop',a,'prop1') //属性 （key,对象名称，属性名称）

// import 'reflect-metadata';
// import {IsNotEmpty, validate, MinLength, Max, MaxLength, Min} from 'class-validator'


// class RegUser {

//   @IsNotEmpty({message: "账号不能为空"}) //可以手动加验证消息
//   @MinLength(5,{message: "账号最少有5个字符"})
//   @MaxLength(15,{message: "账号最多有15个字符"})
//   loginId: string
//   loginPwd: string

//   @Min(0, {message: "年龄的最小值是0"})
//   @Max(100,{message: "年龄的最大值是100"})
//   age: number
//   gender: "男" | "女"
// }

// const post = new RegUser()

// validate(post).then(err => {
//   console.log(err)
// })

import axios from 'axios';
import 'reflect-metadata';
import {plainToClass, Type} from 'class-transformer'

class User {
  firstName: string
  lastName: string

  /**把接口传过来的字符串转换成数字，只有元数据参与运行，ts只在编译阶段 */
  @Type(() => Number) 
  age: number

  getName() {
    return this.firstName + "" + this.lastName
  }
}

axios.get('').then(resp => resp.data)
  .then((user: User[]) => {
    for (const u of user) {
      const us = plainToClass(User, u)
      console.log(us.getName())
    }
  })
