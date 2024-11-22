import React, { createContext, useState } from "react";
export const YouTubeContext = createContext(); // Created YouTube Context

function IndexContext(props) {
    // States for YouTube Context
    const [sideBarShow, setSideBarShow] = useState(true);
    const [progress, setProgress] = useState(0);
    const [videoId, setVideoId] = useState(null);

    // Functions for YouTube Context
    function formatNumber(number) {
        if (number >= 1_000_000_000) {
            return (number / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
        }
        if (number >= 1_000_000) {
            return (number / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (number >= 1_000) {
            return (number / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
        }
        return number.toString(); // Return as-is if less than 1000
    }

    function timeSincePublish(publishDate) {
        const now = new Date();
        const published = new Date(publishDate);
        const diffInSeconds = Math.floor((now - published) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} seconds ago`;
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minutes ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} days ago`;
        }

        const diffInWeeks = Math.floor(diffInDays / 7);
        if (diffInWeeks < 4) {
            return `${diffInWeeks} weeks ago`;
        }

        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} months ago`;
        }

        const diffInYears = Math.floor(diffInDays / 365);
        return `${diffInYears} years ago`;
    }

    const formatDate = (number) => {
      const date = new Date(number);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString('en-US', options);
    }
  
    const NumberFormatter = (number) => {
      const newNumber = Number(number)
      return newNumber.toLocaleString('en-US');
    }
  

    // Providing all States and Functions
    return (
        <YouTubeContext.Provider value={{
            sideBarShow,
            progress,
            videoId,
            setSideBarShow,
            setProgress,
            setVideoId,
            formatNumber,
            timeSincePublish,
            formatDate,
            NumberFormatter
        }}>
            {props.children}
        </YouTubeContext.Provider>
    )
}

export default IndexContext;