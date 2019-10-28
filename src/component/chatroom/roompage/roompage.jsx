import React,{Component} from 'react'
//import './roompage.css'
export default class RoomPage extends Component{

    render(){
        return (
            <div>
                <div id="chat">
                    <div className="msgs" id="msgs"></div>
                    <input type="file" id="fileIpt" className="fileIpt"/>
                        <button
                            id="sendFileBtn"
                            className="sendFileBtn"
                        >发送文件</button>
                        <input type="text" id="msgIpt" className="msgIpt"/>
                            <button id="sendBtn" className="sendBtn">发送</button>
                </div>
                <div id="videos">
                    <video id="me" autoPlay></video>
                </div>
                <div id="files">
                </div>
            </div>
        )}}

