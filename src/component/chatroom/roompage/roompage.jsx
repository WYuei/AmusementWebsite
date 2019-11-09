import React,{Component} from 'react'
import {Icon,Input,Card,Avatar,Upload, message,Popover,Button} from 'antd'

import MessageItem from "../messageitem/messageitem";
import './roompage.css'
import VideoCamera from "../videocamera/videocamera";
import io from 'socket.io-client'


const { TextArea } = Input;
const { Search } = Input;

const url='ws://localhost:8080'
const socket = io(url);
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

const onlinePeople=(
    <div>
        <Avatar shape="square" size="small" icon="user" />
        <span className='onlineName'>Linvanuevi</span>
    </div>
)

let listfile=[]
export default class RoomPage extends Component{
    state={
        messageArr:[],
        inputMessage:"",
        roomitems:[],
        chosenIndex:0,
        video:'none',
        isUpload:false,
        isBolder:false,
        user:true
    }

    componentDidMount() {
        const {roomitems,index}=this.props.location.state
        this.setState({
            roomitems:roomitems,
            chosenIndex:index
        })
        const {isBolder}=this.state
        const msgArr=this.state.messageArr
        socket.on('chat message', (msg)=>
            {console.log(msg)
                if(msgArr[index]==null) //第一条信息
                {msgArr[index]=[{
                    isMe:false,
                    name:"David",
                    message:msg,
                    isBolder:isBolder
                }]
                }
                else
                    msgArr[index].push({ //不是第一条信息
                        isMe:false,
                        name:"David",
                        message:msg,
                        isBolder:isBolder
                    })
                this.setState({
                    messageArr:msgArr
                })
        });
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
        const {isUpload,isBolder,chosenIndex}=this.state
        let msg
        if(isUpload)
        {
            console.log("用户d5ea4473-43c3-4dfb-94af-eea381d3848e在房间__"+this.state.chosenIndex+"__请求发送文件")
            msg=listfile.map((item,index)=>
                <span className='fileClip' key={index}><Icon type="paper-clip" />{item.name}</span>
            )
        }
        else
            msg=this.state.inputMessage
        socket.emit('chat message',msg)
        if(msgArr[chosenIndex]==null) //第一条信息
            {msgArr[chosenIndex]=[{
                isMe:true,
                name:"Linvanuevi",
                message:msg,
                isBolder:isBolder
                }]
            }
        else
            msgArr[chosenIndex].push({ //不是第一条信息
                isMe:true,
                name:"Linvanuevi",
                message:msg,
                isBolder:isBolder
                })
        console.log(msgArr)
        this.setState({
            messageArr:msgArr,
            inputMessage:"",
            isUpload:false,
            isBolder:false
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
    setBloder=()=>{
        this.setState({
            isBolder:true
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
                                    className={index===chosenIndex?'chosen':'nochosen'}
                                    key={index}
                                >
                                    {index===chosenIndex?
                                        <Popover
                                            content={onlinePeople}
                                            placement="right"
                                            title={"当前在线成员"}
                                            key={index}
                                        ><Avatar
                                                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                                size="large"
                                            />
                                        </Popover>
                                        :
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            size="large"
                                        />
                                    }
                                    <span className='title' >{item.title}</span>
                                    <span className='description'>{item.description}</span>
                                </Card>

                            )
                        })
                    }
                </div>

                <div className='roomContext' >
                    <div>
                       /* <div className='videoPart' style={{display:video}}>
                            <VideoCamera />
                        </div>*/
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
                                        isBolder={item.isBolder}
                                    />
                                )
                })
            }
                    </div>
                    <div className='inputArea'>
                        <div className='manyTools'  id="rampage">
                            <Icon type="smile" theme="outlined"
                                  style={{ fontSize: '30px',marginRight:15 }}/>
                            <Icon type="video-camera" theme="filled"
                                  style={{ fontSize: '30px', marginRight:15 }}
                                    onClick={this.onVideo}/>
                            <Icon type="phone"
                                  style={{ fontSize: '30px', marginRight:15 }}/>
                            <Icon type="bold"
                                  style={{ fontSize: '30px', marginRight:15 }}
                                  onClick={this.setBloder}
                            />
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

