import React,{Component} from 'react'
import {Icon} from 'antd'
import './songitem.css'
export default class SongItem extends Component{
    handleClick=()=>{
        const {rankNumber,updateInfoIndex}=this.props
        updateInfoIndex(rankNumber)
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
                        <Icon type="heart" style={{ fontSize: '30px',marginRight:15,float:"right" }} />
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
