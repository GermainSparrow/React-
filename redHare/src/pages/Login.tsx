import logo from '../images/logo.png';
import { Button, Checkbox, Form, Input, Tabs, Space } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';

function login(): JSX.Element {
    //点击登录时函数
    const onFinish = (values: any) => {
        console.log('Success:', values);
    }
    return <div style={{ width: '100vw' }}>
        <div style={{ textAlign: 'center', marginTop: '116px' }}>
            <img src={logo} alt="" style={{ width: '39px', height: '19px', marginRight: "16px" }} />
            <span style={{ fontSize: '28px' }}>赤兔养车</span></div>
        {/* 选项框 */}
        <div>
            <Tabs centered>
                <TabPane tab="账号密码登录" key="1">
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
                    </Form>
                </TabPane>

            </Tabs>
            <Button type="primary">点击登陆</Button>
        </div>

    </div>
};
export default login