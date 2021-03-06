import React,{Component} from 'react'
import {Icon,Drawer} from 'antd'
import './songitem.css'
import io from "socket.io-client";

const url='ws://localhost:8080'
const socket = io(url);
export default class SongItem extends Component{
    state={
        roomdata:[
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
        visible: false,
        click:false
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    handleClick=()=>{
        const {rankNumber,updateInfoIndex}=this.props
        updateInfoIndex(rankNumber)
    }
    addHeart=()=>{
        const {rankNumber,username}=this.props
        fetch('http://localhost:8080/userlikes/add',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'name='+username+rankNumber
            }
        )
            .then(res => res.json())
            .then(res =>
            {
               let msg=res.msg
                console.log(msg)

            })
            .catch(e => console.log('错误:', e))
        this.setState({
            click:true
        })
    }
    handleShare=()=>{
        const {songname,artist}=this.props
        socket.emit('chat message','[音乐]'+songname+'-'+artist)
        this.showDrawer()
    }
    handleIn=()=>{
        const {songname,artist}=this.props
        let path={
           pathname:'/views/roompage',
           state:{
               msg:'[音乐]'+songname+'-'+artist,
               roomitems:this.state.roomdata,
               username:'Linvanuevi',
               index:0
           }
       }
       this.props.history.push(path)
    }
    render(){
        const {rankNumber,songname,artist,time,url,poster,history}=this.props
        const {roomdata,click}=this.state
        return (

            <div>
                <Drawer
                    title="Which room do you want to share?"
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    {roomdata.map((item,index)=>{
                        return (<a onClick={this.handleIn} className='alist'><li className='classList' key={index}>{item.title}</li></a>)
                })}
                </Drawer>
                <div className={rankNumber%2===0?'songCard01':'songCard02'}>
                        <span className='rankNumber'>
                            {rankNumber+1}
                        </span>
                        <img src={poster} style={{width:70,height:70}}/>
                        <span className='songname'>
                            {songname}
                        </span>

                        <a onClick={this.handleClick}>
                            <Icon className='moreIcon' type="more"  style={{ fontSize: '30px',marginRight:15,float:"right"  }}/>
                        </a>
                        <a onClick={this.handleShare}>
                            <Icon className='branchIcon' type="share-alt" style={{ fontSize: '30px',marginRight:15,float:"right"  }} />
                        </a>
                        <a onClick={this.addHeart}>
                            <Icon className='blingIcon' type="heart" theme={click?'filled':'outlined'}  style={{ fontSize: '30px',marginRight:15,float:"right",color:click?'rgb(207,80,34)':"" }} />
                        </a>
                        <a href={url} target="_blank">
                        <Icon className='urlIcon' type="link"  style={{ fontSize: '30px',marginRight:15,float:"right"  }}/>
                        </a>
                        <span className='time'>
                            {time}
                            </span>
                        <span className='artist'>
                            {artist}
                        </span>

                </div>
            </div>
        )
    }
}
