import React,{Component} from 'react'
import './loginform.css'
export default class LoginForm extends Component{
    constructor(props)
    {
        super(props)
    }

    state={
        username:"123"
    }
    handleSubmit=(e)=>{
        let path={
            pathname:'/views',
            state:{
                username:this.state.username
            }
        }
        e.preventDefault()
        this.props.history.push(path)
    }

    handleUsername=(event)=>{
        const username=event.target.value.trim()
        this.setState({username:username})
    }
    render(){
        const {username}=this.state
        return (
            <div className="row" id="login">
                <form  className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="inputEmail3" className="col-sm-3 control-label">UserName</label>
                        <div className="col-sm-6">
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail3"
                                placeholder="UserName"
                                style={{opacity:0.8}}
                                onChange={this.handleUsername}
                                value={username}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword3" className="col-sm-3 control-label">Password</label>
                        <div className="col-sm-6">
                            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" style={{opacity:0.8}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-3 col-sm-10">
                            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Sign in</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
