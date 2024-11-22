import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component"; // Infinite-Scroller
import { YouTubeContext } from "../../Context/IndexContext"; // Context API
import API_KEY from "../../../API_KEY"; // My API Key
import './Feed.css'; // StyleSheet

// Components
import Cards from '../Cards/Cards';
import Loader from "../Loader/Loader";

function Feed(props) {
    // Using Context
    const { setProgress, sideBarShow } = useContext(YouTubeContext);

    // Sates for Fetching the Videos
    const [totalResults, setTotalResults] = useState(0);
    const [videoList, setVideoList] = useState([]);
    const [pageToken, setPageToken] = useState(null);

    // Function for Fetching the Videos
    const getVideos = async () => {
        setProgress(10);

        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&regionCode=IN&videoCategoryId=${props.id}&key=${API_KEY}`);
        setProgress(55);

        const data = await response.json();
        setProgress(75);

        setTotalResults(data.pageInfo.totalResults);
        setPageToken(data.nextPageToken);
        setVideoList(data.items);
        setProgress(100);
    };

    // Fetching more Videos
    const fetchMoreData = async () => {
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&pageToken=${pageToken}&maxResults=15&regionCode=IN&videoCategoryId=${props.id}&key=${API_KEY}`);
        const data = await response.json();

        setPageToken(data.nextPageToken);
        setVideoList(prevVideoList => prevVideoList.concat(data.items));
    };

    // Call this Function after rendering the components
    useEffect(() => {
        getVideos();
    }, []);

    // Creating Array of Cards Components
    const cards = videoList.map((element, index) => {
        return (
            <Cards
                key={index}
                url={element.id}
                category={element.snippet.categoryId}
                thumbnail={element.snippet.thumbnails.medium.url}
                title={element.snippet.title}
                channelName={element.snippet.channelTitle}
                views={element.statistics.viewCount}
                publishedAt={element.snippet.publishedAt}
            />
        );
    });

    const show = {
        maxWidth: 'calc(100% - 240px)',
        marginLeft: '240px',
    }

    const hide = {
        maxWidth: '100%',
        marginLeft: '0px',
    }

    return (
        // INFINITE SCROLLER
        <InfiniteScroll
            dataLength={videoList.length}
            next={fetchMoreData}
            hasMore={videoList.length !== totalResults}
            loader={<Loader />}
            style={{ overflow: 'auto', scrollbarWidth: 'none' }}
        >
            {/* FEED */}
            <div id="feed" style={sideBarShow ? show : hide}>

                {/* MOUNT THE ARRAY WHEN THE LENGTH OF ARRAY ISN'T EQUAL TO 0 */}
                {videoList.length !== 0 && cards}
            </div>
        </InfiniteScroll>
    );
}

export default Feed;
