// 数组类型的定义
const list1: number[] = [1, 2, 3]

const list2: Array<number> = [1, 2, 3]

const list3: [number, string, boolean] = [1, '2', true]

const list4: [{ name: string; age: number }] = [{ name: 'jack', age: 30 }]

const list5: Array<{ name: string; age: number }> = [{ name: 'jack', age: 30 }]

interface User {
  name: string
  age: number
}

const list6: Array<User> = [{ name: 'jack', age: 30 }]

// 函数类型的定义
// :在函数括号后加冒号
// 变量类型定义:在变量后加冒号

function add1(a: number, b: number): number {
  return a + b
}

function add2(a: number, b: number): void {
  console.log(a + b)
}

// 定义报错用unkown
function add3(a: number, b: number): unknown {
  throw new Error('Error')
}

// 箭头函数两种定义
// (括号后面加冒号)
const add4 = (a: number, b: number): number => {
  return a + b
}

// (变量后加冒号)
const add5:(a: number, b: number) => number = (a: number, b: number) => {
  return a + b
}

export default {}
