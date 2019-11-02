import React,{Component} from 'react'
import {Icon,Input,Card,Avatar,Upload, message,Popover,Button} from 'antd'

import MessageItem from "../messageitem/messageitem";
import './roompage.css'
import VideoCamera from "../videocamera/videocamera";
const { TextArea } = Input;
const { Search } = Input;

const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            //console.log(file, fileList);
            listfile=fileList
        }
    }
};
const content = (
    <Upload {...props}>
        <Button>
            <Icon type="upload" />Upload
        </Button>
    </Upload>
);

let listfile=[]
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
        chosenIndex:0,
        video:'none',
        isUpload:false
    }

    componentDidMount() {
        const {roomitems,index}=this.props.location.state
        this.setState({
            roomitems:roomitems,
            chosenIndex:index
        })
    }
    handleInput = (event)=>{
        const msg=event.target.value.trim()
        this.setState(
            {
                inputMessage:msg
            }
        )
}
    handleRoom = (value)=>{
        const {roomitems}=this.state
        let i=roomitems.findIndex(
            (item)=>item.title===value)
        this.setState(
            {chosenIndex:i}
        )
    }
    handleSend=()=>{
        const msgArr=this.state.messageArr
        const {isUpload,chosenIndex}=this.state
        let msg
        if(isUpload)
        {
            msg=listfile.map((item,index)=>
                <span className='fileClip' key={index}><Icon type="paper-clip" />{item.name}</span>
            )
        }
        else
            msg=this.state.inputMessage
        if(msgArr[chosenIndex]==null)
            {msgArr[chosenIndex]=[{
                isMe:true,
                name:"Linvanuevi",
                message:msg
                }]
            }
        else
            msgArr[chosenIndex].push({
                isMe:true,
                name:"Linvanuevi",
                message:msg
                })
        console.log(msgArr)
        this.setState({
            messageArr:msgArr,
            inputMessage:"",
            isUpload:false
            })


    }
    onVideo =()=>{
        let isVideo=this.state.video
        if(isVideo==='none')
            isVideo='block'
        else
            isVideo='none'
        this.setState({
            video:isVideo
        })
    }
    render(){
        const {messageArr,inputMessage,roomitems,chosenIndex,video}=this.state
        return (
            <div>
                <div className='roomlist'>
                    <Search
                        placeholder="搜索聊天室的名称..."
                        onSearch={value => this.handleRoom(value)}
                        style={{ width: 200,marginLeft:46,marginBottom:10 }}
                    />
                    {
                        roomitems.map((item,index)=>{
                            return (
                                <Card
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
                    <div>
                        <div className='videoPart' style={{display:video}}>
                            <VideoCamera />
                        </div>
                        {
                        messageArr[chosenIndex]==null?
                            <div className='noMessage'>
                                <Icon type="message"
                                      style={{
                                          fontSize: '20px',
                                          marginRight:10}}/>开始聊天吧~！
                            </div>
                            :
                            messageArr[chosenIndex].map((item,index)=>{
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
                                  style={{ fontSize: '30px', marginRight:15 }}
                                    onClick={this.onVideo}/>
                            <Icon type="phone"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="italic"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="font-size"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Popover content={content}
                                     title="Click Here to Upload"
                                     trigger="click"
                            >
                            <Icon type="file-add" theme="filled"
                                  style={{ fontSize: '30px',marginRight:15 }}
                                  onClick={()=>this.setState({
                                      isUpload:true
                                  })}
                            />
                            </Popover>
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

