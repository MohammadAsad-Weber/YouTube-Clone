import React, { useContext } from 'react';
import { YouTubeContext } from '../../Context/IndexContext'; // Context API
import { Link } from 'react-router-dom'; // Link for React-Router
import './Cards.css'; // StyleSheet


function Cards(props) {

    // Using Context
    const { formatNumber, timeSincePublish, setVideoId } = useContext(YouTubeContext);

    return (
        <Link to={`/watching=${props.url}`} onClick={() => { setVideoId(props.url) }}>
            <div id='card'>
                <img src={props.thumbnail} alt="" />
                <div id="meta">
                    <div id="title">
                        {props.title}
                    </div>
                    <div id="meta-data">
                        <div id="channel">
                            {props.channelName}
                            <span id="dot"> • </span>
                        </div>
                        <div id="analytics">
                            <span id="views">{formatNumber(props.views)} </span>•
                            <span id="time"> {timeSincePublish(props.publishedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Cards;