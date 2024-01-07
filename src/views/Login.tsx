// import axios from 'axios'
import request from '@/utils/request'
import { useEffect } from 'react'

export default function Login() {
    useEffect(() => {
        request.get<string>('/users', {
            id: 12345
        })
       .then(res => {
           console.log('res:', res);
       })
       .catch((error) => {
           console.log('error:', error);
       })

        // axios.post('/users',{
        //         id: 12345
        // }).then(res=>{
        //     console.log('res:',res);
        // }).catch((error)=>{
        //     console.log('error:',error);
        // })
    }, [])
    return <div>Login</div>
}