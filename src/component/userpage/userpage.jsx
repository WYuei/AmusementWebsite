import React,{Component} from 'react'
import LikesItem from "./likesitem/likesitem";
export default class UserPage extends Component{
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
                console.log(res)

            })
            .catch(e => console.log('错误:', e))
    }

    render(){
        return (
            <div>
                userpage
                <LikesItem/>
            </div>
        )
    }
}
