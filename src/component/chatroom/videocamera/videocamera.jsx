import React,{Component} from 'react'
import {Icon} from 'antd'
import './videocamera.css'
import Draggable from 'react-draggable';
export default class VideoCamera extends Component{
    constructor(props){
        super(props)
    }
    componentDidMount() {
        let pc = new RTCPeerConnection();
        let dc = pc.createDataChannel("my channel");
        const constraints = { audio: true,
        video: { width: 300, height: 200 } };
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function(mediaStream) {
                let video = document.querySelector('video');
                video.srcObject = mediaStream;
                video.onloadedmetadata = function(e) {
                    video.play();
                };
            })
            .catch(function(err)
            { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({video:{ width: 300, height: 200 },audio:false},function(stream){
            //将采集到的视频信息显示在video标签中
            document.getElementById('iv').srcObject=stream
           // document.getElementById('iv2').srcObject=stream
        },console.log)

    }

    toBig=()=>{
        this.props.history.push('/views/bigvideo')
    }
    render(){

        return (
            <div className="videoAll">
                <Draggable>
                    <div className='videos'>
                    <Icon type="camera"
                          theme="filled"
                          style={{fontSize:'20px',
                              position:"absolute",
                              bottom:-5,
                              left:-14,
                              zIndex:5}}
                          onClick={this.toBig}
                    />
                    <video />
                    </div></Draggable>
                <Draggable>
                <div className='videos viedeoright'>
                    <Icon type="camera"
                          theme="filled"
                          style={{fontSize:'20px',
                              position:"absolute",
                              bottom:-5,
                              left:-14,
                              zIndex:5}} />
                    <video src="" id="iv" autoPlay="autoPlay" />
                </div></Draggable>
            </div>

        )
    }
}
