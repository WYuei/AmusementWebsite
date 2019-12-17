import React,{Component} from 'react'
import {Icon,Rate,Avatar,Tag } from "antd";
import './songinfo.css'
import CommentItem from "./comments/commentitem";
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
let arr=['1']
const tagsColor=["#f50","#2db7f5","#87d068","#108ee9"]
export default class SongInfo extends Component{
    constructor(props)
    {
        super(props)
        this.state={
            chosenIndex:props.cIndex,
            lastIndex:-1,
            word:'',
            title:'',
            artist:'',
            posturl:'',
            tags:'',
            vocal:'',
            rhyme:'',
            wordCreatedby:'',
            value: 3,
            comments:[
                {
                    name:'可可可乐',
                    title:'有时候来不及沉淀，岁月总是跑在灵魂的前面',
                    src:'http://211.137.107.15:11001/sme/uniaccess?code=MWQwMDEwMDBCaVdzVG51cjA2fDIwODgwMTA0MTgyNDE1%7CCF367C6E8872E823364CEFB180BA1E6395E4AB94D1D8A101798B024E0F290FFF'
                },
                {
                    name:'Dream',
                    title:'一如亡命之徒所说，我们都不在意未来的日子，我们都只活一次。也只有眼前亮起来了以后，才有机会相信它的价值。',
                    src:'http://211.137.107.15:11001/sme/uniaccess?code=MWQwMDEwMDBCaFUzWmhYaTA2fDIwODgwMTA0MTgyNDE1%7C7882C5B0611A1189D0229BE83949CB94A9F0BF23A722922C6A9E44C48F789992'
                }
            ]
        }
    }


    componentWillReceiveProps(nextprops)
    {
        console.log('net',nextprops.cIndex)
        if(nextprops.cIndex!==this.state.chosenIndex){

            const c=nextprops.cIndex
            console.log('now',c)
            fetch('http://localhost:8080/singword/',
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'key='+c
                }
            )
                .then(res => res.json())
                .then(res =>
                {
                    let str=res.msg
                    let data=res.data[0]
                    this.dealTags(data.tags)
                    this.setState({
                        word:str,
                        title:data.title,
                        artist:data.artist,
                        posturl:data.posterurl,
                        tags:data.tags,
                        vocal:data.vocal,
                        rhyme:data.rhyme,
                        wordCreatedby:data.word,
                        chosenIndex:c
                    })

                })
                .catch(e => console.log('错误:', e))
        }
    }

    /*componentDidUpdate(prevProps){
        console.log('pre',prevProps.cIndex)
        if(prevProps.cIndex!==this.state.chosenIndex){

           this.setState(
               {chosenIndex:prevProps.cIndex}
           );
            const {chosenIndex}=this.state
            console.log('now',chosenIndex)
            fetch('http://localhost:8080/singword/',
                {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: 'key='+chosenIndex
                }
            )
                .then(res => res.json())
                .then(res =>
                {
                    let str=res.msg
                    let data=res.data[0]
                    this.dealTags(data.tags)
                    this.setState({
                        word:str,
                        title:data.title,
                        artist:data.artist,
                        posturl:data.posterurl,
                        tags:data.tags,
                        vocal:data.vocal,
                        rhyme:data.rhyme,
                        wordCreatedby:data.word
                    })

                })
                .catch(e => console.log('错误:', e))
        }
    }*/

   componentDidMount() {
       const {chosenIndex}=this.state
       fetch('http://localhost:8080/singword/',
           {
               method: "POST",
               mode: "cors",
               headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
               },
               body: 'key='+chosenIndex
           }
       )
           .then(res => res.json())
           .then(res =>
           {
               let str=res.msg
               let data=res.data[0]
               this.dealTags(data.tags)
               this.setState({
                   word:str,
                   title:data.title,
                   artist:data.artist,
                   posturl:data.posterurl,
                   tags:data.tags,
                   vocal:data.vocal,
                   rhyme:data.rhyme,
                   wordCreatedby:data.word
               })

           })
           .catch(e => console.log('错误:', e))
   }


    dealTags=(tags)=>{
        const len=tags.length;
        arr=[];
        let str='';
        let flag=false;
        for(let i=3;i<len;i++)
        {
            if(tags[i]!==" ")
                    str+=tags[i];
            else
                {
                    arr.push(str);
                    str='';
                }
        }
        console.log(arr)
    }
    handleChange = value => {
        this.setState({ value });
    };
    render(){
        const {word,title,artist,tags,vocal,rhyme,wordCreatedby,value,posturl,comments}=this.state
        return (
            <div>
                <div className='INFO'>
                    <div className='forBacPic'>
                    <div className='songPOST'>
                        <img src={posturl}/>
                    </div>
                    <p className='songTITLE'>
                        {title}
                    </p>
                    <p className='songARTIST'>
                        <Avatar className='artistAva' style={{ backgroundColor: 'rgb(207,80,34)' }} icon="user" />{artist}
                    </p>
                    <p className='songRHYME'>
                        {rhyme}
                    </p>
                    <p className='wordBY'>
                        {wordCreatedby}
                    </p>
                    <p className='songALBUM'>
                        {vocal}
                    </p>
                    <p className='songTAGS'>
                        {
                            arr.map((item,index)=>{
                                return (<Tag key={index} style={{fontSize:15}} color={tagsColor[index]}>{item}</Tag>)
                            })
                        }
                    </p>
                    </div>
                    <pre className='infoContent'>
                        {word}
                    </pre>
                </div>
                <div className='showIdea'>
                    <Rate className='idea02' disabled defaultValue={2} />
                    <span>
                        <Rate className='idea01' tooltips={desc} onChange={this.handleChange} value={value} />
                         {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                    </span>
                    <Icon className='ICONICON' type="heart" style={{ fontSize: '30px',marginRight:15,float:"right" }} />
                    <Icon className='ICONICON2' type="dislike" style={{ fontSize: '30px',marginRight:15,float:"right" }}/>
                    <Icon className='ICONICON3' type="like" theme="filled" style={{ fontSize: '30px',marginRight:15,float:"right" }}/>
                </div>
                <div>
                    <CommentItem comments={comments[0]}/>
                    <CommentItem comments={comments[1]}/>
                </div>
            </div>

        )
    }
}
