import React, { useContext } from 'react';
import { YouTubeContext } from '../../Context/IndexContext'; // Using Context
import './Loader.css'; // StyleSheet

function Loader() {
  const { sideBarShow } = useContext(YouTubeContext)

  const show = {
    maxWidth: 'calc(100% - 240px)',
    marginLeft: '240px'
  }

  const hide = {
    maxWidth: '100%',
    marginLeft: '0px'
  }

  return (
    <div id='loader-area' style={sideBarShow ? show : hide}>
      <span className="loader"></span>
    </div>
  )
}

export default Loader;