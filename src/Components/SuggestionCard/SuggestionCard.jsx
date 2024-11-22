import React, { useContext } from 'react';
import { YouTubeContext } from '../../Context/IndexContext'; // Context API
import { Link } from 'react-router-dom'; // Link for React-Router
import './SuggestionCard.css'; // StyleShhet

function SuggestionCard(props) {

  // Using Context
  const { formatNumber, timeSincePublish, setVideoId } = useContext(YouTubeContext);

  return (
    <Link to={`/watching=${props.url}`} onClick={() => { setVideoId(props.url) }}>
      <div id="suggestion-card">
        <img src={props.img} alt="" />
        <div id="card-data">
          <h5 id="card-title">{props.title.length > 80 ? props.title.slice(0, 81) + '...' : props.title}</h5>
          <div id="card-channel">{props.name ? props.name : 'Unknown'}
            <div id="card-analy">
              <span id="views">{props.views ? formatNumber(props.views) + ' views' : 'unavailable'} </span>•
              <span id="publishedAt"> {props.time ? timeSincePublish(props.time) : 'unavailable'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SuggestionCard;