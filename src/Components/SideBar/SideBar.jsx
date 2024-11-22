import React, { useContext } from 'react';
import { YouTubeContext } from '../../Context/IndexContext'; // Context API
import { Link } from 'react-router-dom'; // Link for React-Router
import './SideBar.css'; // StyleSheet

// Icons
import YT_Premium from '../../assets/SVGs/youtube-premium.svg';
import YT_Studio from '../../assets/SVGs/youtube-studio.svg';
import YT_Music from '../../assets/SVGs/youtube-music.svg';
import YT_Kids from '../../assets/SVGs/youtube-kids.svg';


function SideBar() {
    const { sideBarShow } = useContext(YouTubeContext);

    return (
        <div id='sidebar' style={sideBarShow ? { display: 'block' } : { display: 'none' }}>
            {/* CATEGORIES */}
            <div id="category">
                <Link to="/"><i className="fa-solid fa-house"></i>Home</Link>
                <Link to="/films"><i className="fa-solid fa-clapperboard"></i>Films</Link>
                <Link to="/music"><i className="fa-solid fa-music"></i>Music</Link>
                <Link to="/sports"><i className="fa-solid fa-basketball"></i>Sports</Link>
                <Link to="/gaming"><i className="fa-solid fa-gamepad"></i>Gaming</Link>
                <Link to="/news"><i className="fa-solid fa-newspaper"></i>News</Link>
                <Link to="/technology"><i className="fa-solid fa-microchip"></i>Technology</Link>
                <Link to="/entertainment"><i className="fa-solid fa-tv"></i>Entertainment</Link>
                <Link to="/autos&vehicles"><i className="fa-solid fa-car-side"></i>Autos & Vehicles</Link>
            </div>

            {/* MORE APPS FROM YOUTUBE */}
            <div id="more-apps">
                <h4 style={{ margin: '0 15px 10px' }}>More From YouTube</h4>
                <a href="#"><img src={YT_Premium} alt="" />YouTube Premium</a>
                <a href="#"><img src={YT_Studio} alt="" />YouTube Studio</a>
                <a href="#"><img src={YT_Music} alt="" />YouTube Music</a>
                <a href="#"><img src={YT_Kids} alt="" />YouTube Kids</a>
            </div>

            {/* SETTINGS */}
            <div id="setting">
                <a href="#"><i className='bx bx-help-circle'></i>Help</a>
                <a href="#"><i className='bx bx-comment-error'></i>Send feedback</a>
            </div>

            {/* DOCUMENTATION */}
            <div id="docs">
                <a href="#">About</a>
                <a href="#">Press</a>
                <a href="#">Copyright</a>
                <a href="#">Contact us</a>
                <a href="#">Creators</a>
                <a href="#">Advertise</a>
                <a href="#">Developers</a>
                <a href="#">Terms</a>
                <a href="#">Privacy</a>
                <a href="#">Policy & Safety</a>
                <br />
                <a href="#">How YouTube works Test new features</a>
                <br />
                <p>© 2024 Google LLC</p>
            </div>
        </div>
    )
}

export default SideBar;