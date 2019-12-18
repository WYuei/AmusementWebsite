import React,{Component} from 'react'

import {withRouter} from 'react-router-dom'

import './homepage.css'
import LoginForm from "../loginform/loginform";
class HomePage extends Component{
    constructor(props){
        super(props)
    }
    scrollWindow =() =>{ /*缓慢移动*/
        let currentPosition,timer;
        let speed=15;
        timer=setInterval(()=>{
            currentPosition=document.documentElement.scrollTop || document.body.scrollTop;
            currentPosition+=speed; //speed变量
            if(currentPosition<1300){
                window.scrollTo(0,currentPosition);
            }else{
                window.scrollTo(0,1300);
                clearInterval(timer);
            }
        },1);
    }

    componentDidMount() {
        fetch('http://localhost:8080/download')
            .then(res => res.json())
            .then(res =>
            {
                console.log('http://localhost:8080/download/file.txt')
                window.open('http://localhost:8080/download/file.txt')
            })
            .catch(e => console.log('错误:', e))
    }
   downloadFile=(url)=>{
    }
    render(){
        return (
            <div id="intro">
                <div className="intro-body">
                    <div className="container">
                        <div className="row">
                            <div id="context" className="col-md-10 col-md-offset-1">
                                <h1>We are <span className="brand-heading">Connected</span></h1>
                                <p className="intro-text">An amusement website homework of WangYuWei</p>
                                <a className="btn btn-default2 page-scroll" onClick={this.scrollWindow} >Learn More</a>


                            </div>
                        </div>
                        <LoginForm history={this.props.history}/>
                    </div>
                </div>
            </div>

        )
    }
}

export default withRouter(HomePage)
