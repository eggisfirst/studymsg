type constructor = new(...args: any[]) => object

// function test(target: new (...args:any[]) => object) {  //可以有任意个参数

// }

// @test
// class B {
//   constructor(public b: string) {

//   }
// }

// function d1(target: constructor) {
//   console.log('d1')
// }
// function d2(target: constructor) {
//   console.log("d2")
// }
// @d1
// @d2
// class A {
//   props1: string
// }

// function d(target:any, key: string) {
//   console.log(target,key)
//   if(target.__props) {
//     target.__props = []
//   }
//   target.__props.push(key)
// }

// class A {
//   @d
//   prop1: string

//   @d
//   static prop2: string
// }

// console.log((A.prototype as any).__props)

function d() {
  return function (target: any, key: string,descriptor: PropertyDescriptor) {
    console.log(target, key, descriptor)

    descriptor.enumerable = true
    descriptor.value = function() {
      console.log('方法已过期')
    }
  }
}

class A {

  @d()
  method1() {

  }
}

const a = new A ()
a.method1()