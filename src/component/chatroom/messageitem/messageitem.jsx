import React,{Component} from 'react'
import './messageitem.css'
export default class MessageItem extends Component{
    render(){
        const {isMe,name,message}=this.props
        return (
            !isMe?
            <div className='message'>
                <div className='avatar'>
                    <img  src={require('../../../img/0.jpg')}
                    style={{width:50,height:50,borderRadius:50 }}/>
                    <span className='personName'>{name}</span>
                </div>
                <div className='messageContext'>
                    {message}
                </div>
            </div>
                :
                <div className='messageRight'>
                    <div className='messageContextRight'>
                        {message}
                    </div>
                    <div className='avatar'>
                        <span className='personNameRight'>{name}</span>
                        <img  src={require('../../../img/1.jpg')}
                              style={{width:50,height:50,borderRadius:50 }}/>
                    </div>
                </div>
        )
    }
}
