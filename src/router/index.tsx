import { Navigate, createHashRouter, createBrowserRouter } from 'react-router-dom'
import Login from '@/views/Login'
import Welcome from '@/views/Welcome'
import Error403 from '@/views/403'
import Error404 from '@/views/404'

export const router = [
    {
        path: '/',
        element: <Welcome />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '*',// 匹配路由不到路由, 跳转404. 用Navigate组件重定向到404
        element: <Navigate to='/404' />
    },
    {
        path: '/404',
        element: <Error404 />
    },
    {
        path: '/403',
        element: <Error403 />
    },
]
export default createBrowserRouter(router)