import request from "@/utils/request";
import { Button } from "antd";
import { useEffect } from "react";

export default function Welcome(){
    useEffect(()=>{
        request.get('/users/loading', {})
        request.get('/users/loading', {})
        request.get('/users/loading', {})
    },[])
    const handleClick = ()=>{
        request.get('/users', {
            id: 12345
        })
       .then(res => {
           console.log('res:', res);
       })
       .catch((error) => {
           console.log('error:', error);
       })
    }
    return <div className='welcome'>
        <p>Welcome</p>
        <p>
            <Button onClick={handleClick}>点击事件</Button>
        </p>
    </div>
}