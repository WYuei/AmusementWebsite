import React,{Component} from 'react'
import LikesItem from "./likesitem/likesitem";
import Player from "./Player/player";
export default class UserPage extends Component{
    state={
        data:[]
    }
    componentDidMount() {
        const data= this.props.location.state;
        const {username}=data;
        fetch('http://localhost:8080/userlikes',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'name='+username
            }
        )
            .then(res => res.json())
            .then(res =>
            {
                let data=res.data
                console.log(data)
                this.setState(
                    {
                        data:data
                    }
                )

            })
            .catch(e => console.log('错误:', e))
    }

    render(){
        const {data}=this.state
        return (
            <div>
               <ul>
                   {
                       data.map((item,index)=>
                           <li key={index}>
                               {item.muciName}
                               {item.SingerName}
                               {item.ID}
                           </li>
                       )
                   }
               </ul>
                <Player/>
            </div>
        )
    }
}
