import React from 'react';
import './CommentCard.css'; // StyleSheet

function CommentCard(props) {
    return (
        <div id='comment-card'>
            <img src={props.img} alt="" />
            <div id="comment-data">
                <div id="user">{props.user ? props.user : 'Unknown'}</div>
                <div id="comment">{props.comment ? props.comment : 'This comment is not available!'}</div>
                <div id="buttons">
                    <div className="btns"><i class='bx bxs-like'></i> {props.like ? props.like : 'unavailable'}</div>
                    <div className="btns"><i class='bx bxs-dislike'></i></div>
                </div>
            </div>
        </div>
    )
}

export default CommentCard;