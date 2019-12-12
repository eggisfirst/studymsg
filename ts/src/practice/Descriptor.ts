import 'reflect-metadata'

// const key = 'descriptor'
const key = Symbol.for('descriptor') //唯一的数据

export  function classDescriptor(description: string) {
  return Reflect.getMetadata(key,description)
  // function(target: any) {
  //   /**保存到该类的原型中 */
  //   target.prototype.$classDsecription = description
  // }
}
//合并

export function propDescriptor(description: string) {
  return Reflect.getMetadata(key,description)
  // function (target: any, propName: string) {
  //   /**把所有的属性信息保存到该类的原型中 */
  //   if(!target.$propDescriptions) {
  //     target.$propDescriptions = []
  //   }
  //   target.$propDescriptions.push({
  //     propName,
  //     description
  //   })
  // }
}

export function printObj(obj: any) {
  /**输出类的名字 */
  // if(obj.$classDsecription) {
  //   console.log(obj.$classDsecription)
  // }else {
  //   console.log(obj.__proto__.constructor.name)
  // }
  const cons = Object.getPrototypeOf(obj)
  if(Reflect.hasMetadata(key,obj)) {
    console.log(Reflect.getMetadata(key,obj))
  }else {
    console.log(cons.constructor.name)
  }


  /**输出类的属性值 */
  // if(!obj.$propDescriptions) {
  //   obj.$propDescriptions = []
  // }

  /**输出所有的属性描述和属性值 */
  // for (const key in obj) {
  //   if (obj.hasOwnProperty(key)) {
  //     const prop = obj.$propDescriptions.find((p: any) => p.propName === key)
  //      if(prop) {
  //        console.log(`\t${prop.description}:${prop.obj[key]}`)
  //      }
  //      else {
  //       console.log(`\t${key}:${prop.obj[key]}`)
  //      }
  //   }
  // }

  for (const k in obj) {
    if(Reflect.hasMetadata(key, obj, k)) {
      console.log(`\t${Reflect.getMetadata(key, obj, k)}:${obj[k]}` )
    }
    else {
      console.log(`\t${k}:${obj[k]}`)
    }
  }
}