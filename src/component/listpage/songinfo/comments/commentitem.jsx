import { Comment, Icon, Tooltip, Avatar } from 'antd';
import React,{Component} from 'react'
import moment from 'moment';
import './commentitem.css'

export default class CommentItem extends React.Component {
    state = {
        likes: 1,
        dislikes: 0,
        action: null,
    };

    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    };

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    };

    render() {
        const { likes, dislikes, action } = this.state;
        const {comments}=this.props
        const actions = [
            <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
              type="like"
              theme={action === 'liked' ? 'filled' : 'outlined'}
              onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
            <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
              type="dislike"
              theme={action === 'disliked' ? 'filled' : 'outlined'}
              onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
            <span key="comment-basic-reply-to">Reply to</span>,
        ];

        return (
            <Comment
                className='commenItem'
                actions={actions}
                author={<a>{comments.name}</a>}
                avatar={
                    <Avatar
                        className='AvatComment'
                        src={comments.src}
                        alt="Han Solo"
                    />
                }
                content={
                    <p>
                        {comments.title}
                    </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        );
    }
}
