import React,{Component} from 'react'
export default class ListPage extends Component{
    state={
        sqlArr:[],
        num:3
    }
    handleSql=()=>{
        fetch('http://localhost:8080/',
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: 'key='+this.state.num
            }
            )
            .then(res => res.json())
            .then(data =>
            {       console.log(data)
                this.setState(
                    {
                        sqlArr:data.data
                    }
                )
            })
            .catch(e => console.log('错误:', e))
    }
    render(){
        const sqlarr=this.state.sqlArr
        return (
            <div>
                list page here
                <button onClick={this.handleSql}>SQL</button>
                {
                    sqlarr.map(
                        (item,index)=>{
                            return (
                                <p key={index}>{item.name}</p>
                            )
                        }
                    )
                }
            </div>
        )
    }
}
