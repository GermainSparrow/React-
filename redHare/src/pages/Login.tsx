import logo from '../images/logo.png';
import { Button, Checkbox, Form, Input, Tabs, Space } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import apis from '../utils/apis';
import { useNavigate } from 'react-router-dom'
function login(): JSX.Element {
    const navigate = useNavigate()
    //点击登录时函数
    const onFinish = (values: any) => {
        console.log('Success:', values);
        //调用接口
        apis.user.login({
            body: {
                username: values.username,
                password: values.password
            }
        }).then((msg) => {
            console.log('msg2222222', msg);
            if (msg.message == '认证成功') {
                localStorage.setItem('token', msg.data.token);
                localStorage.setItem('permission', JSON.stringify(msg.data.permissions));
                localStorage.setItem('user', JSON.stringify(msg.data.user));
                navigate('/system')
            }
        })

    }
    return <div style={{ width: '100vw' }}>
        <div style={{ textAlign: 'center', marginTop: '116px' }}>
            <img src={logo} alt="" style={{ width: '39px', height: '19px', marginRight: "16px" }} />
            <span style={{ fontSize: '28px' }}>赤兔养车</span></div>
        {/* 选项框 */}
        <div>
            <Tabs centered>
                <TabPane tab="账号密码登录" key="1">
                    <Form
                        onFinish={onFinish}>
                        <Form.Item
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input style={{ width: '360px' }} />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input.Password style={{ width: '360px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ position: 'absolute', left: '50%', translate: '-50%', width: '360px' }}>点击登陆</Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="手机号登录" key="2">
                    <Form>
                        <Form.Item
                            rules={[{ required: true, message: 'Please input your username!' }]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input style={{ width: '360px' }} />
                        </Form.Item>

                        <Form.Item
                            rules={[{ required: true, message: 'Please input your password!' }]}
                            style={{ textAlign: 'center' }}
                        >
                            <Input.Password style={{ width: '360px' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" style={{ position: 'absolute', left: '50%', translate: '-50%', width: '360px' }}>点击登陆</Button>
                        </Form.Item>
                    </Form>
                </TabPane>

            </Tabs>

        </div>

    </div>
};
export default login