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
        click:[],
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
                <div className='top'>
                    <img src={require('../../img/movepagelogo.png')}/>
                    <span className='topText'>
                        足不出户，获取电影最新动态~！
                    </span>
                </div>
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
                                            <a  href={"https://maoyan.com"+item.link} target="_blank" >
                                                <Icon type="link" />
                                            </a>
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
                                                <Icon type="like" theme={this.state.click[index]===1?"filled":"outlined"} style={{color:this.state.click[index]===1?'rgb(207,80,34)':""}} onClick={()=>{
                                                    let tmp=this.state.click;
                                                    tmp[index]=1;
                                                    this.setState(
                                                        {
                                                            click:tmp,
                                                        }
                                                    )
                                                }}/>
                                            </a>
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

                                                <a  href={"https://maoyan.com"+item.link} target="_blank" >
                                                <Icon type="link" />
                                                </a>
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
                                                <a  href={"https://maoyan.com"+item.link} target="_blank" >
                                                    <Icon type="link" />
                                                </a>
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
                </div>
                <div className='right'>
                    <div className='rightInfo'>
                        最受期待榜
                    </div>
                    <Collapse bordered={false} defaultActiveKey={['1']}>
                        {
                            movieWantedList.map((item,index)=>{
                                return(
                                    <Panel header={item.title} key={index} style={{fontSize:20}}>
                                        <div className='movieWantedPoster'>
                                        <img src={item.poster}/>
                                        </div>
                                        <div className='movieRightInfo'>
                                            <span className='righttitle'>
                                        {item.title}
                                            </span>
                                        <br/>
                                        {item.star}
                                        <br/>
                                        {item.date}
                                        </div>
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
