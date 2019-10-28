import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'

import 'antd/dist/antd.css'
import './views.css'
import ChatRoom from "../chatroom/chartroom";
import RoomPage from "../chatroom/roompage/roompage";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class Views extends Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        const  data = this.props.location.state;
        const {username}=data
        console.log(username)
        return(
            <BrowserRouter>
        <Layout className="layout">
                <Content style={{ padding: '0 50px', }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: '24px 0', background: '#fff',height:750,opacity:0.9,borderRadius:30 }}>
                        <Sider width={200} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
                            >
                                <SubMenu
                                    key="sub1"
                                    title={<span><Icon type="user" />subnav 1</span>}>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={<span><Icon type="laptop" />Chat Room</span>}>
                                    <Menu.Item key="5">
                                        <Link to='/views/chatroom'>Room List</Link>
                                    </Menu.Item>
                                    <Menu.Item key="6">
                                        Room Page
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={
                                        <span>
                  <Icon type="notification" />
                  subnav 3
                </span>
                                    }
                                >
                                    <Menu.Item key="9">option9</Menu.Item>
                                    <Menu.Item key="10">option10</Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route path='/views/chatroom' component={ChatRoom}/>
                                <Route path='/views/roompage' component={RoomPage}/>
                                <Redirect to='/views/chatroom'/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
            <div style={{ textAlign: 'center',height:70,color:"white"}}> ©2019 Created by WangYuWei 201706062422</div>
            </Layout>
            </BrowserRouter>)
    }
}


