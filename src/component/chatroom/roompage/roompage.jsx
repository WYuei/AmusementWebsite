import React,{Component} from 'react'
import {Icon,Input,Card,Avatar,Upload, message,Popover,Button} from 'antd'

import MessageItem from "../messageitem/messageitem";
import './roompage.css'
import VideoCamera from "../videocamera/videocamera";
import io from 'socket.io-client'
import VideoCamera2 from "../videocamera2/videocamera";

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
        user:true,
        startFake:0,
        isTwo:false
    }
    componentDidMount() {
        const {roomitems,index,username}=this.props.location.state
        const {isUpload,isBolder,chosenIndex,user,startFake}=this.state
        let msg
        const msgArr=this.state.messageArr
        console.log(this.props.location)
        const flag=username==="Linvanuevi"?true:false
        this.setState({
            roomitems:roomitems,
            chosenIndex:index,
            user:flag
        })
        io(url).on('connect', ()=>{
            console.log('connect');
            socket.on('messages', data => {
                //返回用户列表
                console.log('111')
                })
            })

        if(flag)
            console.log("新用户d5ea4473-43c3-4dfb-94af-eea381d3848e加入房间")
        else
        {
            console.log("新用户3sdsd56c-438f-45fd-baf7-sd56c28q9x4c加入房间")
            msgArr[0]=[{
            isMe:false,
            name:"Linvanuevi",
            message:"这是一条测试信息",
            isBolder:isBolder
        }]
            setTimeout(()=>{
                this.setState({
                    messageArr:msgArr
            })},
                5000)
        }

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
        const {username}=this.props.location.state
        const {isUpload,isBolder,chosenIndex,user,startFake}=this.state
        let msg
        if(user)
      {
        if(isUpload)
        {
            console.log("用户d5ea4473-43c3-4dfb-94af-eea381d3848e在房间__"+this.state.chosenIndex+"__请求发送文件")
            msg=listfile.map((item,index)=>
                <span className='fileClip' key={index}><Icon type="paper-clip" />{item.name}</span>
            )
        }
        else
            msg=this.state.inputMessage
        if(msgArr[chosenIndex]==null)
            {msgArr[chosenIndex]=[{
                isMe:true,
                name:user?"Linvanuevi":username,
                message:msg,
                isBolder:isBolder
                }]
            }
        else
            msgArr[chosenIndex].push({
                isMe:true,
                name:user?"Linvanuevi":username,
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
          if(startFake===0)
         { setTimeout(
              ()=>{
                  msgArr[0].push({
                      isMe:false,
                      name:"aaaaaaaa",
                      message:"这也是一条测试信息啊",
                      isBolder:isBolder
                  })
                  this.setState({
                      messageArr:msgArr,
                      isTwo:true,
                      startFake:startFake+1
                  })
              },
              8000
          )
         }
          }

        else
        {
            if (startFake===0)
           { msgArr[0].push({
                isMe:true,
                name:username,
                message:this.state.inputMessage,
                isBolder:isBolder
            })
            console.log(msgArr)
            this.setState({
                messageArr:msgArr,
                inputMessage:"",
                isUpload:false,
                isBolder:false,
                startFake:startFake+1
            })
            setTimeout(
                ()=>{
                    msgArr[0].push({
                        isMe:false,
                        name:"Linvanuevi",
                        message:"什么什么什么什么",
                        isBolder:isBolder
                        })
                    this.setState({
                        messageArr:msgArr,
                        })
                    },
                    8000
                )}
            else
            {
                if(msgArr[chosenIndex]==null)
                {msgArr[chosenIndex]=[{
                    isMe:true,
                    name:user?"Linvanuevi":username,
                    message:msg,
                    isBolder:isBolder
                }]
                }
                else
                    msgArr[chosenIndex].push({
                        isMe:true,
                        name:user?"Linvanuevi":username,
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
        }
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
        const {messageArr,inputMessage,roomitems,chosenIndex,video,user,isTwo}=this.state

        const onlinePeople=(
            <div>
                <p>
                    <Avatar shape="square" size="small" icon="user" />
                    <span className='onlineName'>Linvanuevi</span>
                </p>
                {
                    user?
                        isTwo?
                            <p>
                                <Avatar shape="square" size="small" icon="user" />
                                <span className='onlineName'>aaaaaaaa</span>
                            </p>: null
                        :
                        <p>
                            <Avatar shape="square" size="small" icon="user" />
                            <span className='onlineName'>aaaaaaa</span>
                        </p>

                }
            </div>
        )
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
                        <div className='videoPart' style={{display:video}}>
                            {
                                user?
                                    isTwo?<VideoCamera history={this.props.history} />:<VideoCamera2 />
                                    :<VideoCamera history={this.props.history} />
                            }
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
                                        isBolder={item.isBolder}
                                        user={this.state.user}
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

