import React,{Component} from 'react'
import {Icon,Rate,Avatar,Tag } from "antd";
import './songinfo.css'
import CommentItem from "./comments/commentitem";
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
let arr=['1']
const tagsColor=["#f50","#2db7f5","#87d068","#108ee9"]
export default class SongInfo extends Component{
    state={
        word:'',
        title:'',
        artist:'',
        posturl:'',
        tags:'',
        vocal:'',
        rhyme:'',
        wordCreatedby:'',
        value: 3,
    }

   componentDidMount() {
       fetch('http://localhost:8080/singword/',
           {
               method: "POST",
               mode: "cors",
               headers: {
                   "Content-Type": "application/x-www-form-urlencoded"
               },
               body: 'key='+0
           }
       )
           .then(res => res.json())
           .then(res =>
           {
               let str=res.msg
               let data=res.data[0]
               /* let result = "";
              let c;
               for (let i = 0; i < str.length; i++) {
                   c = str.substr(i, 1);
                   if ( c == "\n")
                       result = result + " \r\n ";
                   else if (c != "\r")
                       result = result + c;
               }*/
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
        const {word,title,artist,tags,vocal,rhyme,wordCreatedby,value,posturl}=this.state
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
                    <CommentItem/>
                    <CommentItem/>
                </div>
            </div>

        )
    }
}
