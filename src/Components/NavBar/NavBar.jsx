import React, { useContext } from 'react';
import { YouTubeContext } from "../../Context/IndexContext"; // Context API
import { Link } from 'react-router-dom'; // Link for React-Router
import Logo from '../../assets/SVGs/youtube-logo.svg'; // YouTube Logo
import './NavBar.css'; // StyleSheet

function NavBar() {

    // Using Context
    const { setSideBarShow } = useContext(YouTubeContext);

    return (
        <nav id='navbar'>
            {/* LEFT SIDE */}
            <div id="menu">
                <i className="fa-solid fa-bars" onClick={() => { setSideBarShow(prev => !prev) }}></i>
                <Link to="/"><div id="yt-icon"><img src={Logo} alt="" /></div></Link>
            </div>

            {/* CENTER */}
            <div id="input-area">
                <input type="text" id='textarea' placeholder='Search' />
                <button id='search'><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>

            {/* RIGTH SIDE */}
            <div id="my-Account">
                <button><i className="fa-solid fa-magnifying-glass"></i></button>
                <button><i className='bx bx-video-plus'></i></button>
                <button><i className='bx bx-bell'></i></button>
                <button><i className='bx bx-user-circle'></i></button>
            </div>
        </nav>
    )
}

export default NavBar;