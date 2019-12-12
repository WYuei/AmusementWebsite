import React,{Component} from 'react'
import {Icon,Card,message } from 'antd'
import LikesItem from "./likesitem/likesitem";
import Player from "./Player/player";
import './userpage.css'
import {socket} from "../../socket/socket";
import drawform from "./draweformer/drawform";
const { Meta } = Card;
export default class UserPage extends Component{
    state={
        data:[],
        moviedata:[],
        personality:'这个人很懒，还什么都没有写~',
    }
    componentDidMount() {
        const data= this.props.location.state;
        const {username}=data;
        fetch('http://localhost:8080/userlikes',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'name='+username
            }
        )
            .then(res => res.json())
            .then(res =>
            {
                let data=res.data
                console.log(data)
                this.setState(
                    {
                        data:data
                    }
                )

            })
            .catch(e => console.log('错误:', e))
        fetch('http://localhost:8080/movielike',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'name='+username
            }
        )
            .then(res => res.json())
            .then(res =>
            {
                let data=res.data
                console.log(data)
                this.setState(
                    {
                        moviedata:data
                    }
                )

            })
            .catch(e => console.log('错误:', e))
    }


    render(){
        const {data,personality,moviedata}=this.state
        const usernamedata= this.props.location.state;
        const {username}=usernamedata;
        return (
            <div>
                <div className='lists'>
                <div className='userInfo'>
                    <img  src={require('../../img/1.jpg')}style={{width:150,height:150,borderRadius:5 }}/>
                    <span className='usernameShow'> {username}
                    <Icon type="form" style={{fontSize:20,marginLeft:10}}/>
                    </span>
                    <span className='personality'> {personality}</span>
                    <Icon className='editIcon' type="edit" />
                    <div className='linkIcon'>
                        <Icon className='icon_link' type="github" />
                        <Icon className='icon_link' type="weibo" />
                        <Icon className='icon_link' type="qq" />
                        <Icon className='icon_link' type="zhihu" />
                    </div>
                    <div className='likesNum'>
                        <span className='likeNum'>{data.length}</span>
                        <Icon className='likesNumIcon' type="heart" theme="filled" />
                        <span className='likeText'>已喜欢</span>
                    </div>
                    <div className='likesNum2'>
                        <span className='likeNum2'>{moviedata.length}</span>
                        <Icon className='likesNumIcon2' type="like" theme="filled"/>
                        <span className='likeText2'>已关注</span>
                    </div>
                </div>

                <div className='musiclistDiv'>
                    <ul className='likelist'>
                   <span className='listTitle'>我喜欢的音乐</span><br/><br/>
                   {
                       data.map((item,index)=>
                           <li className={index%2===0?'evenli':'oddli'}
                               key={index}>
                               <Icon className='heartinlistIcon' type="heart" theme="filled" />

                               {item.muciName} /
                               {item.SingerName}
                               <Icon className='playinlistIcon' type="caret-right" />
                               <a onClick={()=>{
                                   const songname=item.muciName
                                   const artist=item.SingerName
                                   socket.emit('chat message','[音乐]'+songname+'-'+artist)
                                   message.success('分享成功！')
                               }}>
                               <Icon className='shareinlistIcon' type="share-alt" />
                               </a>
                               <a onClick={this.handleClick=()=>{
                                   const usernamedata= this.props.location.state;
                                   const {username}=usernamedata;
                                   let datatmp=data
                                   let ky=datatmp.findIndex((value, keys, datatmp) => {
                                       return value.ID===item.ID;
                                   })
                                   datatmp.splice(ky,1)
                                   fetch('http://localhost:8080/userlikes/delete',
                                       {
                                           method: "POST",
                                           mode: "cors",
                                           headers: {
                                               "Content-Type": "application/x-www-form-urlencoded"
                                           },
                                           body: 'name='+username+item.ID
                                       }
                                   )
                                       .then(res => res.json())
                                       .then(res =>
                                       {
                                           let msg=res.msg
                                           console.log(msg)
                                       })
                                       .catch(e => console.log('错误:', e))
                                   this.setState({
                                       data:datatmp
                                   })
                                   message.success('哎呀，再听听有可能会喜欢的呢♥~')

                               }}><Icon className='closeinlistIcon' type="close" /></a>
                           </li>
                       )
                   }
               </ul>
                </div>
                <div className='movielistDiv'>
                    <ul className='likelist'>
                        <span className='listTitle'>我关注的电影</span><br/><br/>
                        {
                            moviedata.map((item,index)=>
                                {
                                    return (
                                        <Card
                                            className='cardItem'
                                            key={index}
                                            hoverable
                                            cover={<img src={item.poster} />}
                                        >
                                            <Meta title={item.title} description={item.detail} />
                                        </Card>
                                    )
                                }
                            )
                        }
                    </ul>
                </div>
                </div>
                <Player/>
            </div>
        )
    }
}
