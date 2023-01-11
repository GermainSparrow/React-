import React, { useState, useEffect,useRef } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ExclamationCircleFilled
} from '@ant-design/icons';
import { Layout, Menu, theme, Dropdown, Button, Modal, message, Space, Form, Input } from 'antd';
import { sideMenusApi, getPassword,password } from '../apis/ums';
import '../style/css/home.css'
const { Header, Sider, Content, Footer } = Layout;

const items = [
    {
        label: '个人中心',
        key: 'user-center',
        icon: <UserOutlined />
    },
    {
        label: '密码修改',
        key: 'update-password',
        icon: <UserOutlined />
    },
    {
        label: '系统定制',
        key: 'make-sys',
        icon: <UserOutlined />
    },
    {
        label: '退出登录',
        key: 'out-login',
        icon: <UserOutlined />
    },
];
export default function Home() {
    const judgePassword=useRef();
    const newPassword=useRef();
    const oldPassword=useRef();
    const { confirm } = Modal;
    const user = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const [menuList, setMenuList] = useState([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    useEffect(() => {
        sideMenusApi().then(res => {
            let a = [];
            res.rows.children.forEach(item => {
                a.push({ key: item.key, icon: item.icon, label: item.title })
            })
            // console.log(res.rows.children);
            setMenuList(a);
        })
    }, [])
    function clickMenu(params) {
        // console.log(params);
        const [path, titleKey] = params.keyPath;
        navigate(path);
        if (titleKey) {
            sessionStorage.titleKey = titleKey
        } else {
            sessionStorage.removeItem('titleKey')
        }
    };
    const [judge,setJudge]=useState(false)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');
    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            if(judge && newPassword.current.input.value ===judgePassword.current.input.value){
                password({
                    password:newPassword.current.input.value,
                    username:user.username
                }).then(()=>{
                    message.success('修改成功')
                    setOpen(false);
                    localStorage.clear();
                    navigate('/login',{replace:true});
                })
            }else{
                message.error('密码错误，请核对')
            }
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };
    const onClick = ({ key }) => {
        switch (key) {
            case 'user-center':
                navigate('/home/userCenter')
                break;
            case 'update-password':
                showModal();
                break;
            case 'make-sys':

                break;
            case 'out-login':
                confirm({
                    title: '提示',
                    icon: <ExclamationCircleFilled />,
                    content: '您确定退出当前账号吗？',
                    onOk() {
                        // console.log('OK');
                        localStorage.clear();
                        navigate('/login', { replace: true });
                        message.success('退出成功')
                    },
                    onCancel() {
                        // console.log('Cancel');
                    },
                });
                break;
        }
        // message.info(`Click on item ${key}`);
    };
    function judgePwd(){
        getPassword(`password=${oldPassword.current.input.value}&username=${user.username}`).then((res)=>{
            if(res){
                setJudge(true)
            }
        })
    }
    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <a style={{
                        height: 32,
                        margin: 20,
                        overflow: 'hidden',
                        display: 'block'
                    }}>
                        <img src="http://xawn.f3322.net:8002/distremote/static/img/logo.png" alt="" style={{ width: '32px' }} />
                        <label
                            style={{
                                fontSize: '20px',
                                color: '#fff',
                                fontWeight: '600',
                                marginLeft: '12px'
                            }}
                        >
                            赤兔养车
                        </label>
                    </a>
                    <Modal
                        title="密码修改"
                        open={open}
                        onOk={handleOk}
                        confirmLoading={confirmLoading}
                        onCancel={handleCancel}
                    >
                        <div>
                            <Form
                                name="basic"
                                labelCol={{
                                    span: 5,
                                }}
                                wrapperCol={{
                                    span: 50,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                autoComplete="off"
                            >
                                <Form.Item
                                    label="旧密码"
                                    name="oldPassword"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请输入旧密码!',
                                        },
                                    ]}
                                >
                                    <Input.Password placeholder='请输入旧密码' onChange={judgePwd} ref={oldPassword}/>
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    label="新密码"
                                    rules={[
                                        {
                                            required: true,
                                            message: '至少6位密码，区分大小写 密码强度不够!',
                                        },
                                    ]}
                                    hasFeedback
                                >
                                    <Input.Password placeholder='至少6位密码，区分大小写' ref={newPassword}/>
                                </Form.Item>

                                <Form.Item
                                    name="confirm"
                                    label="再次确认"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: '至少6位密码，区分大小写!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('两次密码不一致，请检查!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='确认密码' ref={judgePassword} />
                                </Form.Item>
                            </Form>
                        </div>
                    </Modal>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={[location.pathname]}
                        defaultOpenKeys={[sessionStorage.titleKey]}
                        onClick={clickMenu}
                        items={[
                            { key: '/home/index', icon: <UploadOutlined />, label: '系统主页' },
                            {
                                key: 'systemManage', icon: <UploadOutlined />, label: '系统管理', children: [
                                    { key: '/home/user', label: '用户管理' },
                                    { key: '/home/role', label: '角色管理' },
                                    { key: '/home/menu', label: '菜单管理' },
                                    { key: '/home/dict', label: '字典管理' },
                                ]
                            },
                            {
                                key: 'systemMonitor', icon: <UploadOutlined />, label: '系统监控', children: [
                                    { key: '/home/online', label: '在线用户' },
                                    { key: '/home/log', label: '系统日志' },
                                    { key: '/home/redis', label: 'Redis监控' },
                                    { key: '/home/request', label: '请求追踪' },
                                    {
                                        key: 'sysInfor', label: '系统信息', children: [
                                            { key: '/home/jvm', label: 'JVM信息' },
                                            { key: '/home/tomcat', label: 'Tomcat信息' },
                                            { key: '/home/serve', label: '服务器信息' },
                                        ]
                                    },
                                ]
                            },
                            {
                                key: 'task', icon: <UploadOutlined />, label: '任务调度', children: [
                                    { key: '/home/taskTime', label: '定时任务' },
                                    { key: '/home/dispatchLog', label: '调度日志' },
                                ]
                            },
                            {
                                key: 'serveItem', icon: <UploadOutlined />, label: '服务项目', children: [
                                    { key: '/home/typeManage', label: '类别管理' },
                                    { key: '/home/merchantItem', label: '商户项目' },
                                    { key: '/home/data', label: '数据统计' },
                                    { key: '/home/commissionManage', label: '抽成管理' },
                                ]
                            },
                            {
                                key: 'shopManage', icon: <UploadOutlined />, label: '商铺管理', children: [
                                    { key: '/home/powerCheck', label: '电站审核' },
                                    { key: '/home/shopCheck', label: '商铺审核' },
                                    { key: '/home/complaintManage', label: '投诉管理' },
                                    { key: '/home/outletManage', label: '门店管理' },
                                ]
                            },
                            {
                                key: 'goodsManage', icon: <UploadOutlined />, label: '商品管理', children: [
                                    { key: '/home/goodManage', label: '商品管理' },
                                    { key: '/home/goodTypeManage', label: '商品类型管理' },
                                ]
                            },
                            {
                                key: 'estimateManage', icon: <UploadOutlined />, label: '评价管理', children: [
                                    { key: '/home/goodEstimateManage', label: '商品评价管理' },
                                    { key: '/home/charging', label: '充电桩评价管理' },
                                    { key: '/home/serveEstimateManage', label: '服务评价管理' },
                                ]
                            },
                            {
                                key: 'orderManage', icon: <UploadOutlined />, label: '订单管理', children: [
                                    { key: '/home/serveOrder', label: '服务订单' },
                                    { key: '/home/goodOrder', label: '商品订单' },
                                    { key: '/home/serveOrderData', label: '服务订单数据' },
                                    { key: '/home/dataCalculate', label: '数据统计' },
                                    { key: '/home/chargingOrder', label: '电桩订单' },
                                ]
                            },
                            {
                                key: 'CouponManage', icon: <UploadOutlined />, label: '优惠券管理', children: [
                                    { key: '/home/couponManage', label: '优惠券管理' },
                                ]
                            },
                            { key: '/home/inforManage', icon: <UploadOutlined />, label: '消息管理' },
                            {
                                key: 'marketManage', icon: <UploadOutlined />, label: '营销管理', children: [
                                    { key: '/home/goodRecommend', label: '商品推荐' },
                                    { key: '/home/advertiseManage', label: '广告管理' },
                                ]
                            },
                        ]}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}
                    >
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger leftAndRight',
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <Dropdown
                            menu={{
                                items,
                                onClick
                            }}
                            placement="bottom"
                        >
                            <div style={{ display: 'flex', alignItems: 'center', marginRight: '50px' }}>
                                <img src={"http://xawn.f3322.net:8002/distremote/static/avatar/" + user.avatar} alt="" style={{ height: '30px', width: '30px', borderRadius: '30px' }} />
                                <label style={{ marginLeft: '10px' }}>{user.username}</label>
                            </div>
                        </Dropdown>
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Copyright ©2022 admin
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}
