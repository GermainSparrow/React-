import { Alert, Breadcrumb, Form, Radio, Input, Button, Select, Divider, Table } from 'antd';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react'
import apis from '../utils/apis'
type LayoutType = Parameters<typeof Form>[0]['layout'];


export default function systemUser() {
    //页面加载时请求数据
    useEffect(function effect() {
        apis.user.getUser({
            pageSize: 10,
            pageNum: 1
        }).then((msg) => {
            console.log('getUser', msg);
          
            setData(msg.rows)
        })
    }, []);
    const [data, setData] = useState([])
    interface DataType {
        key: React.Key;
        username: string
        roleName: string;
        email: string;
        deptName: string;
        mobile: string;
        createTime: string;
        status: string,
        ssex: string

    }

    const columns: ColumnsType<DataType> = [
        {
            title: '用户名',
            dataIndex: 'username',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '部门',
            dataIndex: 'deptName',
        },
        {
            title: '性别',
            dataIndex: 'ssex'
        },
        {
            title: '电话',
            dataIndex: 'mobile',

        },
        {
            title: '状态',
            dataIndex: 'status'
        }
    ];


    // rowSelection object indicates the need for row selection
    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record: DataType) => ({
        //     disabled: record.name === 'Disabled User', // Column configuration not to be checked
        //     name: record.name,
        // }),
    };
    const { Option } = Select;
    const [form] = Form.useForm();
    const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

    const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
        setFormLayout(layout);
    };



    const buttonItemLayout =
        formLayout === 'horizontal'
            ? {
                wrapperCol: { span: 14, offset: 4 },
            }
            : null;

    return <div>
        <Breadcrumb style={{ margin: '10px 10px 10px 20px' }}>
            <Breadcrumb.Item>
                <a href="">首页</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>系统管理</Breadcrumb.Item>
            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
        </Breadcrumb>

        <Form

            layout={'inline'}
            form={form}
            initialValues={{ layout: formLayout }}
            onValuesChange={onFormLayoutChange}
        >
            <Form.Item label=" 用户名">
                <Input style={{ width: '416px', height: '32px' }} placeholder="input " />
            </Form.Item>
            <Form.Item label="部门">
                <Select style={{ width: '416px', height: '32px' }} placeholder="input " >
                    <Option value="male">开发部</Option>
                    <Option value="female">市场部</Option>
                    <Option value="other">人事部</Option>
                    <Option value="other">测试部</Option>
                </Select>
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button type="primary">Submit</Button>
            </Form.Item>
        </Form>
        {/* 表格 */}
        <Table
            rowSelection={{
                type: 'checkbox',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
        />
    </div>
}