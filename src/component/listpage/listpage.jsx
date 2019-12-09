import React,{Component} from 'react'
import { Carousel,Empty } from 'antd';
import './listpage.css'
import SongItem from "./songitem/songitem";
import SongInfo from "./songinfo/songinfo";

export default class ListPage extends Component{
    state={
        sqlArr:[],
        num:3,
        chosenIndex:0,
        musicList:[
            {
                muciName:'Loading',
                SingerName:'Loading',
                time:'Loading',
                url:'Loading',
                posterurl:'Loading'
            },
        ]
    }
    componentDidMount() {
        fetch('http://localhost:8080/musicRank')
            .then(res => res.json())
            .then(res =>
            {
                    console.log(res)
                    this.setState({
                        musicList:res.data
                    });

            })
            .catch(e => console.log('错误:', e))
    }

    updateInfoIndex =(index)=>{
        this.setState({
            chosenIndex:index
        })
    }

    render(){
        const data= this.props.location.state;
        const {username}=data;
        const {musicList}=this.state
        console.log(musicList)
        return (
            <div>
                <div className='musicRankTitle'>
                    <div className='musicRankTitlePic'>
                        <img src={require('../../img/music0.png')} style={{width:200,height:200}}/>
                    </div>
                    <h2>音乐榜单</h2>
                    <h2>更新至12-03</h2>
                </div>
                <div className='horseLight'>
                    <Carousel autoplay style={{height:100}}>
                        <div className='first'>
                            <h3>1</h3>
                        </div>
                        <div className='second'>
                            <h3>2</h3>
                        </div>
                        <div className='third'>
                            <h3>3</h3>
                        </div>
                        <div className='forth'>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </div>
                <div className='songlist'>
                   {
                           musicList.map((item,index)=>
                                    <SongItem
                                        key={index}
                                        rankNumber={index}
                                        songname={item.muciName}
                                        artist={item.SingerName}
                                        time={item.time}
                                        url={item.url}
                                        poster={item.posterurl}
                                        updateInfoIndex={this.updateInfoIndex}
                                        username={username}
                                        history={this.props.history}
                                    />
                                )
                   }
                </div>
                <div className='songContent'>
                    <SongInfo />
                </div>

            </div>
        )
    }
}
