import React,{Component} from 'react'
import {Icon} from 'antd'
import './messageitem.css'
export default class MessageItem extends Component{
    render(){
        const {isMe,name,message,isBolder,user}=this.props
        return (
            !isMe?
            <div className='message'>
                <div className='avatar'>
                    {
                        user?
                            <img  src={require('../../../img/0.jpg')}style={{width:50,height:50,borderRadius:50 }}/>
                            :<img  src={require('../../../img/1.jpg')}style={{width:50,height:50,borderRadius:50 }}/>
                    }
                    <span className='personName'>{name}</span>
                </div>
                <div className='messageContext'
                     style={{fontWeight:isBolder?'bold':'normal'}}
                >
                    {message}
                    <br/>
                    {message[0]==='['?
                        <audio src={require('../../../music/asong.mp3')} controls="controls" style={{width:220,backgroundColor:(34,187,255)}} >
                            Your browser does not support the audio element.
                        </audio>:null
                    }
                    {message[0]==='你'?<a href="data:text/txt;charset=utf-8,测试下载纯文本" download="测试.txt">
                        <Icon type="save"/>
                    </a>:null
                    }
                </div>
            </div>
                :
                <div className='messageRight'>
                    <div className='messageContextRight'
                         style={{fontWeight:isBolder?'bold':'normal'}}>
                        {message}
                        <br/>
                        {message[0]==='['?
                            <audio src={require('../../../music/asong.mp3')} controls="controls" style={{width:220}} >
                                Your browser does not support the audio element.
                            </audio>:null}
                    </div>
                    <div className='avatar'>
                        <span className='personNameRight'>{name}</span>
                        {
                            user?
                                <img  src={require('../../../img/1.jpg')}style={{width:50,height:50,borderRadius:50 }}/>
                                :<img  src={require('../../../img/0.jpg')}style={{width:50,height:50,borderRadius:50 }}/>
                        }
                    </div>
                </div>
        )
    }
}
