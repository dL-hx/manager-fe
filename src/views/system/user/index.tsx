import api from "@/api";
import { PageParams, User } from "@/types/api";
import { formatDate } from "@/utils";
import { Button, Form, Input, Select, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export default function UserList() {
    const [form] = Form.useForm();
    const [data, setData] = useState<User.UserItem[]>([])
    const [total, setTotal] = useState(0)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    })

    // 获取用户列表
    const getUserList = async (params: PageParams) => {
        const values = form.getFieldsValue()
        const data = await api.getUserList({
            ...values,
            pageNum: params.pageNum,
            pageSize: params.pageSize
        });
        const list = Array.from({ length: 50 })// 模拟数据
            .fill({})
            .map((item: any) => {
                item = { ...data.list[0] }
                item.userId = Math.random()
                return item
            })

        // setData(data.list)
        // setTotal(data.page.total)
        setData(list) // 模拟数据
        setTotal(list.length)// 模拟数据
        setPagination({
            current: data.page.pageNum,
            pageSize: data.page.pageSize,
        })
    }

    useEffect(() => {
        getUserList({
            pageNum: pagination.current,
            pageSize:  pagination.pageSize
        })
    }, [pagination.current, pagination.pageSize])

    // 搜索
    const handleSearch = ()=>{
        getUserList({
            pageNum: 1,
            pageSize: pagination.pageSize
        })
    }

    // 重置表单
    const handleReset = ()=>{
        form.resetFields()
    }
    // const dataSource = [
    //   {
    //     _id: '',
    //     userId: 0,
    //     userName:'',
    //     userEmail: '',
    //     deptId: '',
    //     state: 0,
    //     mobile: '',
    //     job: '',
    //     role: 0,
    //     roleList: '',
    //     createId: 0,
    //     deptName: '',
    //     userImg: '',
    //   }
    // ];


    // https://ant-design.antgroup.com/components/table-cn
    const columns: ColumnsType<User.UserItem> = [
        {
            title: '用户ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: '用户名称',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: '用户邮箱',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: '用户角色',
            dataIndex: 'role',
            key: 'role',
            render(role: number) {
                return {
                    0: '超级管理员',
                    1: '管理员',
                    2: '体验管理员',
                    3: '普通用户'
                }[role]
            }
        },
        {
            title: '用户状态',
            dataIndex: 'state',
            key: 'state',
            render(state: number) {
                return {
                    1: '在职',
                    2: '试用期',
                    3: '离职',
                }[state]
            }
        },
        {
            title: '注册时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render(createTime: string) {
                return formatDate(createTime)
            }
        },
        {
            title: '操作',
            render(record, values) {
                return <Space>
                    <Button type="text">编辑</Button>
                    <Button type="text" danger>删除</Button>
                </Space>
            }
        },
    ];
    return <div className="user-list">
        <div className="search-form">
            <Form
                layout="inline"
                form={form}
                initialValues={{ state: 0 }}
            >
                <Form.Item name="userId" label="用户ID">
                    <Input placeholder="请输入用户ID" />
                </Form.Item>

                <Form.Item name="userName" label="用户名称">
                    <Input placeholder="请输入用户名称" />
                </Form.Item>


                <Form.Item name="state" label="状态">
                    <Select style={{ width: 120 }}>
                        <Select.Option value={0}>所有</Select.Option>
                        <Select.Option value={1}>在职</Select.Option>
                        <Select.Option value={2}>离职</Select.Option>
                        <Select.Option value={3}>试用期</Select.Option>
                    </Select>
                </Form.Item>


                <Form.Item>
                    <Space>
                        <Button type="primary" onClick={handleSearch}>搜索</Button>
                        <Button type="default" onClick={handleReset}>重置</Button>
                    </Space>

                </Form.Item>
            </Form>
        </div>
        <div className="base-table">
            <div className="header-wrapper">
                <div className="title">用户列表</div>
                <div className="action">
                    <Button type="primary">新增</Button>
                    <Button type="primary" danger>批量删除</Button>
                </div>
            </div>
            <Table
                bordered
                pagination={{
                    position:['bottomRight'],
                    current: pagination.current,
                    pageSize:pagination.pageSize,
                    total,
                    showQuickJumper: true,
                    showSizeChanger:true, // 控制分页器一直有，如果不设置，那么只有total>50时，展示分页器
                    showTotal:(total)=>`总共${total}条`,
                    onChange:(page, pageSize)=>{
                        setPagination({
                            current: page,
                            pageSize: pageSize
                        })
                    }
                }}
                rowKey='userId'
                rowSelection={{
                    type: 'checkbox'
                }}
                dataSource={data}
                columns={columns}
            />
        </div>
    </div>
}