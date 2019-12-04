import React,{Component} from 'react'
import './songinfo.css'
export default class SongInfo extends Component{
    state={
        word:'',
        title:'',
        artist:'',
        posturl:'',
        tags:'',
        vocal:'',
        rhyme:'',
        wordCreatedby:''
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

    render(){
        const {word,title,artist,posturl,tags,vocal,rhyme,wordCreatedby}=this.state
        return (
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
        )
    }
}
