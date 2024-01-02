// keyof 获取键值
interface User{
  id: number
  name: string
  age: number
}
type Keys = keyof User // keyof 获取键值,生成新类型Keys,赋值给k1
const k1:Keys = 'age'


// typeof
// 获取对象类型
const user = {name: 'jack', age: 30}
type User1 = typeof user; // 推断出user对象的类型
// 赋值给新对象定义
const u1:User1 = {name: 'u1', age: 20}


// in
// 使原来的任意类型的key,现在只能在指定范围内选

interface User2{
  [k: string]: any
}
// User2,   类型key为string对象,值为任意值

// 使原来的任意类型的key,现在只能在指定范围内选
type User3 = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [k in Keys]:any
}
/* 
type User3 = {
    id: any;
    name: any;
    age: any;
}
*/
const tom:User3 = {
  id: 1,
  name: 'jack',
  age: 30,
}

export default {}
