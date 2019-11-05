import React,{Component} from 'react'
import {Icon,Input,Card,Avatar,Upload, message,Popover,Button} from 'antd'
import '../roompage/roompage.css'
import './bigvideo.css'
import '../videocamera/videocamera.css'
import Draggable from 'react-draggable';

const { TextArea } = Input;
const { Search } = Input;

export default class BigVideo extends Component{
//这里没写props 应该写props的 roomitem这种
    state={
        roomitems:[
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
        chosenIndex: 0
    }
    componentDidMount() {

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({video:{ width: 800, height: 600 },audio:false},function(stream){
            //将采集到的视频信息显示在video标签中
            document.getElementById('iv').srcObject=stream
             document.getElementById('iv2').srcObject=stream
        },console.log)
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({video:{ width: 200, height: 150 },audio:false},function(stream){
            //将采集到的视频信息显示在video标签中
            document.getElementById('iv3').srcObject=stream
        },console.log)

    }
    handleRoom = (value)=>{
        const {roomitems}=this.state
        let i=roomitems.findIndex(
            (item)=>item.title===value)
        this.setState(
            {chosenIndex:i}
        )
    }
    render(){
        const {roomitems,chosenIndex}=this.state
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
                                        <Avatar
                                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                            size="large"
                                        />
                                    <span className='title' >{item.title}</span>
                                    <span className='description'>{item.description}</span>
                                </Card>

                            )
                        })
                    }
                </div>
                <div className="roomConetnt">
                    <Icon type="left" style={{fontSize:"32px"}}/>
                    <div className="videoAll">
                        <Draggable>
                            <div className='videos videoBig'>
                                <Icon type="camera"
                                      theme="filled"
                                      style={{fontSize:'20px',
                                          position:"absolute",
                                          bottom:-5,
                                          left:-14,
                                          zIndex:5}}
                                      onClick={this.toBig}
                                />
                                <video src="" id="iv" autoPlay="autoPlay" />
                            </div></Draggable>
                        <Draggable>
                            <div className='videos videoBig viedeoright'>
                                <Icon type="camera"
                                      theme="filled"
                                      style={{fontSize:'20px',
                                          position:"absolute",
                                          bottom:-5,
                                          left:-14,
                                          zIndex:5}} />
                                <video src="" id="iv2" autoPlay="autoPlay" />
                            </div></Draggable>
                        <Draggable>
                            <div className='videos videoSmall viedeoright'>
                                <Icon type="camera"
                                      theme="filled"
                                      style={{fontSize:'20px',
                                          position:"absolute",
                                          bottom:-5,
                                          left:-14,
                                          zIndex:5}} />
                                <video src="" id="iv3" autoPlay="autoPlay" />
                            </div></Draggable>
                    </div>
                </div>
            </div>
        )
    }
}
