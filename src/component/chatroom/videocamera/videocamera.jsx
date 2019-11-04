import React,{Component} from 'react'
import {Icon} from 'antd'
import './videocamera.css'
export default class VideoCamera extends Component{
    componentDidMount() {
        let pc = new RTCPeerConnection();
        let dc = pc.createDataChannel("my channel");

        dc.onmessage = function (event) {
            console.log("received: " + event.data);
        };

        dc.onopen = function () {
            console.log("datachannel open");
        };

        dc.onclose = function () {
            console.log("datachannel close");
        };
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
    }

    render(){

        return (
            <div className='videos'>
                <Icon type="camera"
                      theme="filled"
                      style={{fontSize:'20px',
                    position:"absolute",
                    bottom:-5,
                    left:-14,
                    zIndex:5}} />
                <video />
            </div>
        )
    }
}
