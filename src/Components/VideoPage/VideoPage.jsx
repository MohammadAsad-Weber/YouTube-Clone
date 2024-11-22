import React, { useContext, useEffect, useState } from 'react';
import { YouTubeContext } from '../../Context/IndexContext'; // Context API
import API_KEY from '../../../API_KEY'; // API Key
import './VideoPage.css'; // StyleSheet

// Components
import SuggestionCard from '../SuggestionCard/SuggestionCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentCard from '../CommentCard/CommentCard';

function VideoPage() {

  // Using Context
  const { videoId, setProgress, setSideBarShow, formatNumber, timeSincePublish, NumberFormatter, formatDate } = useContext(YouTubeContext);

  // State for Video Data
  const [videoData, setVideoData] = useState(null);

  // State for Channel Data
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // State for Comment Data
  const [totalCommentResults, setTotalCommentResults] = useState(0);
  const [commentPageToken, setCommentPageToken] = useState(null);

  // State for Suggestion Data
  const [suggestionData, setSuggestionData] = useState([]);
  const [totalSuggestionResults, setTotalSuggestionResults] = useState(0);
  const [suggestionPageToken, setSuggestionPageToken] = useState(null);

  // State for Description Box
  const [expanded, setExpanded] = useState(true);

  //Function for Fetching Video Data
  const fetchVideo = async () => {
    try {
      const video_response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);
      const video_data = await video_response.json();
      setVideoData(video_data.items[0]);
    } catch (error) {
      setError(true)
    }
  }

  //Function for Fetching Channel Data
  const fetchChannel = async () => {
    const channel_response = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoData.snippet.channelId}&key=${API_KEY}`);
    const channel_data = await channel_response.json();
    setChannelData(channel_data.items[0]);
  }

  //Function for Fetching Comment Data
  const fetchComment = async () => {
    const comment_response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${videoId}&key=${API_KEY}`);
    const comment_data = await comment_response.json();

    setTotalCommentResults(videoData.statistics.commentCount);
    setCommentPageToken(comment_data.nextPageToken);
    setCommentData(comment_data.items);
  }

  //Function for Fetching Suggestion Data
  const fetchSuggestion = async () => {
    const suggestion_response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&videoCategoryId=${videoData.snippet.categoryId}&key=${API_KEY}`);
    const suggestion_data = await suggestion_response.json();

    setTotalSuggestionResults(suggestion_data.pageInfo.totalResults);
    setSuggestionPageToken(suggestion_data.nextPageToken);
    setSuggestionData(suggestion_data.items);
  }

  // Run fetchVideo after rendering the component
  useEffect(() => {
    fetchVideo()
    setProgress(25)

    setSideBarShow(false)

  }, [])

  // Run all these functions when the videoData's state changes
  useEffect(() => {

    fetchChannel()
    setProgress(50)

    fetchSuggestion()
    setProgress(75)

    fetchComment()
    setProgress(100)

  }, [videoData])

  // Function for Fetching more Suggestion Data
  const fetchMoreSuggestions = async () => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=${suggestionPageToken}&maxResults=15&regionCode=IN&videoCategoryId=${videoData.snippet.categoryId}&key=${API_KEY}`);
    const data = await response.json();

    setSuggestionPageToken(data.nextPageToken);
    setSuggestionData(prevSuggestionData => prevSuggestionData.concat(data.items));
  };

  // Function for Fetching more Comment Data
  const fetchMoreComments = async () => {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&pageToken=${commentPageToken}&maxResults=10&videoId=${videoData.id}&key=${API_KEY}`);
    const data = await response.json();

    setCommentPageToken(data.nextPageToken);
    setCommentData(prevCommentData => prevCommentData.concat(data.items));
  };

  // Function for Shorten the description
  const shortDescription = (text) => {
    if (text.length > 600) {
      return text.slice(0, 601) + '...';
    } else {
      return text;
    }
  }

  // Function for Expand or Shorten the description
  const toggleDescription = (event) => {

    const content = videoData.snippet.description;
    const views = videoData.statistics.viewCount;
    const date = videoData.snippet.publishedAt;
    setExpanded(!expanded)

    if (expanded) {
      event.target.previousElementSibling.textContent = `${NumberFormatter(views)} views ${formatDate(date)}`;
      event.target.style.height = 'fit-content';
      event.target.textContent = content;
    } else {
      event.target.previousElementSibling.textContent = `${formatNumber(views)} views ${timeSincePublish(date)}`;
      event.target.style.height = '100px';
      event.target.textContent = shortDescription(content);
    }
  }

  return (
    <div id='VideoPage'>

      {/* VIDEO PLAYING AREA */}
      <div id='primary'>

        {/* VIDEO ELEMENT */}
        <iframe src={`https://www.youtube.com/embed/${videoData && videoData.id}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
        <h3 id='title'>{videoData ? videoData.snippet.title : `Title isn't available`}</h3>

        {/* VIDEO'S META DATA */}
        <div id="video-data">
          <div id="left">
            <div id="channel">
              <img src={channelData && channelData.snippet.thumbnails.medium.url} alt="" />
              <div id="channel-info">
                <h4 id='channel-name'>{channelData ? channelData.snippet.title : 'Unknown'}</h4>
                <p id="channel-subs">{channelData ? `${formatNumber(channelData.statistics.subscriberCount)} subscribers` : 'unavailable'}</p>
              </div>
            </div>
            <button id="subscribe">Subscribe</button>
          </div>
          <div id="analytics">
            <div id="like-dislike">
              <button><i className='bx bx-like'></i>{videoData ? formatNumber(videoData.statistics.likeCount) : 'unavailable'}</button>
              <button><i className='bx bx-dislike'></i></button>
            </div>
            <button className='analy-btn'><i className='bx bx-share'></i>Share</button>
            <button className='analy-btn'><i className='bx bx-down-arrow-alt'></i>Download</button>
            <button className='analy-btn'><i className='bx bx-dots-horizontal-rounded'></i></button>
          </div>
        </div>

        {/* DESCRIPTION BOX */}
        <div id="description-outer">
          <div id='views-date'>
            {videoData && `${formatNumber(videoData.statistics.viewCount)} views  ${timeSincePublish(videoData.snippet.publishedAt)}`}
          </div>
          <pre id="description" onClick={toggleDescription}>
            {videoData ? shortDescription(videoData.snippet.description) : 'Description is not available'}
          </pre>
        </div>

        {/* COMMENT SECTION STARTS FROM HERE */}
        <InfiniteScroll
          className='comment-infinite-scroll'
          dataLength={commentData.length}
          next={fetchMoreComments}
          hasMore={commentData.length !== totalCommentResults}
          loader={<div className='spinner-area'><span className="spinner"></span></div>}
          style={{ overflow: 'auto', scrollbarWidth: 'none' }}>
          <div id="comment-section">
            {videoData && <h2 style={{ margin: '25px 0' }}>{formatNumber(videoData.statistics.commentCount)} Comments</h2>}
            {commentData !== 0 && commentData.map((element, index) => {
              return (
                <CommentCard
                  key={index}
                  img={element.snippet.topLevelComment.snippet.authorProfileImageUrl}
                  user={element.snippet.topLevelComment.snippet.authorDisplayName}
                  time={element.snippet.topLevelComment.snippet.publishedAt}
                  comment={element.snippet.topLevelComment.snippet.textDisplay}
                  like={element.snippet.topLevelComment.snippet.likeCount}
                />
              )
            })}
          </div>
        </InfiniteScroll>
      </div >

      {/* SUGGESTION AREA */}
      <InfiniteScroll
        className='suggestion-infinite-scroll'
        dataLength={suggestionData.length}
        next={fetchMoreSuggestions}
        hasMore={suggestionData.length !== totalSuggestionResults}
        loader={<div className='spinner-area'><span className="spinner"></span></div>}
        style={{ overflow: 'auto', scrollbarWidth: 'none' }}
      >
        <div id="suggestion-list">
          {suggestionData.length !== 0 && suggestionData.map((element, index) => {
            return (
              <SuggestionCard
                key={index}
                url={element.id}
                img={element.snippet.thumbnails.medium.url}
                title={element.snippet.title}
                name={element.snippet.channelTitle}
                views={element.statistics.viewCount}
                time={element.snippet.publishedAt}
              />
            )
          })}
        </div>
      </InfiniteScroll>
    </div>)
}

export default VideoPage;