import React,{Component} from 'react'
import {Card} from 'antd'
import './roomitem.css'
import 'antd/dist/antd.css'
const { Meta } = Card;
export default class RoomItem extends Component{
    constructor(props){
        super(props)
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
            >
                <Meta title={title} description={description} />
            </Card>
        )
    }
}
/**/
