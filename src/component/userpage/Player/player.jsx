import React,{Component} from 'react'
import {Icon,message,Popover,Slider} from 'antd'
import './player.css'
const title=(
    <p className='popTitle'>
        <Icon className='starIcon' type="star" />
        播放列表
    </p>
)
export default class Player extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            playerList:props.playList,
            currentTrackLen:1, //歌单歌曲数
            currentTrackIndex: 0, //当前播放的歌曲索引，默认加载第一首歌
            currentTime: 0, //当前歌曲播放的时间
            currentTotalTime: 0, //当前歌曲的总时间
            playStatus: true, //true为播放状态，false为暂停状态
        }
    }
    updatePlayStatus=()=>{
        let audio = document.getElementById('audio');
        if(this.state.playStatus){
            audio.play();
        }else{
            audio.pause();
        }
        const {currentTrackIndex,playerList}=this.state
        //更新当前歌曲总时间
        this.setState({
            currentTotalTime: playerList[currentTrackIndex].duration / 1000}
            );
    }
    play=()=>{
        this.setState(
            {playStatus:!this.state.playStatus},
            ()=>{
            this.updatePlayStatus();
        });
    }
    previous=()=>{
        if(this.state.currentTrackIndex - 1 < 0){
            message.error('已经没有上一首了，快对播放列表进行填装~！');
        }else{
            this.setState({
                currentTrackIndex:--this.state.currentTrackIndex,
                currentTime:0
            },()=>{
                this.updatePlayStatus();
            });
        }
    }
    next =()=>{
        if(this.state.currentTrackIndex + 1 >=  this.state.currentTrackLen){
            message.error('已经没有下一首了，快对播放列表进行填装~！');
        }else{
            let audio = document.getElementById('audio');
            audio.currentTime=0;
            this.setState({
                currentTrackIndex:++this.state.currentTrackIndex,
                currentTime:0
            },()=>{
                this.updatePlayStatus();
            });
        }
    }
    componentDidMount()
        {
        this.updatePlayStatus();
        setInterval(()=>{
            const {playerList}=this.state
            let audio = document.getElementById('audio');
            if(this.state.playStatus)
                this.setState({
                    currentTime:audio.currentTime,
                    currentTrackLen:playerList.length
                },()=>{
                if(~~this.state.currentTime >= ~~this.state.currentTotalTime){
                    this.next();
                }
            });
        }, 300);
    }

    render()
        {
        const {currentTrackIndex,playerList,currentTrackLen}=this.state;
        const content = (
                <div>
                    { playerList.map((item,index)=>
                        {
                            if(index!==0)
                                return (
                                    <p key={index} className={index===currentTrackIndex?'nowItem':'otherItem'}>
                                        {index===currentTrackIndex?
                                            <Icon type="loading" />:null}
                                        {index}.{item.name}-{item.artists}
                                    </p>
                            )
                        })
                    }
                </div>
            );
        return (
            <div className="player">

                <div className='musicPost'>
                    <img src={playerList[currentTrackIndex].poster} style={{width:100,height:100}}/>
                </div>
                <div className='trackInfo'>
                    <div className="name">{playerList[currentTrackIndex].name} / {playerList[currentTrackIndex].artists}</div>
                    <Time currentTime={this.state.currentTime} currentTotalTime={this.state.currentTotalTime} />
                </div>

                {/* 播放进度条   */}
                <Progress progress={this.state.currentTime / this.state.currentTotalTime * 100 + '%'} />

                {/* 播放控制  */}
                <Controls isPlay={this.state.playStatus} onPlay={this.play} onPrevious={this.previous} onNext={this.next} />

                <div className='icons'>
                    <Icon className='heartIcon' type="heart" theme="filled" />
                    <Icon className='orderIcon' type="ordered-list" />
                    <Popover className='soundPop' placement="topRight" content={
                        <Slider className='sliderSound' defaultValue={30} tooltipVisible />
                    }>
                    <Icon className='soundIcon' type="sound" />
                    </Popover>
                    <Popover className='popoverItem' placement="topRight" content={content} title={title}>
                        <Icon className='menuIcon' type="menu-unfold" />
                    </Popover>
                </div>
                {/* 音频控件  */}
                {
                    <audio id="audio" src={require('../../../music/asong'+currentTrackIndex+'.mp3')} >
                    Your browser does not support the audio element.
                    </audio>

                }
            </div>
        )
    }}

class Progress extends Component
{
    render() {
        return(
            <div className="progressParent">
                <div className="progress" style={{'width':this.props.progress}}></div>
                <Icon className='iconprogress' type="heat-map" />
            </div>
        )
    }
}
class Controls extends Component{
    render() {
        let type;
        if(this.props.isPlay === true){
            type = 'pause-circle';
        }else{
            type = 'play-circle';
        }
        return (
            <div className="controls">

                <div className="previous" onClick={this.props.onPrevious}>
                    <Icon className='preIcon' type="step-backward" style={{fontSize:40}} />
                </div>
                <div className="play" onClick={this.props.onPlay}>
                    <Icon className='playIcon' type={type} theme="filled" style={{fontSize:50}} />
                </div>
                <div className="next" onClick={this.props.onNext}>
                    <Icon className='nextIcon' type="step-forward" style={{fontSize:40}}/>
                </div>
            </div>
        )
    }
}
class Time extends Component {
    timeConvert = (timestamp) => {
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }

    render() {
        return (
            <div className="time">
                <div
                    className="current">{this.timeConvert(this.props.currentTime)}/{this.timeConvert(this.props.currentTotalTime)}</div>
            </div>
        )
    }
}
