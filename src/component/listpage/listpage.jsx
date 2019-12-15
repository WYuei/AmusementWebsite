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
                    <h2 className='title01'>音乐榜单</h2>
                    <h2 className='title02'>更新至12-03</h2>
                </div>
                <div className='horseLight'>
                    <Carousel autoplay style={{height:100}}>
                        <div className='first'>
                            <h4>感受停在我发端的指尖</h4>
                            <h4>如何瞬间 冻结时间</h4>
                        </div>
                        <div className='second'>
                            <h4>命运就算颠沛流离 命运就算曲折离奇 命运就算恐吓着你做人没趣味</h4>
                            <h4>别流泪心酸更不应舍弃 我愿能一生永远陪伴你</h4>
                        </div>
                        <div className='third'>
                            <h4>Where the north wind meets the sea</h4>
                            <h4>There's a river full of memory</h4>
                            <h4>Sleep my darling safe and sound</h4>
                        </div>
                        <div className='forth'>
                            <h4>青春是永远百折不挠的成长
                                陪伴我们的 还有自信与坚强</h4>
                            <h4>这是我们最荣耀的战场
                                为梦想而战要赢得够漂亮
                                我们因胜利拥抱欢呼欣喜若狂
                                度过无数闪亮时光</h4>
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
