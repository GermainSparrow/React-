import { Layout } from 'antd';
import { useEffect } from 'react';
import logo from '../images/logo.png';
import apis from '../utils/apis';
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
function navPage() {
    useEffect(function e() {
        apis.menu.getMenu({})
            .then((msg) => {
                console.log('getMenu', msg);

            })
    }, []);
    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    };
    const items: MenuProps['items'] = [
        getItem('Navigation One', 'sub1', <MailOutlined />, [
            getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
            getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
        ]),

        getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
            getItem('Option 5', '5'),
            getItem('Option 6', '6'),
            getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
        ]),

        getItem('Navigation Three', 'sub4', <SettingOutlined />, [
            getItem('Option 9', '9'),
            getItem('Option 10', '10'),
            getItem('Option 11', '11'),
            getItem('Option 12', '12'),
        ]),

    ];
    return <div>
        <Layout >
            <Sider style={{ height: '100vh', backgroundColor: '#3A3E46' }}>
                <div style={{ height: '59px', width: '224px', paddingLeft: '24px', lineHeight: '59px', }}>
                    <img src={logo} alt="" style={{ width: '39px', height: '19px', marginRight: "16px" }} />
                    <h1 style={{ fontSize: '20px', color: 'white', display: 'inline' }}>赤兔养车</h1>
                </div>
                <Menu
                    // onClick={onClick}
                    style={{ width: '100%',backgroundColor:'#3B3E46',color:'#BABCBE'}}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#fff' }}>

                </Header>
                <Content style={{ backgroundColor: '#EDEFF2' }}>Content</Content>
                <Footer style={{ backgroundColor: '#F0F2F5' }}>Footer</Footer>
            </Layout>
        </Layout>
    </div >
}
export default navPage