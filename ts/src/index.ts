// import { sum } from "./myModule";
// import { type } from "os";

// import { printDeck, createCard } from './funcs';
// import { Deck } from './deck';

// const deck = new Deck()
// deck.shuffle()  
// deck.print()
// console.log('=======1111')
// const result = deck.publish()
// result.player1.print()
// console.log('=======2222')

// result.player2.print()
// console.log('=======3333')

// result.player3.print()
// console.log('=======444')

// result.left.print()


// printDeck(createCard())

// let say:string = "hello"
// let num:number = 123

// console.log("addsds")


// function add(a: number, b: number) {    //返回值
//   return a + b
// }

// let num1 = add(2,1)

// let mum: string | undefined = undefined

// function add1(a:number,b?:number) {}

// add1(1)

// let nums: (number | string)[] = ['1', '2', 3]
// let aa: Array<number>
// let bb: number[]
// type obj = {
//   name: 'guang' | 'wei',
//   age: 26 | 27,
//   height: number
// }

// let guang: obj = {
//   name: 'guang',
//   age: 26,
//   height: 170
// } 




// console.log(1111)
// enum Gender {
//   male =  'nan',
//   female = "nv"
// }

// let gender:Gender;

// gender = Gender.male
// gender = Gender.female

// function printGender() {
//   const vals = Object.values(Gender)
//   console.log(vals)
// }

// printGender()

// enum Level {
//   level1 = 1,
//   level2,
//   level3
// }

// let l:Level = Level.level2
// console.log(l)

// console.log(sum(2,3))

// interface User {
//   name: string
//   age: number
//   sayHi: () => void
//   readonly id:readonly string[]
// }
//前面一个代表不能给这个数组重新赋值（可以使用push），后面表示不能改变这个数组

// let u: User = {
//   id: ['12'],
//   name: 'sa',
//   age: 22,
//   sayHi: function() {
//     return 112
//   }
// }
// u.id = 11
// interface b extends User {
//   name: '123'
// }

// let arr: ReadonlyArray<number> = [1,2]
// let arr: readonly number[] = [1,2]

// interface Duck {
//   sound: 'aa'
//   swim(): void
// }

// let person = {
//   name: 'AA',
//   age: 12,
//   sound: 'aa' as 'aa',
//   swim () {
//     console.log(222)
//   }
// }

// let duck: Duck = person;  
//duck使用的时候只能有sound和swim属性。其他变量赋值的时候如果类型兼容，赋值成功。
//返回的这个对象里面有很多属性，我们只约束我们需要的，如果兼容，则是我们需要的。
// console.log(duck)


// class User {
//   age: number 
//   pid?: string
//   readonly id: number

//   private publishNumber: number = 3 
//   private curNumber: number = 0

//   constructor(public name: string, age: number) {  //public语法糖
//     this.age = age
//     this.id = Math.random()
//   }

//   publish(title: string) {
//     if(this.curNumber < this.publishNumber) {
//       console.log(title)
//       this.curNumber ++
//     }
//     else {
//       console.log('no')
//     }
//   }
// }

// const u = new User("xx",12)
// u.pid = 'asd'
// u.publish('1111')
// u.publish('123')
// u.publish('123')
// u.publish('123')
// u.publish('123')


// u.publishNumber = 10
// console.log(u)

// function take<T = number> (arr: T[], n: number): T[] {
//   if(n >= arr.length) {
//     return arr
//   }
//   const newArr: T[] = [];
//   for(let i = 0; i < n; i++) {
//     newArr.push(arr[i])
//   }
//   return newArr;
// }

// const newArr = take<number>([2,3],2)
// newArr.forEach(it => it)

// type callback<T> = (n: T, i: number) => boolean;

// function filter<T> (arr: T[], callback:callback <T>) 

