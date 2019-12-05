import React,{Component} from 'react'
import {Icon,Rate} from "antd";
import './songinfo.css'
import CommentItem from "./comments/commentitem";
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
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
               console.log(str)
               console.log(data)
               /* let result = "";
              let c;
               for (let i = 0; i < str.length; i++) {
                   c = str.substr(i, 1);
                   if ( c == "\n")
                       result = result + " \r\n ";
                   else if (c != "\r")
                       result = result + c;
               }*/
               this.setState({
                   word:str,
                   title:data.title,
                   artist:data.artist,
                   posturl:data.posturl,
                   tags:data.tags,
                   vocal:data.vocal,
                   rhyme:data.rhyme,
                   wordCreatedby:data.word
               })

           })
           .catch(e => console.log('错误:', e))
   }

    handleChange = value => {
        this.setState({ value });
    };
    render(){
        const {word,title,artist,posturl,tags,vocal,rhyme,wordCreatedby,value}=this.state
        return (
            <div>
                <pre className='infoContent'>
                    <p className='songTITLE'>
                        {title}
                    </p>
                    <p className='songARTIST'>
                        {artist}
                    </p>
                    <p className='songALBUM'>
                        {posturl}
                    </p>
                    <p className='songTAGS'>
                        {tags}
                    </p>
                    {word}
                </pre>
                <div>
                    <span>
                        <Rate tooltips={desc} onChange={this.handleChange} value={value} />
                         {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
                    </span>
                    <Rate disabled defaultValue={2} />
                    <Icon type="heart" style={{ fontSize: '30px',marginRight:15,float:"right" }} />
                    <Icon type="like" style={{ fontSize: '30px',marginRight:15,float:"right" }}/>
                </div>
                <div>
                    <CommentItem/>
                    <CommentItem/>
                </div>
            </div>

        )
    }
}
