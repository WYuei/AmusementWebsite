import React,{Component} from 'react'
import {BrowserRouter as Router,Switch,Route,Redirect} from 'react-router-dom'
import HomePage from "../component/homepage/homepage";
import Views from "../component/views/views";
import ChatRoom from "../component/chatroom/chartroom";
export default class AllRouter extends Component{
    render(){
        return (
            <Router>
                <Switch>
                    <Redirect from='/' exact to='/homepage' />
                    <Route path={['/homepage','/HomePage']} exact component={HomePage}/>
                    <Route path='/views' exact component={Views}/>
                </Switch>
            </Router>
        )
    }
}
