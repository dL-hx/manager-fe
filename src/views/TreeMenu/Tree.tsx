import Tree from './Tree'

export default ({ data, show=true, setShow }: any) => {
    console.log(data);

    return <ul style={{display: show? 'block': 'none'}}>
        {
            Array.isArray(data) && data.length && data.map(item => {
                return <li key={item.value} onClick={(event)=>{
                    // 清除冒泡
                    event.stopPropagation()
                    setShow(item)
                }}>
                    {item.value}
                    {/* 递归组件 */}
                    {
                        item.children && item.children.length && <Tree data={item.children} show={item.show} setShow={setShow}/>
                    }
                </li>
            })
        }
    </ul>
}