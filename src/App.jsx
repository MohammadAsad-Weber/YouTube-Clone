import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Router
import LoadingBar from 'react-top-loading-bar'; // Top Loading Bar
import { YouTubeContext } from './Context/IndexContext.jsx'; // Context API
import './App.css'; // StySheet

// Components
import NavBar from './Components/NavBar/NavBar';
import SideBar from './Components/SideBar/SideBar';
import Feed from './Components/Feed/Feed';
import VideoPage from './Components/VideoPage/VideoPage';

function App() {

  // Using Context
  const { progress, setProgress, videoId, setSideBarShow } = useContext(YouTubeContext);

  // Call this function after rendering the components
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1250) { setSideBarShow(false); }
    };

    // Initial check 
    handleResize();

    // Add event listener 
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount 
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <LoadingBar
          color='#f11946'
          shadow={true}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <NavBar />
        <SideBar />
        <Routes>
          <Route exact path='/' element={<Feed key={'/'} id={0} />} />
          <Route exact path='/films' element={<Feed key={'/films'} id={1} />} />
          <Route exact path='/music' element={<Feed key={'/music'} id={10} />} />
          <Route exact path='/sports' element={<Feed key={'/sports'} id={17} />} />
          <Route exact path='/gaming' element={<Feed key={'/gaming'} id={20} />} />
          <Route exact path='/news' element={<Feed key={'/news'} id={25} />} />
          <Route exact path='/technology' element={<Feed key={'/technology'} id={28} />} />
          <Route exact path='/entertainment' element={<Feed key={'/entertainment'} id={24} />} />
          <Route exact path='/autos&vehicles' element={<Feed key={'/autos&vehicles'} id={2} />} />
          <Route path={`/watching=${videoId}`} element={<VideoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;