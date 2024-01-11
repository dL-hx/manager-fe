import { Button } from "antd";
import { useState, useEffect } from "react";
import Tree from "./Tree";
export default function TreeMenu() {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch('/citydata.json').then(res => res.json()).then(res => {
            setData(recursionAddProps(res))
        })
    }, [])

    // 当数据请求过来后,我们要递归式给每一个数据加一个属性,用来控制是否展开功能
    const recursionAddProps = (data) => {
        // 在item 上加一个属性
        // show: true 则展开,  false 折叠
        return data.map((item) => {
            item.show = false
            // 递归式自己调用自己
            if (item.children) {
                recursionAddProps(item.children)
            }
            return item
        })
    }

    /**
     * 
     * @param data 源数据
     * @param id 点击的id选项
     * @returns 
     */
    const recursionEditProps = (data, id) => {
        // 在item 上加一个属性
        // show: true 则展开,  false 折叠
        return data.map((item) => {
            if (item.value === id) { // 判断条件: 找到对应id在取反
                item.show = !item.show // 取反
            } 
            // 递归式自己调用自己
            if (item.children) {
                recursionEditProps(item.children, id)
            }
            return item
        })
    }

    // 获取到子组件传递过来的数据
    const setShow = (child) => {
        // item.show = true
        // const newData = data.map((item) => {
        //     if (item['value'] === child.value) {
        //         // @ts-ignore
        //         item['show'] = !child.show
        //     }
        //     return item
        // })
        // setData(newData)

        // 需要递归处理这个show展开 
        // console.log(recursionEditProps(data, child.value));
        // 通过item-id,把数据中的show 改为true
        setData(recursionEditProps(data, child.value))
    }
    return <div>
        <Tree data={data} setShow={setShow}></Tree>
    </div>
}