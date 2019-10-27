import React,{Component} from 'react'
import { Modal,Icon,Form, Input, Radio} from 'antd'

import RoomItem from "./roomitem/roomitem";
import './chatroom.css'

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends React.Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="Create a new chat room"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                    wrapClassName={'web'}
                >
                    <Form layout="vertical">
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of room!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Description">
                            {getFieldDecorator('description')(<Input type="textarea" />)}
                        </Form.Item>
                        <Form.Item className="collection-create-form_last-form-item">
                            {getFieldDecorator('modifier', {
                                initialValue: 'public',
                            })(
                                <Radio.Group>
                                    <Radio value="public">Public</Radio>
                                    <Radio value="private">Private</Radio>
                                </Radio.Group>,
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    },
);


export default class ChatRoom extends Component{
    state={
        roomdata:[
            {
                title:"Meet Friends",
                description:"created by a handsome boy"
            },
            {
                title:"大家好",
                description:"上午8：00到下午2：00都有人哦"
            },
            {
                title:"111111",
                description:"asdfhidsfn"
            },
            {
                title:"牧场物语直播",
                description:"欢迎同好们一起来交流"
            }
        ],
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,

    }
    handleAdd=()=>{
        this.setState({
            visible: true,
        });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        const {roomdata}=this.state
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            console.log('Received values of form: ', values);
            form.resetFields();
            roomdata.push({
                title:values.title,
                description:values.description
            })
            this.setState({
                visible: false,
                roomdata:roomdata
            });
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };


    render(){
        return (
            <div>
                <div className='welcomeArea'>
                    welcome
                </div>
                <div className='btnArea' style={{opacity:1,marginTop:10}}>
                        <a className="btn btn-default" onClick={this.handleAdd}>
                            <Icon type="plus-circle" style={{marginRight:10}} />
                            Create New Room
                        </a>
                        <a className="btn btn-default">
                            <Icon type="bulb" style={{marginRight:10}} />
                            Join Randomly
                        </a>
                </div>
                <div className='collectionArea'>
                    <CollectionCreateForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                    />
                </div>
                <div className='roomArea'>
                    {
                        this.state.roomdata.map((roomitem,index)=>{
                            return (
                                <RoomItem
                                    key={index}
                                    title={roomitem.title}
                                    description={roomitem.description}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
