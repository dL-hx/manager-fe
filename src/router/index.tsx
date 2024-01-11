import { Navigate, createHashRouter, createBrowserRouter, useRoutes } from 'react-router-dom'
import Login from '@/views/Login'
import Welcome from '@/views/Welcome'
import Error403 from '@/views/403'
import Error404 from '@/views/404'
import TreeMenu from '@/views/TreeMenu'

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
        path: '/tree',
        element: <TreeMenu />
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

// API路由
// export default createBrowserRouter(router)

// 组件路由
export default function Router(){
    return useRoutes(router)
}