// 接口.ts
// 1. 定义接口
interface Person {
  name: string
  age: number
}

const jack: Person = {
  name: 'jack',
  age: 30
}

const tom: Person = {
  name: 'jack',
  age: 30
}

// 2. readonly定义的字段不可修改
// ? 问号字段表示 接口字段可选
interface P {
  readonly name: string
  age?: number
}

const lily: P = {
  name: 'lily'
}

// readonly定义的字段不可修改 (报错)
// lily.name = 'Tom'

// 3. 定义任意字段的动态接口
// >可接收任意字段
// 注意: 任意字段的接口值,应包含父接口的所有类型
interface T {
  name: string
  age: number
  // 定义动态字段
  [k: string]: string | number
  // 或者
  // [k: string]: any
}
const a: T = {
  name: 'jack',
  age: 30,
  id: 1,
  gender: 'male',
  edu: '本科'
}

// 4. 函数类型接口定义
interface Sum{
    (x: number, y: number) : number
}
const add:Sum = (x, y) => {
  return x + y
}

// 或者

type Sum1 =  (x: number, y: number) => number

const add1:Sum1 = (x, y) => {
    return x + y
}



// 5. 接口继承与type类型模拟继承
// > 接口可以继承，type不可以继承，但是可以使用联合类型和交叉类型来模拟继承。

interface User{
    id: number;
    name: string;
}

interface Person extends User{
    age: number
}

const zee: Person = {
    name: "zee",
    age: 30,
    id: 1
}

// 表示并集,取范围最大的
type Person1 = User & {age : number}

const foo: Person1 = {
    name: "foo",
    age: 30,
    id: 1
}

type U1 = { id: number; name: string }

// 表示或的关系
type Person2 = { age: number } | U1
const tim1: Person2 = {
    id: 1,
    name: 'tim',
    age: 30
}

export default {}
