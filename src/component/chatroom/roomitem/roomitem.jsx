import React,{Component} from 'react'
import {Card} from 'antd'
import './roomitem.css'
import 'antd/dist/antd.css'
const { Meta } = Card;
export default class RoomItem extends Component{
    constructor(props){
        super(props)
    }
    handleIn=()=>{
        const {roomitems,index}=this.props
        let path={
            pathname:'/views/roompage',
            state:{
                roomitems:roomitems,
                index:index
            }
        }
        this.props.history.push(path)
    }
    render(){
        const {title,description}=this.props
        return (

            <Card
                hoverable
                style={{
                    width: 180,
                    float:"left",
                    margin:30,
                    height:300
                }}
                cover={<img  src={require('../../../img/1.jpg')} />}
                className='shake-rotate'
                onClick={this.handleIn}
            >
                <Meta title={title} description={description} />
            </Card>
        )
    }
}
/**/
