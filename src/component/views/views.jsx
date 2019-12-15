import React,{Component} from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import {BrowserRouter,Link,Switch,Route,Redirect} from 'react-router-dom'

import 'antd/dist/antd.css'
import './views.css'
import ChatRoom from "../chatroom/chartroom";
import RoomPage from "../chatroom/roompage/roompage";
import BigVideo from "../chatroom/videocamera2/bigvideo";
import ListPage from "../listpage/listpage";
import UserPage from "../userpage/userpage";
import MovieListPage from "../movieList/movielistpage";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export default class Views extends Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        const data= this.props.location.state;
        const {username}=data
        console.log(this.props.location)
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
                                    title={<span><Icon type="user" />用户中心</span>}>
                                    <Menu.Item key="1">
                                        <Link to={
                                        {pathname:'/user',
                                            state:{
                                                username:username
                                            }}}>{username}</Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub2"
                                    title={<span><Icon type="laptop" />在线聊天</span>}>
                                    <Menu.Item key="5"><Link to={
                                            {pathname:'/views/chatroom',
                                            state:{
                                                username:username
                                            }}}>聊天室
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub3"
                                    title={<span><Icon type="notification" />音乐榜单</span>}>
                                    <Menu.Item key="9">
                                        <Link to={
                                            {pathname:'/views/musiclist',
                                                state:{
                                                    username:username
                                                }}}>
                                         最in音乐榜
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                                <SubMenu
                                    key="sub4"
                                    title={<span><Icon type="bar-chart" />电影资讯</span>}                                >
                                    <Menu.Item key="11">
                                        <Link to={
                                            {pathname:'/views/movielist',
                                                state:{
                                                    username:username
                                                }}}>
                                        猫眼电影
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route path='/views/chatroom' component={ChatRoom}/>
                                <Route path='/views/roompage' component={RoomPage}/>
                                <Route path='/views/musiclist' component={ListPage}/>
                                <Route path='/views/bigvideo' component={BigVideo}/>
                                <Route path='/views/movielist' component={MovieListPage}/>
                                <Route path='/user' component={UserPage}/>
                                <Redirect to={
                                    {pathname:'/views/musiclist',
                                        state:{
                                            username:username
                                        }}}/>
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
            <div style={{ textAlign: 'center',height:70,color:"white"}}> ©2019 Created by WangYuWei 201706062422</div>
            </Layout>
            </BrowserRouter>)
    }
}


