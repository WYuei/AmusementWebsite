import React,{Component} from 'react'
import {Card, Icon,Collapse,Drawer,message} from 'antd'
import './movielistpage.css'
import io from "socket.io-client";
const { Meta } = Card;
const { Panel } = Collapse;



const url='ws://localhost:8080'
const socket = io(url);
export default class MovieListPage extends Component{
    state ={
        roomdata:[
            {
                title:"Meet Friends",
                description:"created by a handsome boy"
            },
            {
                title:"大家好",
                description:"上午8：00到下午2：00都有人"
            },
            {
                title:"111111",
                description:"asdfhidsfn"
            },
            {
                title:"牧场物语直播",
                description:"欢迎同好们一起来交流"
            }
        ],
        movielist:[
            {
                ID:0,
                link:'loading',
                poster:'loading',
                titile:'loading',
                detail:'loading',
            },
        ],
        movieWantedList:[
            {
                link:'loading',
                poster:'loading',
                title:'loading',
                star:'loading',
                date:'loading'
            }
        ]
    }
    componentDidMount() {
        fetch('http://localhost:8080/movieList')
            .then(res => res.json())
            .then(res =>
            {
                this.setState(
                    {
                        movielist:res.data
                    }
                )
            })
            .catch(e => console.log('错误:', e))
        fetch('http://localhost:8080/movieWanted')
            .then(res => res.json())
            .then(res =>
            {
                console.log(res)
                this.setState({
                    movieWantedList:res.data
                })
            })
            .catch(e => console.log('错误:', e))
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    render(){
        const {movielist,movieWantedList,roomdata}=this.state
        return (
            <div>
                <div className='top'></div>
                <div className='left'>
                    <div className='LT1'>
                        <div className='LT1title'>
                            正在热映
                        </div>
                        {
                            movielist.map((item,index)=>{
                                if(index<=7)
                                return(
                                    <div className='movieItem' key={index}>
                                        <img src={item.poster}/>
                                        <div className='infoText'>
                                            <span className='movietitle'>{item.title}</span>
                                            <span className='movieDetail'>{item.detail}</span>
                                        </div>
                                        <div className='movieIcons'>
                                            <Icon type="link" />
                                            <Icon type="share-alt" />
                                            <Icon type="like" />
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className='LT2'>
                        <div className='LT2title'>
                            即将上映
                        </div>
                        {
                            movielist.map((item,index)=>{
                                if(index>7 && index<=15)
                                    return(
                                        <div className='movieItem' key={index}>
                                            <img src={item.poster}/>
                                            <div className='infoText'>
                                                <span className='movietitle'>{item.title}</span>
                                                <span className='movieDetail'>{item.detail}</span>
                                            </div>
                                            <div className='movieIcons'>
                                                <Icon type="link" />
                                                <a onClick={()=>{
                                                    const title=item.title
                                                    const url=item.link
                                                    socket.emit('chat message','我分享了电影：'+title+'-'+url+',快来一起看看吧~')
                                                    this.showDrawer()
                                                }}>
                                                <Icon type="share-alt" />
                                                </a>
                                                <a onClick={()=>{
                                                    const {username}=this.props.location.state
                                                    const ID=item.ID
                                                    fetch('http://localhost:8080/movielike/add',
                                                        {
                                                            method: "POST",
                                                            mode: "cors",
                                                            headers: {
                                                                "Content-Type": "application/x-www-form-urlencoded"
                                                            },
                                                            body: 'name='+username+ID
                                                        }
                                                    )
                                                        .then(res => res.json())
                                                        .then(res =>
                                                        {
                                                            let msg=res.msg
                                                            console.log(msg)

                                                        })
                                                        .catch(e => console.log('错误:', e))
                                                }}>
                                                    <Icon type="like" />
                                                </a>
                                            </div>
                                        </div>
                                    )
                            })
                        }

                    </div>
                    <div className='LT3'>
                        <div className='LT3title'>
                            热播电影
                        </div>
                        {
                            movielist.map((item,index)=>{
                                if(index>15)
                                    return(
                                        <div className='movieItem' key={index}>
                                            <img src={item.poster}/>
                                            <div className='infoText'>
                                                <span className='movietitle'>{item.title}</span>
                                                <span className='movieDetail'>{item.detail}</span>
                                            </div>
                                            <div className='movieIcons'>
                                                <Icon type="link" />
                                                <Icon type="share-alt" />
                                                <Icon type="like" />
                                            </div>
                                        </div>
                                    )
                            })
                        }

                    </div>
                </div>
                <div className='right'>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        {
                            movieWantedList.map((item,index)=>{
                                return(
                                    <Panel header={item.title} key={index}>
                                        <img src={item.poster}/>
                                        {item.title}
                                        <br/>
                                        {item.star}
                                        <br/>
                                        {item.date}
                                    </Panel>
                                )
                            })
                        }
                    </Collapse>
                </div>
                <Drawer
                    title="Which room do you want to share?"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    >
                    {roomdata.map((item,index)=>{
                        return (<a onClick={
                            ()=>{
                                message.success('成功分享链接~');
                            }
                        } className='alist'><li className='classList' key={index}>{item.title}</li></a>)
                    })}
            </Drawer>
            </div>
        )
    }
}
