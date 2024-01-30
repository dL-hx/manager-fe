import { User } from '@/views/system/user'
import qs from 'qs'
export default {
  getUserList(params: User.Params) {
    // mock
    console.log('userList请求参数')
    console.log(qs.stringify(params))
    if (params.pageNum > 1) {
      return fetch('/system/userEmpty.json?' + qs.stringify(params))
        .then(res => res.json())
        .then(res => {
          return {
            ...res.data,
            data: {
              page: {
                pageNum: params.pageNum,
                pageSize: params.pageSize,
                total: 0
              },
              list: [{}]
            }
          }
        })
    } else {
      return fetch('/system/user.json?' + qs.stringify(params))
        .then(res => res.json())
        .then(res => res.data)
    }
  }
}
