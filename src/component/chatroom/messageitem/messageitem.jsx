import React,{Component} from 'react'
import './messageitem.css'
export default class MessageItem extends Component{
    state={
        isMe:false,
    }
    render(){
        const {isMe}=this.state
        return (
            <div className='message'>
                <div className='avatar'>
                    <img  src={require('../../../img/1.jpg')}
                    style={{width:50,height:50,borderRadius:50 }}/>
                    <span className='personName'>Linvanuevi</span>
                </div>
                <div className='messageContext'>
                    this is a message test
                </div>

            </div>
        )
    }
}
