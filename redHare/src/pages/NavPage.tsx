import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import apis from '../utils/apis';
import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import { Outlet } from 'react-router-dom';
const { Header, Footer, Sider, Content } = Layout;
interface it {
    path: string,
    name: string,
    component: string,
    icon: string,
    children: {
        path: string,
        name: string,
        component: string,
        icon: string,
    }[]
}
function navPage() {
    //生命周期函数 获取菜单权限
    const [navItem, setNavItem] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.user));
    const navigate = useNavigate()
    useEffect(function e() {
        apis.menu.getMenu({})
            .then((msg) => {
                console.log('getMenu', msg);
                //处理权限
                let x: ItemType[]
                let p = msg[0].children.map((items: it) => {
                    if (items.children) {
                        let temp = items.children.map((st) => {
                            return getItem(st.name, st.path)
                        });
                        x = temp
                    }
                    return getItem(items.name, items.path, <SettingOutlined />, x)
                });
                setNavItem(p)
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
    // const items: MenuProps['items'] = [
    //     getItem('Navigation One', 'sub1', <MailOutlined />, [
    //         getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    //         getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    //     ]),

    //     getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //         getItem('Option 5', '5'),
    //         getItem('Option 6', '6'),
    //         getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    //     ]),

    //     getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    //         getItem('Option 9', '9'),
    //         getItem('Option 10', '10'),
    //         getItem('Option 11', '11'),
    //         getItem('Option 12', '12'),
    //     ]),

    // ];
    
    //点击跳转到具体页面
    function onClick(x:{key:string}){
        console.log(x);
        navigate(x.key)
    }
    return <div>
        <Layout >
            <Sider style={{ height: '100vh', backgroundColor: '#3A3E46' }}>
                <div style={{ height: '59px', width: '224px', paddingLeft: '24px', lineHeight: '59px', }}>
                    <img src={logo} alt="" style={{ width: '39px', height: '19px', marginRight: "16px" }} />
                    <h1 style={{ fontSize: '20px', color: 'white', display: 'inline' }}>赤兔养车</h1>
                </div>
                <Menu
                    onClick={onClick}
                    style={{ width: '100%', backgroundColor: '#3B3E46', color: '#BABCBE' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={navItem}
                />
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: '#fff' }}>
                    <div>
                        <div style={{ float: 'right', position: 'relative' }}>
                            <img src={`http://xawn.f3322.net:8002/distremote/static/avatar/${user.avatar}`} style={{ width: '30px', height: '30px', borderRadius: '15px', verticalAlign: 'middle', marginRight: '10px' }} alt="" />
                            <span style={{ verticalAlign: 'middle' }}>{user.username}</span>
                            <div style={{ position: 'absolute' }}>
                                <ul style={{ listStyle: 'none', backgroundColor: '#fff', padding: 0, fontSize: '10px' }}>
                                    <li>个人中心</li>
                                    <li>密码修改</li>
                                    <li>系统定制</li>
                                    <li>退出登录</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content style={{ backgroundColor: '#EDEFF2' }}>
                    <Outlet />
                </Content>
                <Footer style={{ backgroundColor: '#F0F2F5' }}>Footer</Footer>
            </Layout>
        </Layout>
    </div >
}
export default navPage