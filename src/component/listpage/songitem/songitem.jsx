import React,{Component} from 'react'
import {Icon} from 'antd'
import './songitem.css'
export default class SongItem extends Component{
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
    }
    render(){
        const {rankNumber,songname,artist,time,url,poster}=this.props
        return (
            <div>
                <div className='songCard'>
                        <span className='rankNumber'>
                            {rankNumber+1}
                        </span>
                        <img src={poster} style={{width:50,height:50}}/>
                        <span className='songname'>
                            {songname}
                        </span>

                        <a onClick={this.handleClick}>
                            <Icon type="more"  style={{ fontSize: '30px',marginRight:15,float:"right"  }}/>
                        </a>
                        <a onClick={this.addHeart}>
                        <Icon type="heart" style={{ fontSize: '30px',marginRight:15,float:"right" }} />
                        </a>
                        <a href={url} target="_blank">
                        <Icon type="link"  style={{ fontSize: '30px',marginRight:15,float:"right"  }}/>
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
