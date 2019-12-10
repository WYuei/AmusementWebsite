import React,{Component} from 'react'
import {Icon} from 'antd'
import LikesItem from "./likesitem/likesitem";
import Player from "./Player/player";
import './userpage.css'
import drawform from "./draweformer/drawform";
export default class UserPage extends Component{
    state={
        data:[],
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
    }


    render(){
        const {data,personality}=this.state
        const usernamedata= this.props.location.state;
        const {username}=usernamedata;
        return (
            <div>
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
                        <span className='likeNum'>3</span>
                        <Icon className='likesNumIcon' type="heart" theme="filled" />
                        <span className='likeText'>已喜欢</span>
                    </div>
                </div>
               <ul className='likelist'>
                   <span className='listTitle'>我喜欢的音乐</span><br/><br/>
                   {
                       data.map((item,index)=>
                           <li className={index%2===0?'evenli':'oddli'}
                               key={index}>
                               <Icon className='heartinlistIcon' type="heart" theme="filled" />

                               {item.muciName} /
                               {item.SingerName}
                               {item.ID}
                               <Icon className='playinlistIcon' type="caret-right" />
                               <Icon className='shareinlistIcon' type="share-alt" />
                               <a onClick={this.handleClick=()=>{
                                   const usernamedata= this.props.location.state;
                                   const {username}=usernamedata;
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
                               }}><Icon className='closeinlistIcon' type="close" /></a>
                           </li>
                       )
                   }
               </ul>
                <Player/>
            </div>
        )
    }
}
