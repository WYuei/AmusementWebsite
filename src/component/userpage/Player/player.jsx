import React,{Component} from 'react'
import './player.css'
export default class Player extends Component{
    state={
        tracks:
{           name: "元日",
            artists: [
                {
                    name: "于文华",
                }
                ],
            album: {
                name: "国学唱歌集",
                picUrl: "http://p3.music.126.net/SR9eFEjRB0NsscxN7-fHMw==/3344714372906000.jpg",
            },
            duration: 136829,
            mp3Url: "http://m2.music.126.net/rUcfqqZbq7TIfJeAHfTrkw==/3376600210116829.mp3"
},
        currentTrackLen: 1, //歌单歌曲数
        currentTrackIndex: 0, //当前播放的歌曲索引，默认加载第一首歌
        currentTime: 0, //当前歌曲播放的时间
        currentTotalTime: 0, //当前歌曲的总时间
        playStatus: true, //true为播放状态，false为暂停状态
    }
    updatePlayStatus=()=>{
        let audio = document.getElementById('audio');
        if(this.state.playStatus){
            audio.play();
        }else{
            audio.pause();
        }

        //更新当前歌曲总时间
        this.setState({
            currentTotalTime: this.state.tracks.duration / 1000}
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
            alert('已经没有上一首了');
        }else{
            this.setState({currentTrackIndex:--this.state.currentTrackIndex},()=>{
                this.updatePlayStatus();
            });
        }
    }
    next =()=>{
        if(this.state.currentTrackIndex + 1 >=  this.state.currentTrackLen){
            alert('已经没有下一首了');
        }else{
            this.setState({currentTrackIndex:++this.state.currentTrackIndex},()=>{
                this.updatePlayStatus();
            });
        }
    }
    componentDidMount() {
        this.updatePlayStatus();
        setInterval(()=>{
            let audio = document.getElementById('audio');
            this.setState({currentTime:audio.currentTime},()=>{
                if(~~this.state.currentTime >= ~~this.state.currentTotalTime){
                    this.next();
                }
            });
        }, 300);
    }

    render(){
        return (
            <div className="player">
                {/* 播放器名称  */}
                <div className="header">音乐播放器.React版</div>

                {/* 音乐信息  */}
                <TrackInfo track={this.state.tracks} />

                {/* 播放进度条   */}
                <Progress progress={this.state.currentTime / this.state.currentTotalTime * 100 + '%'} />

                {/* 播放控制  */}
                <Controls isPlay={this.state.playStatus} onPlay={this.play} onPrevious={this.previous} onNext={this.next} />

                {/* 播放时间   */}
                <Time currentTime={this.state.currentTime} currentTotalTime={this.state.currentTotalTime} />

                {/* 音频控件  */}
                <audio id="audio" src={require('../../../music/asong.mp3')} >
                    Your browser does not support the audio element.
                </audio>
            </div>
        )
    }
}

class TrackInfo extends Component{
    render() {
        return (
            <div>
                <div className="albumPic" style={{'backgroundImage':'url('+ this.props.track.album.picUrl +')'}}></div>
                <div className='trackInfo'>
                    <div className="name">{this.props.track.name}</div>
                    <div className="artist">{this.props.track.artists[0].name}</div>
                    <div className="album">{this.props.track.album.name}</div>
                </div>
            </div>
        );
    }
}
class Progress extends Component{
    render() {
        return(
            <div className="progress" style={{'width':this.props.progress}}></div>
        )
    }
}
class Controls extends Component{
    render() {
        let className;
        if(this.props.isPlay === true){
            className = 'icon-pause';
        }else{
            className = 'icon-play';
        }
        return (
            <div className="controls">
                <div className="play" onClick={this.props.onPlay}>
                    <i className={className}></i>
                </div>
                <div className="previous" onClick={this.props.onPrevious}>
                    <i className="icon-previous"></i>
                </div>
                <div className="next" onClick={this.props.onNext}>
                    <i className="icon-next"></i>
                </div>
            </div>
        )
    }
}
class Time extends Component{
    timeConvert=(timestamp)=>{
        var minutes = Math.floor(timestamp / 60);
        var seconds = Math.floor(timestamp - (minutes * 60));

        if(seconds < 10) {
            seconds = '0' + seconds;
        }

        timestamp = minutes + ':' + seconds;
        return timestamp;
    }
    render() {
        return(
            <div className="time">
                <div className="current">{this.timeConvert(this.props.currentTime)}</div>
                <div className="total">{this.timeConvert(this.props.currentTotalTime)}</div>
            </div>
        )
    }
}
