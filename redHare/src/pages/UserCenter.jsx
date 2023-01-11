import React, { useState, useRef } from 'react'
import { InboxOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { mrbird, updateProfile,avatar } from '../apis/ums';
import {
    Button,
    Form,
    Col, DatePicker, Drawer, Input, Row, Select, Space, Radio, Modal
} from 'antd';
const { Option } = Select;
export default function UserCenter() {
    const imgs = [
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/default.jpg", avatar: "default.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/1d22f3e41d284f50b2c8fc32e0788698.jpeg", avatar: "1d22f3e41d284f50b2c8fc32e0788698.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/2dd7a2d09fa94bf8b5c52e5318868b4d9.jpg", avatar: "2dd7a2d09fa94bf8b5c52e5318868b4d9.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/2dd7a2d09fa94bf8b5c52e5318868b4df.jpg", avatar: "2dd7a2d09fa94bf8b5c52e5318868b4df.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/8f5b60ef00714a399ee544d331231820.jpeg", avatar: "8f5b60ef00714a399ee544d331231820.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/17e420c250804efe904a09a33796d5a10.jpg", avatar: "17e420c250804efe904a09a33796d5a10.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/17e420c250804efe904a09a33796d5a16.jpg", avatar: "17e420c250804efe904a09a33796d5a16.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/87d8194bc9834e9f8f0228e9e530beb1.jpeg", avatar: "87d8194bc9834e9f8f0228e9e530beb1.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/496b3ace787342f7954b7045b8b06804.jpeg", avatar: "496b3ace787342f7954b7045b8b06804.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/595ba7b05f2e485eb50565a50cb6cc3c.jpeg", avatar: "595ba7b05f2e485eb50565a50cb6cc3c.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/964e40b005724165b8cf772355796c8c.jpeg", avatar: "964e40b005724165b8cf772355796c8c.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/5997fedcc7bd4cffbd350b40d1b5b987.jpg", avatar: "5997fedcc7bd4cffbd350b40d1b5b987.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/5997fedcc7bd4cffbd350b40d1b5b9824.jpg", avatar: "5997fedcc7bd4cffbd350b40d1b5b9824.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/a3b10296862e40edb811418d64455d00.jpeg", avatar: "a3b10296862e40edb811418d64455d00.jpeg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/20180414165855.jpg", avatar: "20180414165855.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/20180414165936.jpg", avatar: "20180414165936.jpg" },
        { url: "http://xawn.f3322.net:8002/distremote/static/avatar/20180414165914.jpg", avatar: "20180414165914.jpg" },
    ];
    const [, setUp] = useState(0);
    const emailValue = useRef();
    const mobileValue = useRef();
    const descriptionValue = useRef();
    const [selValue, setSelValue] = useState('');
    let user = JSON.parse(localStorage.getItem('user'));
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    function selectValue(e) {
        // console.log(e);
        setSelValue(e)
    }
    const [value, setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value);
    };
    const onSubmit = () => {
        updateProfile({
            email: emailValue.current.input.value,
            mobile: mobileValue.current.input.value,
            ssex: (value || user.ssex),
            description: descriptionValue.current.resizableTextArea.textArea.value,
            userId: user.userId,
            deptId: selValue,
            roleId: user.roleId,
            status: user.status,
            username: user.username,
        }).then(() => {
            let a='';
            switch(selValue){
                case '1':
                    a='开发部';
                    break;
                case '4':
                    a='市场部'
                    break;
                case '5':
                    a='人事部'
                    break;
                case '6':
                    a='测试部'
                    break;
            }
            user.email=emailValue.current.input.value;
            user.mobile=mobileValue.current.input.value;
            user.ssex=(value || user.ssex);
            user.description=descriptionValue.current.resizableTextArea.textArea.value;
            user.deptName=(a || user.deptName)
            localStorage.user=JSON.stringify(user)
            setUp(c => c + 1)
        })
        setOpen(false);
    };
    function judgeSex(a) {
        if (a == '0') {
            return a = '男'
        } else if (a == '1') {
            return a = '女'
        } else {
            return a = '保密'
        }
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    function clickHead(a){
        avatar({
            username:user.username,
            avatar:a
        }).then(()=>{
            user.avatar=a
            localStorage.user=JSON.stringify(user)
            location.reload();
            setIsModalOpen(false);
        })
    }
    return (
        <div>
            <table style={{ border: '1px solid #aaa', width: '1012px', height: '305px', color: '#666' }}>
                <tbody>
                    <tr style={{ height: '54px', borderBottom: '1px solid #aaa', textAlign: 'right' }}>
                        <td style={{ paddingRight: '30px' }}>
                            <div style={{ cursor: 'pointer', color: '#1890ff' }} onClick={showDrawer}>编辑资料</div>
                            <Drawer
                                title="编辑资料"
                                width={720}
                                onClose={onClose}
                                open={open}
                                bodyStyle={{
                                    paddingBottom: 80,
                                }}
                                extra={
                                    <Space>
                                        <Button onClick={onClose}>取消</Button>
                                        <Button onClick={onSubmit} type="primary">
                                            提交
                                        </Button>
                                    </Space>
                                }
                            >
                                <Form layout="vertical"
                                    initialValues={{
                                        'email': user.email,
                                        'mobile': user.mobile,
                                        'deptName': user.deptName,
                                        'ssex': user.ssex,
                                        'description': user.description,
                                    }}
                                    hideRequiredMark>
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="email"
                                                label="邮箱"
                                            >
                                                <Input ref={emailValue} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={18}>
                                            <Form.Item
                                                name="mobile"
                                                label="手机"
                                            >
                                                <Input ref={mobileValue} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={18}>
                                            <Form.Item
                                                name="deptName"
                                                label="部门"
                                            >
                                                <Select onChange={selectValue}>
                                                    <Option value="1">开发部</Option>
                                                    <Option value="4">市场部</Option>
                                                    <Option value="5">人事部</Option>
                                                    <Option value="6">测试部</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                name="ssex"
                                                label="性别"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: '选择性别',
                                                    },
                                                ]}
                                            >
                                                <Radio.Group onChange={onChange} value={value}>
                                                    <Radio value={'0'}>男</Radio>
                                                    <Radio value={'1'}>女</Radio>
                                                    <Radio value={'2'}>保密</Radio>
                                                </Radio.Group>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <Form.Item
                                                name="description"
                                                label="描述"
                                            >
                                                <Input.TextArea rows={4} ref={descriptionValue} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Drawer>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ display: 'flex', marginTop: '20px' }}>
                            <div style={{ textAlign: 'center', width: '260px' }}>
                                <img src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + user.avatar} alt="" style={{ height: '160px', width: '160px', borderRadius: '3px' ,marginBottom:'10px'}} />
                                <div><Button onClick={showModal}><i className='iconfont icon-write'></i>&nbsp;&nbsp;修改头像</Button></div>
                                <Modal title="选择头像" open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
                                    {
                                        imgs.map(item=>{
                                            return <img src={item.url} alt="" style={{width:'96px',height:'96px',marginRight:'10px',marginBottom:'10px',cursor:'pointer'}} key={item.avatar} onClick={()=>clickHead(item.avatar)}/>
                                        })
                                    }
                                </Modal>
                            </div>
                            <div style={{ height: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <p>账户：{user.username ? user.username : '暂无账户'}</p>
                                <p>角色：{user.roleName ? user.roleName : '暂无角色'}</p>
                                <p>性别：{judgeSex(user.ssex) ? judgeSex(user.ssex) : '暂无性别'}</p>
                                <p>电话：{user.mobile ? user.mobile : '暂无电话'}</p>
                                <p>邮箱：{user.email ? user.email : '暂无邮箱'}</p>
                                <p>部门：{user.deptName ? user.deptName : '暂无部门'}</p>
                                <p>描述：{user.description ? user.description : '暂无描述'}</p>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
