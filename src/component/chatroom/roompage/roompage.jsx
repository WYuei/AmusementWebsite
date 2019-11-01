import React,{Component} from 'react'
import {Icon,Input,Card,Avatar,Button} from 'antd'

import MessageItem from "../messageitem/messageitem";
import './roompage.css'
const { TextArea } = Input;
const { Search } = Input;

export default class RoomPage extends Component{
    state={
        messageArr:[[
            {
                isMe:true,
                name:"Linvanuevi",
                message:"嗨，你在做什么，我待会要去实验室写报告了！啊aaaaaaa"
            },
            {
                isMe:false,
                name:"David",
                message:"今天是礼拜一"
            },
            {
                isMe:false,
                name:"David",
                message:"哈利波特！"
            },
            {
                isMe:true,
                name:"Linvanuevi",
                message:"我在写作业呀呀呀呀呀呀呀"
            },
            ],
            [
                {
                    isMe:false,
                    name:"Li",
                    message:"hah"
                }
            ]
        ],
        inputMessage:"",
        roomitems:[],
        chosenIndex:0
    }
    handleInput = (event)=>{
        const msg=event.target.value.trim()
        this.setState(
            {
                inputMessage:msg
            }
        )
}
    handleRoom = ()=>{
        console.log('1')
    }
    componentDidMount() {
        const {roomitems,index}=this.props.location.state
        this.setState({
            roomitems:roomitems,
            chosenIndex:index
        })
    }


    handleSend=()=>{
        const msgArr=this.state.messageArr
        const msg=this.state.inputMessage
        msgArr.push({
            isMe:true,
            name:"Linvanuevi",
            message:msg
        })
        this.setState({
            messageArr:msgArr
        })
        this.setState({
            inputMessage:""
        })
    }
    render(){
        const {messageArr,inputMessage,roomitems,chosenIndex}=this.state
        return (
            <div>
                <div className='roomlist'>
                    <Search
                        placeholder="搜索聊天室的名称..."
                        onSearch={value => console.log(value)}
                        style={{ width: 200,marginLeft:46,marginBottom:10 }}
                    />
                    {
                        roomitems.map((item,index)=>{
                            return (
                                <Card
                                    hoverable
                                    style={{borderTop:'none',borderLeft:'none',borderRight:'none',height:"auto"}}
                                    key={index}
                                    className={index===chosenIndex?'chosen':'nochosen'}
                                >
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        size="large"
                                    /><span className='title' >{item.title}</span>

                                    <span className='description'>{item.description}</span>
                                </Card>
                            )
                        })
                    }
                </div>

                <div className='roomContext' >
                    <div>{
                messageArr[1].map((item,index)=>{
                    return (
                        <MessageItem
                            isMe={item.isMe}
                            name={item.name}
                            message={item.message}
                            key={index}
                        />
                    )
                })
            }
                    </div>
                    <div className='inputArea'>
                        <div className='manyTools'>
                            <Icon type="smile" theme="outlined"
                                  style={{ fontSize: '30px',marginRight:15 }}/>
                            <Icon type="video-camera" theme="filled"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="phone"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="italic"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="font-size"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="file-add" theme="filled"
                                  style={{ fontSize: '30px',marginRight:15 }}/>
                        </div>
                        <div className='textArea'>
                            <TextArea rows={4}
                                      onChange={this.handleInput}
                                      value={inputMessage}
                                      onPressEnter={this.handleInput}
                            />
                            <a className="btn btn-default"
                            onClick={this.handleSend}>发送</a>
                        </div>
                    </div>
                </div>
            </div>
        )}}

