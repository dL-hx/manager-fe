function identity<T>(arg: T): T {
  return arg
}

identity<number>(1)

function identity2<K, V>(x:K, y:V):K {
    return x
}

identity2<number, number>(1,2)
identity2<string, boolean>('jack', true)


// Pick挑选类型
interface User{
    id: number;
    name: string;
    age: number
}

// 挑选User类型中的'name', 'age'组成新类型AgeType
type AgeType = Pick<User, 'name'|'age'>

const Jack:AgeType = {
    name: 'jack',
    age: 30
}

export default {}